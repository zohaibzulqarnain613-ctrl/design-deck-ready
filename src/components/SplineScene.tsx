import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
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
    </div>
  );
};

export default SplineScene;