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
          <div className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed whitespace-pre-wrap">
{`'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            For the code present, I get the error below.

Please think step-by-step in order to resolve it.
\`\`\`
Failed to fetch dynamically imported module: https://5edae89d-ec98-4829-99e4-7827c7bed903.lovableproject.com/src/components/ChatBot.tsx

{
  "timestamp": 1787518787439,
  "error_type": "RUNTIME_ERROR",
  "filename": "/",
  "lineno": 0,
  "colno": 0,
  "stack": "TypeError: Failed to fetch dynamically imported module: https://5edae89d-ec98-4829-99e4-7827c7bed903.lovableproject.com/src/components/ChatBot.tsx",
  "has_blank_screen": true
}
\`\`\``}
          </div>
        </div>
        <LandingAccordionItem />
      </div>
    </section>
  );
};

export default ServicesSection;
