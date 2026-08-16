import React, { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Component as HeroSection } from './ui/hero-section';
import TeamMessageModal from './TeamMessageModal';
import CardFlip from './ui/flip-card';
import { getOptimizedImageUrl } from '@/utils/image-optimization';

interface TeamMemberProps {
...
  const teamMembers = [
    {
      name: "Samy",
      role: "CEO",
      tagline: "Build the system the business actually needs.",
      description: "Leads company direction and works with clients to define the business problem before deciding what should be built.",
      message: "SamysAI exists to make advanced technology practical.\n\nWe build AI powered systems, digital products, and growth infrastructure for businesses that need their operations to run more reliably. That means AI phone callers and chatbots, web and app development, cold email dashboards and content systems, delivered as one connected stack rather than separate services.\n\nOur approach starts with the business problem. We look at how work happens today, where time is lost, and where a system can carry the repetitive load. Then we build something that fits how the team already works.\n\nIf that is the kind of technology partner you are looking for, we would be glad to talk.",
      color: "#3b82f6",
      expertise: ['Strategy', 'Business Systems', 'AI Solutions', 'Growth'],
      imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      name: "JZ",
      role: "Head of AI",
      tagline: "Automation should be useful before it is impressive.",
      description: "Leads AI and automation work, including AI phone callers and chatbots.",
      message: "My work at SamysAI focuses on AI and automation: the phone callers, chatbots, and workflows that handle conversations and repetitive tasks.\n\nThe goal with every one of these systems is the same. It should reduce manual work, handle its part of the process reliably, and hand off cleanly to a person when a person is needed.\n\nWe use AI where it genuinely helps. When a simpler approach solves the problem better, we build that instead.",
      color: "#8b5cf6",
      expertise: ['AI Systems', 'Automation', 'AI Callers', 'Chatbots'],
      imageUrl: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
    },
    {
      name: "Zaibi",
      role: "Head of Web Development",
      tagline: "Websites are operational tools, not just pages.",
      description: "Leads web development, from customer facing websites to internal dashboards.",
      message: "I lead web development at SamysAI.\n\nWe build websites and web applications that are fast, clear to use, and straightforward to maintain. In most projects the site is connected to something else we build, such as an automation, a dashboard, or a chatbot, so it needs to work as part of a larger system rather than on its own.\n\nWe care about performance, accessibility, and keeping the codebase in a state where the business can keep building on it.",
      color: "#06b6d4",
      expertise: ['Web Development', 'Dashboards', 'Performance', 'Full Stack'],
      imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      name: "AZ",
      role: "Head of Content Creation",
      tagline: "Clear content does more work than clever content.",
      description: "Leads content creation and the messaging that supports outreach and growth work.",
      message: "I lead content creation at SamysAI.\n\nContent is part of the growth infrastructure we build. It supports outreach campaigns, product pages, and the systems that put a message in front of the right audience.\n\nMy focus is on writing that is specific and honest about what a business does, because that is what earns attention and holds it.",
      color: "#ec4899",
      expertise: ['Content Strategy', 'Brand Messaging', 'AI Content', 'Outreach'],
      imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
    },
    {
      name: "Sufi K",
      role: "Head of App Development",
      tagline: "Ship something people can use every day.",
      description: "Leads mobile and cross platform app development.",
      message: "I lead app development at SamysAI.\n\nWe build mobile and cross platform applications, usually connected to the same systems and data the rest of the stack uses. That connection matters, because an app that sits apart from the business tends to be abandoned.\n\nFrom the first build to release, the priority is a product that is stable, usable, and possible to extend later.",
      color: "#10b981",
      expertise: ['App Development', 'Mobile Apps', 'Cross Platform', 'User Experience'],
      imageUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
    }
  ];
...
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto justify-items-center">
            {teamMembers.map((member, index) => (
              <CardFlip
                key={member.name}
                title={member.name}
                subtitle={member.role}
                description={member.description}
                features={member.expertise}
                color={member.color}
                imageUrl={getOptimizedImageUrl(member.imageUrl, { width: 400 })}
                onLearnMore={() => setActiveMember(index)}
              />
            ))}
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
              Together, we build intelligent systems that solve real business problems.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => {
                    window.location.href = 'https://calendly.com/samysai/clients';
                  }}
                  className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-full shadow-2xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Book a Strategy Consultation</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                  className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-full shadow-2xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Contact Our Team</span>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(AboutUsPage);
