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
      bg: "bg-emerald/10",
      activeBg: "bg-emerald/20",
      border: "border-emerald/50",
      glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
      indicator: "bg-emerald"
    },
    QRS: {
      title: "Complexe QRS",
      subtitle: "Dépolarisation ventriculaire",
      content: "Le pic le plus visible. Il représente l'activation électrique des ventricules, entraînant leur contraction puissante pour pomper le sang.",
      color: "text-medical-cyan",
      bg: "bg-medical-cyan/10",
      activeBg: "bg-medical-cyan/20",
      border: "border-medical-cyan/50",
      glow: "shadow-[0_0_20px_rgba(32,183,216,0.4)]",
      indicator: "bg-medical-cyan"
    },
    T: {
      title: "Onde T",
      subtitle: "Repolarisation ventriculaire",
      content: "Elle marque la phase de récupération électrique des ventricules avant le prochain battement. Le cœur se relâche et se remplit.",
      color: "text-purple",
      bg: "bg-purple/10",
      activeBg: "bg-purple/20",
      border: "border-purple/50",
      glow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
      indicator: "bg-purple"
    }
  };

  return (
    <Layout>
      <div className="pt-4 pb-12 px-4">
        <motion.button
          onClick={() => navigate('/home')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white/60 mb-8 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:text-medical-cyan transition-colors" />
          <span className="font-medium">Retour</span>
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
        <div className="glass-card p-4 rounded-3xl mb-8 relative bg-navy/50 overflow-hidden border border-white/10">
          <div className="absolute inset-0 medical-grid opacity-20"></div>
          
          <svg viewBox="0 0 400 200" className="w-full h-48 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] pointer-events-none">
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

            {/* Interactive Areas in SVG */}
            <g className="pointer-events-auto">
              {/* P Wave Area */}
              <circle 
                cx="100" cy="125" r="25" 
                fill="transparent" 
                className="cursor-pointer"
                onClick={() => setActiveWave('P')} 
              />
              <motion.circle 
                cx="100" cy="125" r="15" 
                animate={{ scale: activeWave === 'P' ? 1.2 : 1, opacity: activeWave === 'P' ? 0.4 : 0 }}
                fill="#22C55E"
              />
              <text x="100" y="100" textAnchor="middle" fill="#22C55E" className={`text-xs font-bold font-sans transition-all duration-300 pointer-events-none ${activeWave === 'P' ? 'scale-125' : 'opacity-60'}`}>P</text>
              
              {/* QRS Complex Area */}
              <circle 
                cx="180" cy="40" r="30" 
                fill="transparent" 
                className="cursor-pointer"
                onClick={() => setActiveWave('QRS')} 
              />
              <motion.circle 
                cx="180" cy="40" r="20" 
                animate={{ scale: activeWave === 'QRS' ? 1.2 : 1, opacity: activeWave === 'QRS' ? 0.4 : 0 }}
                fill="#20B7D8"
              />
              <text x="180" y="25" textAnchor="middle" fill="#20B7D8" className={`text-xs font-bold font-sans transition-all duration-300 pointer-events-none ${activeWave === 'QRS' ? 'scale-125' : 'opacity-60'}`}>QRS</text>
              
              {/* T Wave Area */}
              <circle 
                cx="280" cy="125" r="25" 
                fill="transparent" 
                className="cursor-pointer"
                onClick={() => setActiveWave('T')} 
              />
              <motion.circle 
                cx="280" cy="125" r="15" 
                animate={{ scale: activeWave === 'T' ? 1.2 : 1, opacity: activeWave === 'T' ? 0.4 : 0 }}
                fill="#8B5CF6"
              />
              <text x="280" y="100" textAnchor="middle" fill="#8B5CF6" className={`text-xs font-bold font-sans transition-all duration-300 pointer-events-none ${activeWave === 'T' ? 'scale-125' : 'opacity-60'}`}>T</text>
            </g>
          </svg>

          {/* Wave Selector Buttons */}
          <div className="flex justify-between gap-3 mt-4 relative z-20">
            {Object.keys(waves).map((key) => (
              <motion.button
                key={key}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveWave(key);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-3 rounded-2xl text-[10px] uppercase tracking-wider font-bold transition-all duration-300 border cursor-pointer select-none ${
                  activeWave === key 
                    ? `${waves[key].activeBg} ${waves[key].color} ${waves[key].border} ${waves[key].glow} opacity-100` 
                    : 'bg-white/5 text-white/30 border-white/5 hover:bg-white/10'
                }`}
              >
                {key === 'QRS' ? 'Complexe QRS' : `Onde ${key}`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Wave Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`glass-card p-6 rounded-3xl border-l-4 transition-all duration-500 ${
              activeWave === 'P' ? 'border-l-emerald' : 
              activeWave === 'QRS' ? 'border-l-medical-cyan' : 
              'border-l-purple'
            }`}
          >
            <div className="flex items-center gap-4 mb-5">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`p-3 rounded-2xl ${waves[activeWave].bg} ${waves[activeWave].color}`}
              >
                <Activity size={24} />
              </motion.div>
              <div>
                <h3 className={`text-2xl font-bold ${waves[activeWave].color} leading-none mb-1`}>
                  {waves[activeWave].title}
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
                  {waves[activeWave].subtitle}
                </p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
              {waves[activeWave].content}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-5 bg-white/5 rounded-3xl border border-white/10 flex items-start gap-4 backdrop-blur-sm"
        >
          <div className="p-2 bg-medical-cyan/10 rounded-xl">
            <Info className="text-medical-cyan shrink-0" size={20} />
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Une fréquence cardiaque normale se situe entre <span className="text-white font-bold">60 et 100 battements par minute (bpm)</span> au repos chez l'adulte sain.
          </p>
        </motion.div>

      </div>
    </Layout>
  );
};

export default Signal;
