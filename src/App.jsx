import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages (will create these next)
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Definition from './pages/Definition';
import Signal from './pages/Signal';
import Rhythms from './pages/Rhythms';
import Quiz from './pages/Quiz';
import Tutorial from './pages/Tutorial';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy text-white selection:bg-medical-cyan selection:text-navy">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/definition" element={<Definition />} />
          <Route path="/signal" element={<Signal />} />
          <Route path="/rhythms" element={<Rhythms />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
