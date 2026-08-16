import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import { Cpu, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo 2.jpeg';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation Links */}
          <div className={`hidden lg:flex items-center space-x-6 xl:space-x-8 transition-all duration-700 ease-out delay-200 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Home */}
            <Link
              to="/"
              preload={isMobile ? false : "intent"}
              className="relative text-white font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              preload={isMobile ? false : "intent"}
              className="relative text-white font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:rounded-lg"
            >
              <span className="relative z-10">About Us</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>

            {/* Blog */}
            <Link
              to="/blog"
              preload={isMobile ? false : "intent"}
              className="relative text-white font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 group"
            >
              <span className="relative z-10">Blog</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="relative flex items-center space-x-1 text-white font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 group">
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
                <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <span className="relative z-10">Services</span>
                <ChevronDown className={`relative z-10 w-4 h-4 transition-transform duration-300 ${
                  isServicesOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-56 bg-black/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl transition-all duration-500 origin-top ${
                isServicesOpen 
                  ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
                  : 'opacity-0 scale-95 -translate-y-4 rotate-1 pointer-events-none'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
                <div className="py-2 px-1">
                  {serviceCategories.map((category, catIndex) => (
                    <div key={category.label} className="mb-2 last:mb-0">
                      <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/60 font-semibold">
                        {category.label}
                      </div>
                      {category.items.map((service, index) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          preload={isMobile ? false : "intent"}
                          onClick={() => setIsServicesOpen(false)}
                          className={`relative block px-4 py-2.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(147,197,253,0.5)] transform hover:translate-x-1 rounded-lg ${
                            isServicesOpen ? 'animate-fade-in' : ''
                          }`}
                          style={{ animationDelay: `${(catIndex * 2 + index) * 40}ms` }}
                        >
                          <span className="relative z-10">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="relative text-white font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 group"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-16 bg-gray-900/95 backdrop-blur-xl border-b border-white/20 transition-all duration-300 z-40 overflow-y-auto shadow-2xl ${
        isMobileMenuOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-6 space-y-4 pb-safe">
          {/* Home */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-white font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-all"
          >
            Home
          </Link>

          {/* About Us */}
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-white font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-all"
          >
            About Us
          </Link>

          {/* Blog */}
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-white font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-all"
          >
            Blog
          </Link>

          {/* Services */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="flex items-center justify-between w-full text-white font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-all"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                isMobileServicesOpen ? 'rotate-180' : ''
              }`} />
            </button>
            <div className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${
              isMobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {serviceCategories.map((category) => (
                <div key={category.label} className="mb-4 last:mb-0">
                  <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/60 font-semibold">
                    {category.label}
                  </div>
                  {category.items.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className="block text-gray-300 py-2.5 px-4 hover:bg-white/10 hover:text-white rounded-lg transition-all"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="block text-white font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-all"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;