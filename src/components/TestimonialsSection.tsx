import React from 'react';
import { Component as TypewriterTestimonial } from '@/components/ui/typewriter-testimonial';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_2.mp3',
      text: 'The AI Phone Caller handles 200+ calls daily with perfect consistency. Our lead qualification improved by 60% and our sales team only talks to hot prospects now.',
      name: 'Marcus Rodriguez',
      jobtitle: 'Sales Director',
    },
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_3.mp3',
      text: 'The AI Chatbot on our website converted 3x more visitors into customers. It handles support 24/7 and our customer satisfaction scores went from 72% to 94%.',
      name: 'Emily Watson',
      jobtitle: 'E-commerce Manager',
    },
    {
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_4.mp3',
      text: 'Their web development transformed our online presence. Beautiful design, lightning-fast performance, and we saw a 250% increase in conversions within the first month.',
      name: 'David Kim',
      jobtitle: 'CEO',
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_5.mp3',
      text: 'Content creation service is a game-changer. They produce 50+ pieces monthly that perfectly match our brand voice. Organic traffic up 400% in 6 months.',
      name: 'Lisa Thompson',
      jobtitle: 'Content Marketing Lead',
    },
    {
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_7.mp3',
      text: 'Cold Email Dashboard generated 180 qualified leads in 8 weeks. The analytics and automation features helped us optimize every campaign for maximum ROI.',
      name: 'Rachel Green',
      jobtitle: 'Growth Manager',
    },
    {
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_8.mp3',
      text: 'The AI Phone Caller system books 40+ qualified appointments weekly. Natural conversations, perfect follow-ups, and seamless CRM integration. Absolute game-changer.',
      name: 'Michael Brown',
      jobtitle: 'Business Development Director',
    },
    {
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_9.mp3',
      text: 'Our AI Chatbot handles 85% of customer inquiries without human intervention. Support costs down 40%, response times from hours to seconds. Incredible ROI.',
      name: 'Jennifer Lee',
      jobtitle: 'Customer Success Manager',
    },
    {
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_10.mp3',
      text: 'Website redesign brought our vision to life. Modern, fast, and mobile-optimized. Sales inquiries tripled and our bounce rate dropped from 65% to 22%.',
      name: 'Robert Taylor',
      jobtitle: 'Founder',
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_11.mp3',
      text: 'Their content creation delivers consistent, high-quality posts across all platforms. Engagement up 320%, and we finally have time to focus on strategy instead of production.',
      name: 'Amanda Wilson',
      jobtitle: 'Social Media Director',
    },
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_12.mp3',
      text: 'Cold Email Dashboard with automated sequences generated $340K in pipeline. Deliverability optimization and A/B testing helped us dial in the perfect messaging.',
      name: 'Chris Martinez',
      jobtitle: 'VP of Sales',
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_13.mp3',
      text: 'AI Phone Callers follow up with every lead within minutes. No more missed opportunities. Our close rate improved 45% and sales cycle shortened by 2 weeks.',
      name: 'Daniel Foster',
      jobtitle: 'Sales Operations Manager',
    },
    {
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_14.mp3',
      text: 'The chatbot integration on our site captures leads even when we sleep. It qualifies prospects, books demos, and answers technical questions better than our junior reps.',
      name: 'Sarah Mitchell',
      jobtitle: 'Marketing Director',
    },
    {
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_15.mp3',
      text: 'Web development project exceeded expectations. They built a scalable platform that handles 10K+ daily users without breaking a sweat. Performance and security are top-notch.',
      name: 'James Anderson',
      jobtitle: 'CTO',
    },
    {
      image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_16.mp3',
      text: 'Content creation service keeps our blog, social media, and newsletters running smoothly. Quality is consistently excellent and turnaround times are impressively fast.',
      name: 'Nicole Chen',
      jobtitle: 'Brand Manager',
    },
    {
      image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=150&h=150&fit=crop&crop=face&auto=format',
      audio: 'audio_17.mp3',
      text: 'Cold Email Dashboard analytics showed us exactly what works. We optimized our messaging and saw reply rates jump from 2% to 12%. Revenue impact was massive.',
      name: 'Patricia Johnson',
      jobtitle: 'Revenue Operations',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hover over each testimonial to see their experience with our AI automation services.
          </p>
        </div>
        
        <div className="flex justify-center">
          <TypewriterTestimonial testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;