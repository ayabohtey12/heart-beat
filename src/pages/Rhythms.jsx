import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, FastForward, Rewind, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import ECGLine from '../components/ECGLine';

const Rhythms = () => {
  const navigate = useNavigate();
  const [selectedRhythm, setSelectedRhythm] = useState('normal');

  const rhythms = {
    normal: {
      title: "Rythme Normal",
      subtitle: "Sinusal régulier",
      bpm: "60 - 100 bpm",
      speed: 1.0,
      frequency: 1.5,
      color: "#22C55E",
      description: "Le cœur bat de manière régulière et efficace. C'est l'état idéal au repos pour un adulte en bonne santé.",
      icon: Activity
    },
    tachycardie: {
      title: "Tachycardie",
      subtitle: "Rythme accéléré",
      bpm: "> 100 bpm",
      speed: 0.4,
      frequency: 2.8,
      color: "#EF4444",
      description: "Le rythme cardiaque est trop rapide. Cela peut être normal pendant l'effort, mais inquiétant au repos.",
      icon: FastForward
    },
    bradycardie: {
      title: "Bradycardie",
      subtitle: "Rythme ralenti",
      bpm: "< 60 bpm",
      speed: 2.5,
      frequency: 0.8,
      color: "#F59E0B",
      description: "Le cœur bat trop lentement. Cela peut être courant chez les grands sportifs ou indiquer un blocage électrique.",
      icon: Rewind
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
          <h2 className="text-3xl font-bold text-white mb-2">Rythmes Cardiaques</h2>
          <p className="text-white/60">Visualisez les différentes fréquences.</p>
        </motion.div>

        {/* Visualizer Card */}
        <div className="glass-card p-6 rounded-3xl mb-8 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{rhythms[selectedRhythm].title}</h3>
              <p className="text-sm text-white/40 uppercase tracking-widest">{rhythms[selectedRhythm].subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-glow-cyan" style={{ color: rhythms[selectedRhythm].color }}>
                {rhythms[selectedRhythm].bpm}
              </span>
            </div>
          </div>

          <div className="h-32 bg-navy/50 rounded-2xl border border-white/5 relative flex items-center mb-6">
            <div className="absolute inset-0 medical-grid opacity-30"></div>
            <ECGLine 
              key={selectedRhythm} // Force re-mount for smooth transition
              color={rhythms[selectedRhythm].color} 
              speed={rhythms[selectedRhythm].speed} 
              frequency={rhythms[selectedRhythm].frequency}
              className="opacity-90"
            />
          </div>


          <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
            "{rhythms[selectedRhythm].description}"
          </p>

          <div className="grid grid-cols-3 gap-3">
            {Object.keys(rhythms).map((key) => {
              const RhythmIcon = rhythms[key].icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRhythm(key)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${
                    selectedRhythm === key
                      ? `bg-white/10 border-white/20`
                      : 'bg-transparent border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <div className={`p-2 rounded-xl bg-white/5`} style={{ color: rhythms[key].color }}>
                    <RhythmIcon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-white">
                    {key}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Education Note */}
        <div className="p-6 rounded-2xl bg-ecg-red/10 border border-ecg-red/20 flex gap-4 items-center">
          <div className="bg-ecg-red p-2 rounded-lg text-white shadow-lg shadow-ecg-red/20">
            <Heart size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ecg-red uppercase">Attention</h4>
            <p className="text-xs text-white/60">Une anomalie du rythme nécessite toujours un avis médical professionnel.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rhythms;
