import React, { useEffect, useState } from 'react';
import './parallax-cosmic-background.css';

/**
 * A cosmic parallax background component with animated stars and text
 */
const CosmicParallaxBg = ({
  head,
  text,
  loop = true,
  className = '',
  children
}) => {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');
  
  // Split the text by commas and trim whitespace
  const textParts = text.split(',').map(part => part.trim());
  
  // Generate random star positions
  const generateStarBoxShadow = (count) => {
    let shadows = [];
    
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    
    return shadows.join(', ');
  };
  
  useEffect(() => {
    // Generate star shadows when component mounts
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
    
    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty(
      '--animation-iteration', 
      loop ? 'infinite' : '1'
    );
  }, [loop]);
  
  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* Stars layers */}
      <div 
        id="stars" 
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      ></div>
      <div 
        id="stars2" 
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      ></div>
      <div 
        id="stars3" 
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      ></div>
      
      {/* Horizon and Earth */}
      <div id="horizon">
        <div className="glow"></div>
      </div>
      <div id="earth"></div>
      
      {/* Content wrapper */}
      <div className="relative z-20 flex flex-col items-center w-full">
        {/* Title and subtitle */}
        <div id="title">{head.toUpperCase()}</div>
        <div id="subtitle">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${index + 1}`}>{part.toUpperCase()}</span>
              {index < textParts.length - 1 && ' '}
            </React.Fragment>
          ))}
        </div>

        {/* Children for additional overlay content */}
        {children && (
          <div className="mt-8 w-full max-w-5xl px-6 flex flex-col items-center">
            {children}
          </div>
        )}
      </div>


    </div>
  );
};

export { CosmicParallaxBg };
