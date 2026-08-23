import React from 'react';
import { LandingAccordionItem } from './ui/interactive-image-accordion';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-blue-400 uppercase tracking-[0.3em] mb-4">
            WHAT WE BUILD
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
            AI Systems & Digital Services
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            again you have remove robot dont do this again
          </p>
        </div>
        <LandingAccordionItem />
      </div>
    </section>
  );
};

export default ServicesSection;