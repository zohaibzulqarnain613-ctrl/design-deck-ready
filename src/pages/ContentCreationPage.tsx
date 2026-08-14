import React, { useEffect } from 'react';
import { ServiceParallaxContent } from '../components/ui/text-parallax-content-scroll';

const ContentCreationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parallaxItems = [
    {
      imgUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2340&auto=format&fit=crop",
      subheading: "AI Writing",
      heading: "Smart Content Generation",
      title: "Effortless Creation",
      description: "Generate high-quality blog posts, articles, and social media content in minutes. Our AI understands your brand voice and creates compelling content that engages your audience and drives action."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop",
      subheading: "Brand Consistency",
      heading: "On-Brand Every Time",
      title: "Voice & Tone Mastery",
      description: "Train the AI on your brand guidelines, tone, and style preferences. Every piece of content maintains consistency across channels while adapting to platform-specific best practices."
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2340&auto=format&fit=crop",
      subheading: "Content Performance",
      heading: "Data-Driven Strategy",
      title: "Optimize & Scale",
      description: "Track content performance across channels with comprehensive analytics. Use data insights to refine your content strategy and scale production without sacrificing quality or engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16">
      <ServiceParallaxContent items={parallaxItems} />
    </div>
  );
};

export default ContentCreationPage;
