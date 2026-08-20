import React, { useState } from 'react';
import { getOptimizedImageUrl, getImageSrcSet } from '@/utils/image-optimization';

const accordionItems = [
  {
    id: 1,
    title: 'AI Phone Sales & Support',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  },
  {
    id: 2,
    title: 'Intelligent AI Chatbots',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
  },
  {
    id: 3,
    title: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  },
  {
    id: 4,
    title: 'Content Creation',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  },
  {
    id: 5,
    title: 'Cold Email Dashboards',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa',
  },
  {
    id: 6,
    title: 'App Development',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
  },
];

const AccordionItem = ({ item, isActive, onMouseEnter, isMobile, index }: { item: typeof accordionItems[0], isActive: boolean, onMouseEnter: () => void, isMobile: boolean, index: number }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isMobile
          ? isActive ? 'w-full h-[300px]' : 'w-full h-[60px]'
          : isActive ? 'w-[400px] h-[450px]' : 'w-[60px] h-[450px]'
        }
      `}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
    >
      <img
        src={getOptimizedImageUrl(item.imageUrl, isActive ? 800 : 400)}
        srcSet={getImageSrcSet(item.imageUrl, [400, 800, 1200])}
        sizes={isActive ? "(max-width: 768px) 100vw, 400px" : "60px"}
        key={item.imageUrl}
        alt={item.title}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        decoding={index === 0 ? "sync" : "async"}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { 
          const target = e.target as HTMLImageElement; 
          target.onerror = null; 
          target.src = `https://placehold.co/400x450/2d3748/ffffff?text=${encodeURIComponent(item.title)}`; 
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${isMobile
            ? isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'left-6 top-1/2 -translate-y-1/2 rotate-0'
            : isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative bg-[#050505] overflow-hidden">
      {/* Background Effects - More subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/[0.02] rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/[0.02] rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <section className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="w-full md:w-1/2 text-center md:text-left px-2 sm:px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tighter drop-shadow-2xl">
              Scale Your Business with AI-Powered Systems
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed px-2 sm:px-0">
              We design and build AI-powered systems, digital products, and growth infrastructure designed to automate repetitive tasks and accelerate your business growth.
            </p>
            <div className="mt-6 sm:mt-8">
              <a
                href="#contact"
                className="inline-block group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 ease-in-out overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-110"></div>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 p-4 ${isMobile ? '' : 'overflow-x-auto'}`}>
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
