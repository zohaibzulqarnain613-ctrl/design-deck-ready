import React, { useState } from 'react';

const accordionItems = [
  {
    id: 1,
    title: 'AI Phone Callers',
    imageUrl: 'https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'AI Chatbots',
    imageUrl: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Content Creation',
    imageUrl: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title: 'Cold Email Dashboards',
    imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    title: 'App Development',
    imageUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const AccordionItem = ({ item, isActive, onMouseEnter, isMobile }: { item: typeof accordionItems[0], isActive: boolean, onMouseEnter: () => void, isMobile: boolean }) => {
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
        src={item.imageUrl}
        key={item.imageUrl}
        alt={item.title}
        loading="eager"
        decoding="sync"
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
  const [activeIndex, setActiveIndex] = useState(5);
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
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <section className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tighter drop-shadow-2xl">
              Transform Your Business with Intelligent AI Solutions
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
              At SamysAI, we design and deploy advanced AI systems — from phone callers and chatbots to web development and content automation — empowering businesses to operate smarter and scale efficiently.
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
