import React, { Suspense, lazy, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, className = '' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device or a slow connection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const connection = (navigator as any).connection;
    const isSlow = connection && (connection.saveData || /2g|3g/.test(connection.effectiveType));

    // Delay Spline loading to prioritize initial LCP elements (text/buttons)
    const timeout = setTimeout(() => {
      // On slow connections or mobile, we can be even more conservative
      if (isMobile || isSlow) {
        // Use IntersectionObserver to load only when visible? 
        // For hero, it's usually visible, but let's at least wait for main thread to be idle
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => setShouldLoad(true));
        } else {
          setShouldLoad(true);
        }
      } else {
        setShouldLoad(true);
      }
    }, isMobile ? 2000 : 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {shouldLoad ? (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }>
          <Spline
            scene={scene}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-blue-500/5 rounded-full blur-2xl animate-pulse">
        </div>
      )}
    </div>
  );
};

export default SplineScene;