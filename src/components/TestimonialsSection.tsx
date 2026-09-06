import React from 'react';
import { Component as TypewriterTestimonial } from '@/components/ui/typewriter-testimonial';
import hananeImage from '@/assets/client-hanane.jpg';
import davidImage from '@/assets/client-david.jpg';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      image: hananeImage,
      audio: '',
      text: 'They rebuilt our website and handled the SEO side properly. Pages load fast, the structure finally makes sense, and we are showing up for searches we never ranked for before.',
      name: 'Hanane Benalia',
      jobtitle: 'Web Development and SEO',
    },
    {
      image: davidImage,
      audio: '',
      text: 'The done for you cold email setup saved us a lot of guesswork. Inboxes stayed healthy, the copy sounded like us, and replies started coming in within the first few weeks.',
      name: 'David Weber',
      jobtitle: 'Cold Email Outreach',
    },
    {
      image: '',
      audio: '',
      text: 'Technical performance metrics and growth indicators are being compiled for our recent enterprise deployments.',
      name: 'Enterprise Client',
      jobtitle: 'Case Study Pending',
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              Client Experiences
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Case studies and verified outcome reports from our latest deployments are currently being documented.
          </p>
        </div>
        
        <div className="flex justify-center">
          <TypewriterTestimonial testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;