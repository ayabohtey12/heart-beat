import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Battery, Monitor, Cpu, HeartPulse, GitMerge } from 'lucide-react';
import Layout from '../components/Layout';

const Tutorial = () => {
  const navigate = useNavigate();

  const components = [
    {
      title: "ECG Electrodes",
      description: "Des électrodes médicales utilisées pour capter les signaux électriques du cœur afin de surveiller le rythme cardiaque et analyser l'ECG.",
      icon: Activity,
      image: "/images/electrodes.png",
      color: "border-medical-cyan"
    },
    {
      title: "Portable Power Supply",
      description: "Module d'alimentation utilisé pour fournir une énergie stable au système ECG et aux composants électroniques.",
      icon: Battery,
      image: "/images/power-supply.png",
      color: "border-emerald"
    },
    {
      title: "OLED Display",
      description: "Petit écran OLED utilisé pour afficher les informations ECG et les données du système.",
      icon: Monitor,
      image: "/images/oled.png",
      color: "border-medical-cyan"
    },
    {
      title: "ESP32",
      description: "Microcontrôleur utilisé pour traiter et transmettre les données du capteur ECG.",
      icon: Cpu,
      image: "/images/esp32.png",
      color: "border-purple"
    },
    {
      title: "AD8232 Heart Monitor",
      description: "Capteur ECG utilisé pour mesurer et amplifier les signaux électriques du cœur afin de surveiller l'activité cardiaque.",
      icon: HeartPulse,
      image: "/images/ad8232.png",
      color: "border-ecg-red"
    },
    {
      title: "Jumper Wires",
      description: "Fils de connexion électroniques utilisés pour relier les différents composants du système ECG.",
      icon: GitMerge,
      image: "/images/jumpers.png",
      color: "border-medical-cyan"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <Layout>
      <div className="pt-4 pb-12 w-full max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
        >
          <button
            onClick={() => navigate('/home')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-medical-cyan transition-all duration-300 hover:scale-105 active:scale-95 border border-white/5 shadow-[0_0_15px_rgba(32,183,216,0.15)]"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-medical-cyan/70 drop-shadow-[0_0_10px_rgba(32,183,216,0.3)]">
              Matériel ECG
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-1">
              Découvrez les composants du système Cardio Wave.
            </p>
          </div>
        </motion.div>

        {/* Component Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          {components.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group flex flex-col items-center text-center border-t border-l border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-medical-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              
              {/* Cyan Border Glow on Hover */}
              <div className="absolute inset-0 border border-medical-cyan/0 group-hover:border-medical-cyan/50 rounded-2xl transition-all duration-500 shadow-[inset_0_0_20px_rgba(32,183,216,0)] group-hover:shadow-[inset_0_0_20px_rgba(32,183,216,0.2)] pointer-events-none"></div>

              {/* Image Placeholder / Icon Box */}
              <div className="relative w-full h-48 bg-navy/50 rounded-xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden group-hover:border-medical-cyan/30 transition-colors duration-500 shadow-inner">
                {/* Image rendering with fallback to icon */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 z-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback Icon Container */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 hidden flex-col items-center justify-center w-full h-full"
                >
                  <item.icon size={64} className="text-medical-cyan/70 group-hover:text-medical-cyan transition-colors duration-500 drop-shadow-[0_0_15px_rgba(32,183,216,0.4)]" />
                  <span className="absolute bottom-4 text-[10px] text-white/40 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Image Manquante
                  </span>
                </motion.div>
                
                {/* Gradient overlay to ensure text readability if needed later, and to blend image */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none z-0"></div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-medical-cyan transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-2">
                {item.description}
              </p>
              
              {/* Decorative Line */}
              <div className="mt-auto pt-4 w-full">
                <div className={`h-1 w-12 mx-auto rounded-full bg-gradient-to-r from-transparent via-medical-cyan/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Tutorial;
