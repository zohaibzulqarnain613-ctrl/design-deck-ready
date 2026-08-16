/* VERSION: 3 */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { X, ChevronDown, Menu } from "lucide-react";

export function SterlingGateKineticNavigation({ variant = "services" }: { variant?: "services" | "mobile" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = (e?: React.MouseEvent | MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(prev => !prev);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    // Set defaults
    gsap.defaults({ ease: "power2.out", duration: 0.7 });

    const ctx = gsap.context(() => {
      const overlay = ".nav-overlay-content";
      const menu = ".nav-menu-panel";
      const items = ".nav-item-stagger";
      const categories = ".nav-category-stagger";
      const navWrap = ".nav-overlay-wrapper";
      const menuButtonTexts = ".services-text";
      const menuButtonIcon = ".services-icon";

      // Initial state
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(menu, { xPercent: 120 });
      gsap.set(items, { y: 30, opacity: 0 });
      gsap.set(categories, { opacity: 0, x: -20 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const overlay = ".nav-overlay-content";
      const menu = ".nav-menu-panel";
      const items = ".nav-item-stagger";
      const categories = ".nav-category-stagger";
      const navWrap = ".nav-overlay-wrapper";
      const menuButtonTexts = ".services-text";
      const menuButtonIcon = ".services-icon";

      if (isMenuOpen) {
        const tl = gsap.timeline();
        
        tl.set(navWrap, { visibility: "visible" })
          .set(document.body, { overflow: "hidden" })
          .to(overlay, { autoAlpha: 1, duration: 0.5 })
          .to(menu, { 
            xPercent: 0, 
            duration: 0.8, 
            ease: "power3.out" 
          }, "-=0.3")
          .set(overlay, { pointerEvents: "auto" }, "<")
          .to(categories, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.4")
          .to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: "power2.out"
          }, "-=0.3");

        if (menuButtonTexts) {
          tl.to(menuButtonTexts, { yPercent: -100, duration: 0.4 }, 0);
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 45, duration: 0.4 }, 0);
        }
      } else {
        const tl = gsap.timeline();
        
        tl.to(items, { opacity: 0, y: 10, duration: 0.3, stagger: 0.02 })
          .to(categories, { opacity: 0, x: -10, duration: 0.3, stagger: 0.05 }, "<")
          .to(menu, { xPercent: 120, duration: 0.6, ease: "power3.in" })
          .to(overlay, { autoAlpha: 0, duration: 0.4 }, "-=0.3")
          .set(overlay, { pointerEvents: "none" })
          .set(document.body, { overflow: "unset" })
          .set(navWrap, { visibility: "hidden" });

        if (menuButtonTexts) {
          tl.to(menuButtonTexts, { yPercent: 0, duration: 0.4 }, 0);
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0, duration: 0.4 }, 0);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
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
  };

  return (
    <div ref={containerRef} className="sterling-kinetic-nav">
      {/* Trigger Button */}
      {variant === "services" ? (
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
          }}
          className="group relative z-[100] flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium text-sm cursor-pointer pointer-events-auto"
        >
          <div className="relative h-5 overflow-hidden flex items-center">
            <div className="services-text-container relative h-full">
              <span className="services-text block transition-transform duration-500">Services</span>
              <span className="services-text block absolute top-full left-0 transition-transform duration-500 text-blue-400">Explore</span>
            </div>
          </div>
          <div className="services-icon transition-transform duration-500">
            <ChevronDown size={14} className="group-hover:text-blue-400" />
          </div>
        </button>
      ) : (
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

      {/* Navigation Overlay */}
      <div className={`nav-overlay-wrapper fixed inset-0 pointer-events-none ${isMenuOpen ? 'visible' : 'invisible'}`} data-nav={isMenuOpen ? "open" : "closed"} style={{ zIndex: 99999 }}>
        {/* Background Blur Overlay */}
        <div 
          className="nav-overlay-content absolute inset-0 bg-gray-950/60 backdrop-blur-md opacity-0"
          onClick={closeMenu}
        />

        {/* Sliding Panel */}
        <div className="nav-menu-panel absolute top-0 right-0 w-full md:w-[600px] h-full bg-gray-900 border-l border-white/10 shadow-2xl overflow-y-auto px-6 py-24 md:px-12 pointer-events-auto">
          <button 
            onClick={closeMenu}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col space-y-8">
            {/* Standard Links for Mobile Menu */}
            {variant === "mobile" && (
              <div className="grid grid-cols-1 gap-6 mb-12">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="nav-category-stagger text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="nav-category-stagger text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  to="/blog"
                  onClick={closeMenu}
                  className="nav-category-stagger text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Blog
                </Link>
                <Link
                  to="/case-studies"
                  onClick={closeMenu}
                  className="nav-category-stagger text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Cases
                </Link>
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="nav-category-stagger text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </div>
            )}

            {/* Services Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {serviceCategories.map((category, idx) => (
                <div key={idx} className="nav-category-stagger">
                  <h3 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                    {category.label}
                  </h3>
                  <div className="flex flex-col space-y-4">
                    {category.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        to={item.path}
                        onClick={closeMenu}
                        className="nav-item-stagger group flex items-center text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                      >
                        <span className="mr-4 text-blue-500/0 group-hover:text-blue-500 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                          →
                        </span>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t border-white/5 nav-category-stagger">
              <p className="text-gray-400 text-sm mb-6">Ready to scale your business?</p>
              <Link
                to="/case-studies"
                onClick={closeMenu}
                className="inline-flex items-center text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                View Case Studies
                <span className="ml-2">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
