import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const AIChatbotsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2340&auto=format&fit=crop",
      subheading: "Instant Support",
      heading: "24/7 Customer Service",
      title: "Always Available",
      description: "Deploy intelligent chatbots that handle customer inquiries instantly. Reduce response times from hours to seconds, improve customer satisfaction, and free up your team to focus on complex issues."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2340&auto=format&fit=crop",
      subheading: "Smart Automation",
      heading: "AI-Powered Conversations",
      title: "Intelligent Responses",
      description: "Our chatbots use advanced NLP to understand context, intent, and sentiment. They learn from every interaction, providing personalized responses and seamlessly escalating complex queries to human agents."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      subheading: "Multi-Channel",
      heading: "Everywhere Your Customers Are",
      title: "Unified Experience",
      description: "Deploy across website, WhatsApp, Instagram, Facebook Messenger, and more. Maintain consistent brand voice and seamless experiences across all platforms with centralized management and analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default AIChatbotsPage;
