import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SterlingGateKineticNavigation } from './ui/sterling-gate-kinetic-navigation';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate({ to: '/' });
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const serviceCategories = [
    {
      label: 'AI & Automation',
      items: [
        { name: 'AI Phone Callers', path: '/services/ai-phone-callers' },
        { name: 'AI Chatbots', path: '/services/ai-chatbots' }
      ]
    },
    {
      label: 'Digital Development',
      items: [
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'App Development', path: '/services/app-development' }
      ]
    },
    {
      label: 'Growth & Operations',
      items: [
        { name: 'Cold Email Dashboards', path: '/services/cold-email-dashboard' },
        { name: 'Content Creation', path: '/services/content-creation' }
      ]
    }
  ];

  const allServices = serviceCategories.flatMap(cat => cat.items);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className={`flex items-center space-x-2 sm:space-x-3 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border-2 border-blue-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-9 h-9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Neural network nodes */}
                  <circle cx="50" cy="20" r="6" fill="#60A5FA" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="30" cy="45" r="5" fill="#3B82F6" opacity="0.85">
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="2.3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="8" fill="#60A5FA" opacity="1">
                    <animate attributeName="r" values="8;9;8" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="45" r="5" fill="#3B82F6" opacity="0.85">
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="2.1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="80" r="6" fill="#60A5FA" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="25" cy="70" r="4" fill="#3B82F6" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="75" cy="70" r="4" fill="#3B82F6" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.4s" repeatCount="indefinite" />
                  </circle>

                  {/* Connecting lines - neural pathways */}
                  <line x1="50" y1="20" x2="30" y2="45" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="20" x2="50" y2="50" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="20" x2="70" y2="45" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                  </line>
                  <line x1="30" y1="45" x2="50" y2="50" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.1s" repeatCount="indefinite" />
                  </line>
                  <line x1="70" y1="45" x2="50" y2="50" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.9s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="50" x2="25" y2="70" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.3s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="50" x2="50" y2="80" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="50" x2="75" y2="70" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.4s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
              SamysAI
            </span>
          </div>

          {/* Kinetic Menu Trigger (Desktop & Mobile replacement) */}
          <div className="flex items-center">
            <SterlingGateKineticNavigation />
          </div>

          {/* Desktop Navigation Links - Hidden since we now use the Kinetic Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* The kinetic menu handles navigation now */}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Replaced by Kinetic Navigation Overlay */}
    </nav>
  );
};

export default Navbar;