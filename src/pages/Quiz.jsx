import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, AlertCircle, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import { quizData } from '../data/quizData';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getResultMessage = () => {
    if (score >= 8) return { text: "Excellent !", sub: "Vous êtes un expert de l'ECG !", color: "text-emerald", icon: Trophy };
    if (score >= 5) return { text: "Bien !", sub: "Bonnes connaissances de base.", color: "text-medical-cyan", icon: CheckCircle2 };
    return { text: "À réviser", sub: "Relisez les modules pour progresser.", color: "text-ecg-red", icon: AlertCircle };
  };

  const result = getResultMessage();
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Layout>
      <div className="pt-4 pb-12">
        <motion.button
          onClick={() => navigate('/home')}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-white/60 mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Quitter le Quiz</span>
        </motion.button>

        {!showResult ? (
          <div className="quiz-container">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-white/40 mb-2 uppercase tracking-widest font-bold">
                <span>Question {currentQuestion + 1} sur {quizData.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {quizData[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {quizData[currentQuestion].options.map((option, index) => {
                    let btnClass = "glass-card w-full p-5 rounded-2xl text-left transition-all border border-white/5 flex justify-between items-center";
                    if (isAnswered) {
                      if (index === quizData[currentQuestion].correctAnswer) {
                        btnClass += " border-emerald bg-emerald/10 text-emerald";
                      } else if (index === selectedAnswer) {
                        btnClass += " border-ecg-red bg-ecg-red/10 text-ecg-red";
                      } else {
                        btnClass += " opacity-40";
                      }
                    } else {
                      btnClass += " hover:bg-white/5 active:scale-[0.98]";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={btnClass}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswered && index === quizData[currentQuestion].correctAnswer && <CheckCircle2 size={20} />}
                        {isAnswered && index === selectedAnswer && index !== quizData[currentQuestion].correctAnswer && <AlertCircle size={20} />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={nextQuestion}
                    className="w-full mt-8 bg-purple text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple/20"
                  >
                    <span>{currentQuestion === quizData.length - 1 ? "Voir les résultats" : "Question suivante"}</span>
                    <ChevronRight size={20} />
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="glass-card p-10 rounded-[40px] relative overflow-hidden">
              <div className="absolute inset-0 medical-grid opacity-10 pointer-events-none"></div>
              
              <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-white/5 ${result.color}`}>
                <result.icon size={48} />
              </div>

              <h2 className={`text-4xl font-black mb-2 ${result.color}`}>{result.text}</h2>
              <p className="text-white/60 mb-8">{result.sub}</p>

              <div className="flex justify-center items-baseline gap-2 mb-10">
                <span className="text-6xl font-black text-white">{score}</span>
                <span className="text-2xl text-white/30">/ {quizData.length}</span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={resetQuiz}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw size={20} />
                  <span>Recommencer</span>
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="w-full bg-medical-cyan text-navy font-bold py-4 rounded-2xl transition-all shadow-lg shadow-medical-cyan/20"
                >
                  Retour au menu
                </button>
              </div>
            </div>

            {/* Score message for UPSSA */}
            <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.2em]">
              Merci de votre participation • UPSSA Events
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
