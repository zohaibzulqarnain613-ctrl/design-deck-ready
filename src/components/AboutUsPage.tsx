import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TeamModal from './TeamModal';
import GalleryHoverCarousel from './ui/gallery-hover-carousel';
import { Component as HeroSection } from './ui/hero-section';
import CardFlip from './ui/flip-card';
import TeamMessageModal from './TeamMessageModal';
import { MissionSection } from './MissionSection';
import { VisionSection } from './VisionSection';
import { ValuesSection } from './ValuesSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { PromiseSection } from './PromiseSection';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  description,
  index,
  isVisible,
  onClick
}) => {
  return (
    <div
      className={`group relative transition-all duration-1000 ease-out cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={onClick}
    >
      {/* Glassmorphism Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-blue-500/25 group-hover:bg-white/10 transform-gpu perspective-1000">
        {/* Gradient Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-600/5 rounded-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Avatar Placeholder */}
        <div className="relative mb-6 flex justify-center">
          <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/60 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
            {/* Icon Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-lg animate-pulse"></div>
            <div className="text-white text-3xl font-bold relative z-10 group-hover:scale-110 transition-transform duration-500">
              {name.charAt(0)}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative text-center z-10">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-500">
            {name}
          </h3>
          <p className="text-blue-300 font-semibold mb-3 text-lg">
            {role}
          </p>
          <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-100 transition-colors duration-500">
            {description}
          </p>
        </div>
        
        {/* Hover Glow Border */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm -z-10"></div>
      </div>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      name: "Samy",
      role: "CEO",
      tagline: "Turning automation into intelligence.",
      description: "Leading innovation at SamysAI with strategic vision and business excellence.",
      message: "At SamysAI, our mission is simple — to redefine how businesses operate through intelligent automation.\n\nI started SamysAI with one belief: AI should empower people, not replace them. Every system we build — from AI phone callers to automated outreach — is designed to help teams focus on creativity, strategy, and growth instead of repetitive work.\n\nWhat makes us different isn't just our technology — it's our commitment to building tailored AI systems that feel natural, integrate seamlessly, and actually deliver measurable results.\n\nWhether you're a startup or an established brand, we're here to help you automate smarter, communicate better, and scale faster.",
      color: "#3b82f6"
    },
    {
      name: "JZ",
      role: "Head of AI",
      tagline: "Building intelligence that understands.",
      description: "Pioneering AI solutions and automation technologies for business transformation.",
      message: "At SamysAI, our focus isn't just building AI — it's building intelligence that understands your business.\n\nEvery AI caller, chatbot, or automation we design learns, adapts, and improves with time — creating experiences that feel human, yet perform with machine precision.\n\nMy goal is to ensure that every AI system we deliver not only saves time, but also elevates how your brand communicates and converts.",
      color: "#8b5cf6"
    },
    {
      name: "Zaibi",
      role: "Head of Web Development",
      tagline: "Engineering digital experiences that scale.",
      description: "Creating high-performance websites and digital experiences that convert.",
      message: "At SamysAI, we believe a website isn't just a digital presence — it's the foundation of your brand's intelligence.\n\nMy team focuses on building high-performance, automated web systems that don't just look beautiful, but work seamlessly with AI-driven workflows and user experiences.\n\nEvery pixel, every line of code is designed with one purpose — to convert, scale, and evolve with your business.",
      color: "#06b6d4"
    },
    {
      name: "AZ",
      role: "Head of Content Creation",
      tagline: "Where technology meets emotion.",
      description: "Crafting compelling content strategies that engage and drive results.",
      message: "At SamysAI, we see content as the bridge between technology and emotion.\n\nMy mission is to craft AI-powered narratives that don't just inform — they connect, inspire, and convert.\n\nFrom ad copy to long-form storytelling, our content systems learn from data and human creativity to deliver messages that feel authentic, relevant, and uniquely yours.",
      color: "#ec4899"
    },
    {
      name: "Sufi K",
      role: "Head of App Development",
      tagline: "Building apps that transform ideas into reality.",
      description: "Developing powerful mobile and desktop applications that deliver exceptional user experiences.",
      message: "At SamysAI, app development is about creating seamless experiences that users love.\n\nI lead our app development team in building native and cross-platform applications that are fast, intuitive, and scalable.\n\nFrom concept to deployment, we ensure every app we build drives engagement and delivers real value to your business.",
      color: "#10b981"
    }
  ];

  const carouselTeamMembers = [
    {
      id: "member-1",
      title: "Samy - CEO",
      summary: "Leading innovation at SamysAI with strategic vision and business excellence.",
      initial: "S",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      onClick: () => setActiveMember(0),
    },
    {
      id: "member-2",
      title: "JZ - AI Head",
      summary: "Pioneering AI solutions and automation technologies for business transformation.",
      initial: "J",
      image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400",
      onClick: () => setActiveMember(1),
    },
    {
      id: "member-3",
      title: "Zaibi - Web Development Head",
      summary: "Creating high-performance websites and digital experiences that convert.",
      initial: "Z",
      image: "https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&cs=tinysrgb&w=400",
      onClick: () => setActiveMember(2),
    },
    {
      id: "member-4",
      title: "AZ - Content Creation Head",
      summary: "Crafting compelling content strategies that engage and drive results.",
      initial: "A",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      onClick: () => setActiveMember(3),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }

    return () => {
      observer.disconnect();
      teamObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Section */}
      <MissionSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Promise Section */}
      <PromiseSection />

      {/* Team Section */}
      <section ref={teamRef} className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Meet the Team
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Meet the talented individuals driving innovation at SamysAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto justify-items-center">
            <CardFlip
              title={teamMembers[0].name}
              subtitle={teamMembers[0].role}
              description={teamMembers[0].description}
              features={[
                'Strategic Vision',
                'Business Excellence',
                'Innovation Leader',
                'Growth Expert'
              ]}
              color="#3b82f6"
              imageUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
              onLearnMore={() => setActiveMember(0)}
            />
            <CardFlip
              title={teamMembers[1].name}
              subtitle={teamMembers[1].role}
              description={teamMembers[1].description}
              features={[
                'AI Architecture',
                'Automation Expert',
                'Machine Learning',
                'Innovation Pioneer'
              ]}
              color="#8b5cf6"
              imageUrl="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=300"
              onLearnMore={() => setActiveMember(1)}
            />
            <CardFlip
              title={teamMembers[2].name}
              subtitle={teamMembers[2].role}
              description={teamMembers[2].description}
              features={[
                'Full-Stack Dev',
                'Performance Expert',
                'Scalable Systems',
                'Clean Architecture'
              ]}
              color="#06b6d4"
              imageUrl="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
              onLearnMore={() => setActiveMember(2)}
            />
            <CardFlip
              title={teamMembers[3].name}
              subtitle={teamMembers[3].role}
              description={teamMembers[3].description}
              features={[
                'Content Strategy',
                'Brand Voice',
                'AI-Powered Copy',
                'Engagement Expert'
              ]}
              color="#ec4899"
              imageUrl="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300"
              onLearnMore={() => setActiveMember(3)}
            />
            <CardFlip
              title={teamMembers[4].name}
              subtitle={teamMembers[4].role}
              description={teamMembers[4].description}
              features={[
                'Mobile Apps',
                'Cross-Platform',
                'User Experience',
                'Scalable Solutions'
              ]}
              color="#10b981"
              imageUrl="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300"
              onLearnMore={() => setActiveMember(4)}
            />
          </div>
        </div>
      </section>

      {activeMember !== null && (
        <TeamMessageModal
          isOpen={true}
          onClose={() => setActiveMember(null)}
          name={teamMembers[activeMember].name}
          role={teamMembers[activeMember].role}
          tagline={teamMembers[activeMember].tagline}
          message={teamMembers[activeMember].message}
          color={teamMembers[activeMember].color}
        />
      )}

      {/* Closing Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 transition-all duration-1000 ${
            teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '800ms' }}>
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed">
                Together, we're building the future of automation — one intelligent system at a time.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-500 ease-in-out overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-110"></div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;