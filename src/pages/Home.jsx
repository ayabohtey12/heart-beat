import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Activity, Zap, HelpCircle, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Définition de l’ECG",
      icon: BookOpen,
      path: "/definition",
      color: "bg-medical-cyan",
      shadow: "shadow-medical-cyan/20",
      description: "Qu'est-ce que l'électrocardiogramme ?"
    },
    {
      title: "Signal électrique",
      icon: Zap,
      path: "/signal",
      color: "bg-emerald",
      shadow: "shadow-emerald/20",
      description: "Comprendre les ondes P, QRS et T."
    },
    {
      title: "Rythmes cardiaques",
      icon: Activity,
      path: "/rhythms",
      color: "bg-ecg-red",
      shadow: "shadow-ecg-red/20",
      description: "Normal, Tachycardie, Bradycardie."
    },
    {
      title: "Quiz ECG",
      icon: HelpCircle,
      path: "/quiz",
      color: "bg-purple",
      shadow: "shadow-purple/20",
      description: "Testez vos connaissances !"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Layout>
      <div className="pt-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenue</h2>
          <p className="text-white/60">Choisissez un module pour commencer votre exploration.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`glass-card p-5 rounded-2xl cursor-pointer group relative overflow-hidden flex items-center gap-5 border-l-4 ${item.color.replace('bg-', 'border-')}`}
            >
              {/* Background Glow */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${item.color}`}></div>

              <div className={`p-4 rounded-xl ${item.color} text-navy shadow-lg ${item.shadow}`}>
                <item.icon size={28} />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-medical-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </div>

              <ChevronRight className="text-white/20 group-hover:text-white/60 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <img 
            src="/upssa-logo.png" 
            alt="UPSSA Small" 
            className="h-8 mx-auto opacity-30 grayscale mb-2"
          />
          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            Université Privée de la Santé et des Sciences d’Agadir
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
