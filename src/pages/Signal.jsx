import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Activity } from 'lucide-react';
import Layout from '../components/Layout';

const Signal = () => {
  const navigate = useNavigate();
  const [activeWave, setActiveWave] = useState('P');

  const waves = {
    P: {
      title: "Onde P",
      subtitle: "Dépolarisation auriculaire",
      content: "Elle correspond à l'activation électrique des oreillettes. C'est le signal qui déclenche la contraction des chambres supérieures du cœur.",
      color: "text-emerald",
      bg: "bg-emerald/10"
    },
    QRS: {
      title: "Complexe QRS",
      subtitle: "Dépolarisation ventriculaire",
      content: "Le pic le plus visible. Il représente l'activation électrique des ventricules, entraînant leur contraction puissante pour pomper le sang.",
      color: "text-medical-cyan",
      bg: "bg-medical-cyan/10"
    },
    T: {
      title: "Onde T",
      subtitle: "Repolarisation ventriculaire",
      content: "Elle marque la phase de récupération électrique des ventricules avant le prochain battement. Le cœur se relâche et se remplit.",
      color: "text-purple",
      bg: "bg-purple/10"
    }
  };

  return (
    <Layout>
      <div className="pt-4 pb-12">
        <motion.button
          onClick={() => navigate('/home')}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-white/60 mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Signal Électrique</h2>
          <p className="text-white/60">Anatomie d'un battement cardiaque.</p>
        </motion.div>

        {/* ECG Graph Visualization */}
        <div className="glass-card p-4 rounded-3xl mb-8 relative bg-navy/50 overflow-hidden border border-emerald/20">
          <div className="absolute inset-0 medical-grid opacity-20"></div>
          
          <svg viewBox="0 0 400 200" className="w-full h-48 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            {/* Base line */}
            <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* ECG Path */}
            <motion.path
              d="M0 140 L80 140 Q100 110 120 140 L150 140 L160 155 L180 40 L200 170 L210 140 L250 140 Q280 110 310 140 L400 140"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Labels */}
            <g className="cursor-pointer">
              {/* P Wave */}
              <circle cx="100" cy="125" r="15" fill={activeWave === 'P' ? 'rgba(34,197,94,0.2)' : 'transparent'} className="transition-colors" onClick={() => setActiveWave('P')} />
              <text x="100" y="100" textAnchor="middle" fill="#22C55E" className="text-xs font-bold font-sans">P</text>
              
              {/* QRS Complex */}
              <circle cx="180" cy="40" r="20" fill={activeWave === 'QRS' ? 'rgba(32,183,216,0.2)' : 'transparent'} className="transition-colors" onClick={() => setActiveWave('QRS')} />
              <text x="180" y="25" textAnchor="middle" fill="#20B7D8" className="text-xs font-bold font-sans">QRS</text>
              
              {/* T Wave */}
              <circle cx="280" cy="125" r="15" fill={activeWave === 'T' ? 'rgba(139,92,246,0.2)' : 'transparent'} className="transition-colors" onClick={() => setActiveWave('T')} />
              <text x="280" y="100" textAnchor="middle" fill="#8B5CF6" className="text-xs font-bold font-sans">T</text>
            </g>
          </svg>

          <div className="flex justify-between px-4 mt-2">
            {Object.keys(waves).map((key) => (
              <button
                key={key}
                onClick={() => setActiveWave(key)}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                  activeWave === key 
                    ? `${waves[key].bg} ${waves[key].color} border border-${waves[key].color.split('-')[1]}/30` 
                    : 'bg-white/5 text-white/40'
                }`}
              >
                {key === 'QRS' ? 'QRS' : `Onde ${key}`}
              </button>
            ))}
          </div>
        </div>

        {/* Wave Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWave}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${waves[activeWave].bg} ${waves[activeWave].color}`}>
                <Activity size={20} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${waves[activeWave].color}`}>
                  {waves[activeWave].title}
                </h3>
                <p className="text-xs text-white/40 uppercase tracking-wide">
                  {waves[activeWave].subtitle}
                </p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed italic">
              "{waves[activeWave].content}"
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-emerald/5 rounded-2xl border border-emerald/10 flex items-start gap-4"
        >
          <Info className="text-emerald shrink-0 mt-1" size={20} />
          <p className="text-sm text-emerald/80">
            Une fréquence cardiaque normale se situe entre <span className="font-bold">60 et 100 battements par minute (bpm)</span> au repos.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Signal;
