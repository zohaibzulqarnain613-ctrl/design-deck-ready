import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Component as HeroSection } from './ui/hero-section';
import TeamMessageModal from './TeamMessageModal';
import CardFlip from './ui/flip-card';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

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

  useEffect(() => {
    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (teamRef.current) {
      teamObserver.observe(teamRef.current);
    }

    return () => {
      teamObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Section - Distinct Layout */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-mono text-blue-400 uppercase tracking-[0.3em] mb-8">Our Purpose</h2>
          <p className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter text-white">
            At SamysAI, we empower businesses with intelligent systems that amplify human potential and make technology feel <span className="text-blue-400">seamless</span>.
          </p>
        </div>
      </section>

      {/* Vision & Values - Grid Layout */}
      <section className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Vision</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              We aim to lead the global transformation of modern business through AI that feels natural, learns continuously, and scales effortlessly.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Values</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Innovation', 'Integrity', 'Excellence', 'Empowerment'].map((v) => (
                <div key={v} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-sm font-semibold text-gray-300">
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-mono text-purple-400 uppercase tracking-[0.3em] mb-4">The Experts</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Meet the Team
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto justify-items-center">
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
      <section className="relative py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-4xl font-bold text-white mb-12 tracking-tighter leading-tight">
              Together, we're building the future of automation — one intelligent system at a time.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => {
                  window.location.href = '/#contact';
                }}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-full shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
