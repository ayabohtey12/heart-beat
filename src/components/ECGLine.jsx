import React from 'react';
import { motion } from 'framer-motion';

const ECGLine = ({ color = "#20B7D8", speed = 1.5, frequency = 1.5, className = "" }) => {
  // SVG path for a single ECG pulse (width 100)
  const pulse = "L20 50 L25 40 L30 60 L35 20 L40 80 L45 50 L70 50 L75 45 L80 55 L85 50 L100 50";
  
  // Create a long repeating path for seamless looping (20 beats to be safe)
  let pathData = "M0 50";
  for (let i = 1; i <= 20; i++) {
    const offset = (i - 1) * 100;
    const currentPulse = pulse.replace(/L(\d+)/g, (match, p1) => `L${parseInt(p1) + offset}`);
    pathData += currentPulse;
  }
  
  // To loop perfectly, we show 'frequency' number of beats in the window
  // and animate the path by exactly one beat (100 units).
  const viewBoxWidth = 100 * frequency;

  return (
    <div className={`w-full overflow-hidden h-20 flex items-center ${className}`}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} 100`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ x: [0, -100] }} // Move by exactly one beat
          transition={{ 
            duration: speed, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
    </div>
  );
};

export default ECGLine;



