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
      const load = () => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => setShouldLoad(true));
        } else {
          setShouldLoad(true);
        }
      };

      if (isMobile || isSlow) {
        // More aggressive deferring for mobile/slow
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            load();
            observer.disconnect();
          }
        }, { rootMargin: '100px' });
        
        const el = document.querySelector('.spline-container');
        if (el) observer.observe(el);
        else load();
      } else {
        load();
      }
    }, isMobile ? 3000 : 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative spline-container ${className}`}>
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