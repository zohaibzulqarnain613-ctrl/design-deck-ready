import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const AIPhoneCallersPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2340&auto=format&fit=crop",
      subheading: "24/7 Availability",
      heading: "Always On Call",
      title: "Never Miss a Lead",
      description: "AI-powered phone agents that work around the clock. Handle incoming calls, qualify leads, and book appointments while you focus on closing deals. Your virtual receptionist never sleeps."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      subheading: "Natural Conversations",
      heading: "Human-Like Interactions",
      title: "Advanced Voice AI",
      description: "Powered by cutting-edge AI technology, our phone callers engage in natural, context-aware conversations. They understand intent, handle objections, and deliver personalized responses that feel genuinely human."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      subheading: "Call Analytics",
      heading: "Data-Driven Insights",
      title: "Optimize Performance",
      description: "Track every call with detailed analytics. Monitor conversion rates, call duration, sentiment analysis, and key conversation triggers. Use data insights to continuously improve your calling strategy."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default AIPhoneCallersPage;
