import React from 'react';
import { GlareCard } from './ui/glare-card';

const CaseStudiesSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              Measurable Outcomes
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional AI systems built for real-world business results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <GlareCard className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text mb-4 leading-tight">
                Operational Speed
              </div>

              <p className="text-gray-300 leading-relaxed text-base">
                Engineered for faster customer response and reduced cycle times.
              </p>
            </div>
          </GlareCard>

          <GlareCard className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text mb-4 leading-tight">
                Lead Handling
              </div>

              <p className="text-gray-300 leading-relaxed text-base">
                Designed for smarter lead qualification and automated multi-channel engagement.
              </p>
            </div>
          </GlareCard>

          <GlareCard className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text mb-4 leading-tight">
                Task Efficiency
              </div>

              <p className="text-gray-300 leading-relaxed text-base">
                Architected to eliminate repetitive manual work through intelligent workflows.
              </p>
            </div>
          </GlareCard>

          <GlareCard className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text mb-4 leading-tight">
                Scalable Systems
              </div>

              <p className="text-gray-300 leading-relaxed text-base">
                Built to support growth with robust and flexible digital infrastructure.
              </p>
            </div>
          </GlareCard>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;