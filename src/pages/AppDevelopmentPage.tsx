import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const AppDevelopmentPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
      subheading: "Native & Cross-Platform",
      heading: "Build for Every Device",
      title: "Mobile-First Applications",
      description: "Create powerful mobile applications for iOS and Android with native performance and seamless user experiences. Our apps are built to scale, optimized for performance, and designed to engage users across all devices."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
      subheading: "Modern Tech Stack",
      heading: "Cutting-Edge Development",
      title: "Future-Proof Architecture",
      description: "Leverage React Native, Flutter, and progressive web technologies to build apps that work everywhere. Clean, maintainable code architecture ensures your app evolves with your business needs."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
      subheading: "User Experience",
      heading: "Intuitive Design",
      title: "Engagement That Converts",
      description: "Every tap, swipe, and interaction is crafted to delight users. From onboarding flows to core features, we design experiences that keep users engaged and drive business results through data-driven design decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default AppDevelopmentPage;
