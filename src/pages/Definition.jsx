import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Heart, Info, Search } from 'lucide-react';
import Layout from '../components/Layout';

const Definition = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Qu’est-ce qu’un ECG ?",
      icon: Info,
      content: "L'électrocardiogramme (ECG) est un examen médical indolore qui enregistre l'activité électrique de votre cœur au fil du temps.",
      color: "text-medical-cyan"
    },
    {
      title: "Comment ça fonctionne ?",
      icon: Search,
      content: "Des électrodes placées sur la peau détectent les minuscules changements électriques sur la peau qui résultent du cycle de battement du muscle cardiaque.",
      color: "text-emerald"
    },
    {
      title: "Pourquoi le faire ?",
      icon: Heart,
      content: "Il permet de détecter les troubles du rythme (arythmies), les signes d'une crise cardiaque passée ou imminente, et d'autres anomalies structurelles.",
      color: "text-ecg-red"
    }
  ];

  const highlights = [
    "Examen rapide (5-10 minutes)",
    "Indolore et non invasif",
    "Résultats instantanés",
    "Essentiel pour le diagnostic"
  ];

  return (
    <Layout>
      <div className="pt-4 pb-12">
        {/* Back Button */}
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
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Définition de l’ECG</h2>
          <div className="h-1 w-20 bg-medical-cyan rounded-full"></div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-white/5 ${section.color}`}>
                  <section.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Quick Stats / Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mt-8"
          >
            {highlights.map((text, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 size={16} className="text-emerald" />
                <span className="text-xs font-medium text-white/80">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Definition;
