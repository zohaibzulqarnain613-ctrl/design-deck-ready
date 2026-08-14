import React, { lazy, Suspense, useEffect, useState } from 'react';
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
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Only show particles on desktop or high-performance devices to save mobile CPU
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowParticles(true);
    }
  }, []);

  if (!showParticles) return null;

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
                words="Scale Your Business with Intelligent AI Systems"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl text-left tracking-tighter"
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
                    texts={["Automate Repetitive Work", "Reduce Manual Tasks", "Improve Efficiency", "Scale Operations"]}
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
                  text="We design and deploy custom AI systems—from autonomous phone callers to smart chatbots—that handle your repetitive tasks so you can focus on growth."
                  speed={50}
                  showCursor={false}
                />
              </div>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="https://calendly.com/samysai/clients"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 md:hover:scale-110 transition-all duration-500 ease-in-out overflow-hidden"
                >
                  <span className="relative z-10">Book a Strategy Consultation</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-110"></div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Explore AI Systems
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

      {/* Technology Ecosystem Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="text-center mb-4">
            <h3 className="text-sm font-mono text-blue-400 uppercase tracking-[0.3em] opacity-80">Our Technology Ecosystem</h3>
          </div>
          <Suspense fallback={<div className="h-12 bg-white/5 animate-pulse rounded-lg" />}>
            <MarqueeAnimation
              direction="left"
              baseVelocity={-1}
              className="text-gray-400 py-4 tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity font-mono text-xs uppercase"
            >
              OpenAI • Anthropic • Vapi • Retell • Meta • Google Cloud • AWS • Pinecone • LangChain • Twilio
            </MarqueeAnimation>
          </Suspense>
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
