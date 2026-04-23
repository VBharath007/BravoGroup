import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({
  animationData,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = ''
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && animationData) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: loop,
        autoplay: autoplay,
        animationData: animationData,
      });

      // Set size
      if (animationRef.current) {
        animationRef.current.setSize(width, height);
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, autoplay, width, height]);

  return (
    <div
      ref={containerRef}
      className={`lottie-animation ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default LottieAnimation;
