import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Layout from '../components/Layout';
import ECGLine from '../components/ECGLine';
import heartAsset from '../assets/clean-heart.png';
import logo from '../assets/logo-white-1.webp';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Layout className="h-screen flex flex-col items-center justify-center overflow-hidden py-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col items-center justify-center space-y-8 z-10"
      >
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center relative mt-0 mb-8 sm:mb-12"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-3xl px-6 py-4 shadow-[0_0_30px_rgba(34,211,238,0.25)] flex items-center justify-center relative z-10 mx-4"
          >
            <img 
              src={logo} 
              alt="UPSSA Logo" 
              className="h-16 sm:h-20 w-auto object-contain transition-all duration-500 ease-in-out"
            />
          </motion.div>
        </motion.div>

        {/* Title & Subtitle Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="relative inline-block px-8 py-2">
            {/* Futuristic Brackets */}
            <div className="absolute left-0 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-medical-cyan/40 rounded-l-lg"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-medical-cyan/40 rounded-r-lg"></div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[0.2em] uppercase whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-medical-cyan/50 drop-shadow-[0_0_15px_rgba(32,183,216,0.3)]">
              HEART BEAT
            </h1>
            
            {/* Scanning light effect */}
            <motion.div 
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
            />
          </div>
          
          <p className="text-medical-cyan text-lg md:text-xl font-medium max-w-[340px] mx-auto leading-tight tracking-wide opacity-90">
            L’électrocardiogramme expliqué de manière interactive
          </p>
        </motion.div>

        {/* Central Heart Card Section */}
        <div className="relative w-full flex items-center justify-center py-4">
          {/* Background ECG Line (Passing behind the card) */}
          <div className="absolute left-0 right-0 h-24 flex items-center opacity-30 pointer-events-none">
            <ECGLine speed={3} frequency={1.5} className="w-full" />
          </div>

          {/* Glassmorphism Heart Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 w-48 h-48 glass-card rounded-[40px] flex items-center justify-center border border-medical-cyan/30 shadow-[0_0_40px_rgba(32,183,216,0.3)]"
          >
            {/* Heart Visual Container */}
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Pulsating Heart Image */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ["drop-shadow(0 0 15px rgba(255,77,77,0.4))", "drop-shadow(0 0 25px rgba(255,77,77,0.6))", "drop-shadow(0 0 15px rgba(255,77,77,0.4))"]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-0 flex items-center justify-center w-40 h-40"
              >
                <img 
                  src={heartAsset} 
                  alt="Heart" 
                  className="w-full h-full object-contain"
                  style={{ 
                    filter: 'url(#remove-black)'
                  }}
                />
              </motion.div>

              {/* White ECG Pulse on top of the heart */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-full h-10 flex items-center overflow-hidden">
                  <ECGLine speed={0.8} frequency={1} color="#ffffff" className="w-full scale-y-75 opacity-90" />
                </div>
              </div>
            </div>

            {/* Cyan Border Glow */}
            <div className="absolute inset-0 rounded-[40px] border-2 border-medical-cyan/20 animate-pulse"></div>
          </motion.div>
        </div>


        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-[320px] px-4 space-y-8"
        >
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-medical-cyan text-navy font-black py-4 rounded-2xl text-xl shadow-[0_0_20px_rgba(32,183,216,0.6)] hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <span className="relative z-10">Commencer</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={24} />
          </button>

          {/* Footer Tagline */}
          <div className="flex items-center justify-center gap-2 text-white/60 whitespace-nowrap">
            <ShieldCheck size={18} className="text-medical-cyan shrink-0" />
            <p className="text-[10px] sm:text-xs font-medium tracking-wide">
              Apprenez. Comprenez. Sauvez des vies.
            </p>
          </div>
        </motion.div>

      </motion.div>

      {/* SVG Filter to remove black background: Alpha = R + G + B */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="remove-black">
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      1 1 1 0 0" 
            />
          </filter>
        </defs>
      </svg>
    </Layout>
  );
};

export default Welcome;


