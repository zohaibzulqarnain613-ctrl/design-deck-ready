import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const WebDevelopmentPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2369&auto=format&fit=crop",
      subheading: "Modern Design",
      heading: "Beautiful Interfaces",
      title: "User-Centric Design",
      description: "We create stunning, intuitive interfaces that users love. Every pixel is crafted with attention to detail, ensuring your website not only looks amazing but provides an exceptional user experience."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2372&auto=format&fit=crop",
      subheading: "Performance Optimized",
      heading: "Lightning Fast",
      title: "Speed & SEO",
      description: "Built with modern technologies and best practices, our websites load in milliseconds. Optimized for search engines and performance, ensuring maximum visibility and user engagement."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop",
      subheading: "Scalable Architecture",
      heading: "Future-Proof Code",
      title: "Built to Scale",
      description: "Clean, maintainable code architecture that grows with your business. Seamless integration with CRM, marketing tools, AI chatbots, and all the systems that power your operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default WebDevelopmentPage;
