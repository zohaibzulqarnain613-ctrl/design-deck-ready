import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, className = '' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport-based loading strategy (P1)
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { 
      // rootMargin 400px ensures it starts loading before the user reaches it
      rootMargin: '400px' 
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative spline-container ${className}`}>
      {shouldLoad ? (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-blue-500/5 rounded-full blur-2xl animate-pulse">
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
        /* Matches the background/shape while loading to prevent CLS */
        <div className="w-full h-full flex items-center justify-center bg-blue-500/5 rounded-full blur-2xl animate-pulse">
        </div>
      )}
    </div>
  );
};

export default SplineScene;