'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className, ...props }: SplineSceneProps & React.ComponentProps<typeof Spline>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-[#020c1b]/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        // Optimization for mobile RAM (4GB devices)
        {...(isMobile ? {
          renderOnDemand: true,
          style: { pointerEvents: 'none' }, // Disable heavy mouse interaction events
        } : {})}
        {...props}
      />
    </Suspense>
  )
}
