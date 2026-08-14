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
      tagline: "Build the system the business actually needs.",
      description: "Leads company direction and works with clients to define the problem before any system is built.",
      message: "SamysAI exists to make advanced technology practical.\n\nWe build AI powered systems, digital products, and growth infrastructure for businesses that need their operations to run more reliably. That means AI phone callers and chatbots, web and app development, cold email dashboards and content systems, delivered as one connected stack rather than separate services.\n\nOur approach starts with the business problem. We look at how work happens today, where time is lost, and where a system can carry the repetitive load. Then we build something that fits how the team already works.\n\nIf that is the kind of technology partner you are looking for, we would be glad to talk.",
      color: "#3b82f6"
    },
    {
      name: "JZ",
      role: "Head of AI",
      tagline: "Automation should be useful before it is impressive.",
      description: "Leads AI and automation work, including AI phone callers and chatbots.",
      message: "My work at SamysAI focuses on AI and automation: the phone callers, chatbots, and workflows that handle conversations and repetitive tasks.\n\nThe goal with every one of these systems is the same. It should reduce manual work, handle its part of the process reliably, and hand off cleanly to a person when a person is needed.\n\nWe use AI where it genuinely helps. When a simpler approach solves the problem better, we build that instead.",
      color: "#8b5cf6"
    },
    {
      name: "Zaibi",
      role: "Head of Web Development",
      tagline: "Websites are operational tools, not just pages.",
      description: "Leads web development, from customer facing sites to internal dashboards.",
      message: "I lead web development at SamysAI.\n\nWe build websites and web applications that are fast, clear to use, and straightforward to maintain. In most projects the site is connected to something else we build, such as an automation, a dashboard, or a chatbot, so it needs to work as part of a larger system rather than on its own.\n\nWe care about performance, accessibility, and keeping the codebase in a state where the business can keep building on it.",
      color: "#06b6d4"
    },
    {
      name: "AZ",
      role: "Head of Content Creation",
      tagline: "Clear content does more work than clever content.",
      description: "Leads content creation and the messaging that supports outreach and growth work.",
      message: "I lead content creation at SamysAI.\n\nContent is part of the growth infrastructure we build. It supports outreach campaigns, product pages, and the systems that put a message in front of the right audience.\n\nMy focus is on writing that is specific and honest about what a business does, because that is what earns attention and holds it.",
      color: "#ec4899"
    },
    {
      name: "Sufi K",
      role: "Head of App Development",
      tagline: "Ship something people can use every day.",
      description: "Leads mobile and cross platform app development.",
      message: "I lead app development at SamysAI.\n\nWe build mobile and cross platform applications, usually connected to the same systems and data the rest of the stack uses. That connection matters, because an app that sits apart from the business tends to be abandoned.\n\nFrom the first build to release, the priority is a product that is stable, usable, and possible to extend later.",
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
