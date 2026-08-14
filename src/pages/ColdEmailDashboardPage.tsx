import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const ColdEmailDashboardPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      subheading: "Campaign Management",
      heading: "All-in-One Dashboard",
      title: "Centralized Control",
      description: "Manage every cold email campaign from a single, intuitive dashboard. Monitor open rates, click-throughs, and conversions in real-time with advanced analytics and reporting."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      subheading: "Email Analytics",
      heading: "Data-Driven Insights",
      title: "Performance Tracking",
      description: "Track every metric that matters. Our dashboard provides deep insights into campaign performance, helping you optimize messaging and timing for maximum engagement."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2340&auto=format&fit=crop",
      subheading: "AI Optimization",
      heading: "Smart Automation",
      title: "Intelligent Follow-Ups",
      description: "Let AI handle the heavy lifting. Automated A/B testing, smart follow-up sequences, and AI-optimized subject lines ensure your campaigns deliver maximum results."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default ColdEmailDashboardPage;
