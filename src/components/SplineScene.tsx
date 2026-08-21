import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, className = '' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport-based loading strategy
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { 
      rootMargin: '400px' 
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleError = () => {
    console.error(`Failed to load Spline scene: ${scene}`);
    setError(true);
  };

  if (error) {
    return (
      <div className={`relative flex items-center justify-center bg-blue-500/5 rounded-2xl border border-white/10 ${className}`}>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm font-medium">Interactive Preview Unavailable</p>
        </div>
      </div>
    );
  }

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
            onError={handleError}
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