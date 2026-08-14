import React, { lazy, Suspense } from 'react';
import SplineScene from '@/components/SplineScene';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { Tag } from '@/components/ui/vapour-text-effect';
import ResponsiveVaporizeText from '@/components/ResponsiveVaporizeText';
import TypewriterEffect from '@/components/TypewriterEffect';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';

const CaseStudiesSection = lazy(() => import('@/components/CaseStudiesSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContactFooter = lazy(() => import('@/components/ContactFooter'));
const DottedSurface = lazy(() => import('@/components/ui/dotted-surface').then(module => ({ default: module.DottedSurface })));

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30 particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <Suspense fallback={null}>
          <DottedSurface />
        </Suspense>
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            {/* Left Column - Content */}
            <div className="flex-1 flex flex-col justify-center text-left space-y-4 sm:space-y-6 w-full">
              {/* Main Title */}
              <WordPullUp
                words="SamysAI"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl text-left"
                wrapperFramerProps={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3,
                    },
                  },
                }}
                framerProps={{
                  hidden: { y: 30, opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.8 } },
                }}
              />

              {/* Animated Subtitle */}
              <div className="w-full min-h-[64px] sm:min-h-[80px] md:min-h-[96px] flex items-center justify-start">
                <div className="w-full h-full">
                  <ResponsiveVaporizeText
                    texts={["SamysAI", "AI Automation", "that Scales", "Your Business"]}
                    color="rgb(147, 197, 253)"
                    spread={4}
                    density={7}
                    animation={{
                      vaporizeDuration: 1.8,
                      fadeInDuration: 0.8,
                      waitDuration: 1.2
                    }}
                    direction="left-to-right"
                    alignment="left"
                    tag={Tag.H2}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                <TypewriterEffect
                  text="The future belongs to those who automate intelligently. At SamysAI, we craft AI experiences that think, learn, and evolve with you."
                  speed={50}
                  showCursor={false}
                />
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="https://calendly.com/samysai/clients"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 md:hover:scale-110 transition-all duration-500 ease-in-out overflow-hidden"
                >
                  <span className="relative z-10">Book a Consultation</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-110"></div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                </a>
              </div>
            </div>

            {/* Right Column - Robot */}
            <div className="flex-1 flex items-center justify-center w-full mt-4 md:mt-0">
              <div className="w-full flex items-center justify-center relative">
                {/* Robot Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative float-animation w-full">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[580px] object-cover max-w-full overflow-visible rounded-lg relative z-10 scale-110"
                />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/2 transform -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </section>
      
      {/* Services Section */}
      <ServicesSection />

      {/* Marquee Animation Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/40 to-black/40 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4 md:gap-5">
          <MarqueeAnimation
            direction="left"
            baseVelocity={-1.5}
            className="bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-cyan-600/20 text-blue-200 py-3 sm:py-4 md:py-5 px-4 sm:px-6 backdrop-blur-sm border border-blue-500/20 rounded-lg"
          >
            AI Phone Callers • AI Chatbots • Web Development • Content Creation • App Development • Cold Email
          </MarqueeAnimation>
          <MarqueeAnimation
            direction="right"
            baseVelocity={-1.5}
            className="bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-pink-600/20 text-purple-200 py-3 sm:py-4 md:py-5 px-4 sm:px-6 backdrop-blur-sm border border-purple-500/20 rounded-lg"
          >
            Automation • Scalability • Intelligence • Growth • Transformation
          </MarqueeAnimation>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        {/* Case Studies Section */}
        <CaseStudiesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Footer */}
        <ContactFooter />
      </Suspense>
    </>
  );
};

export default HomePage;
