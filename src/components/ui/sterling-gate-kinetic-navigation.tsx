import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Shape Hover
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item: any) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        
        if (isMenuOpen) {
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<");
            
            if (menuButtonTexts) {
              tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 }, "<");
            }
            if (menuButtonIcon) {
              tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
            }
              
            tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 120 }, "<");
            
            if (menuButtonTexts) {
              tl.to(menuButtonTexts, { yPercent: 0 }, "<");
            }
            if (menuButtonIcon) {
              tl.to(menuButtonIcon, { rotate: 0 }, "<");
            }

            tl.set(navWrap, { display: "none" });
        }

      }, containerRef);
      
      return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="relative z-50">
      {/* Trigger Button */}
      <button 
        onClick={toggleMenu}
        className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
      >
        <span className="text-sm font-medium tracking-wider uppercase">Menu</span>
        <div className="relative w-5 h-5 flex flex-col justify-center gap-1.5 overflow-hidden">
          <span className="w-full h-0.5 bg-white transform transition-transform group-hover:translate-x-1"></span>
          <span className="w-full h-0.5 bg-white transform transition-transform delay-75 group-hover:translate-x-0.5"></span>
          <span className="w-full h-0.5 bg-white transform transition-transform delay-150 group-hover:translate-x-0"></span>
        </div>
      </button>

      {/* Navigation Overlay Wrapper */}
      <div className="nav-overlay-wrapper fixed inset-0 hidden pointer-events-none" data-nav="closed" style={{ zIndex: 9999 }}>
        {/* Semi-transparent Overlay Background */}
        <div 
            className="overlay absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-auto"
            onClick={closeMenu}
        ></div>
        
        {/* Animated Background Panels (Staggered Entrance) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden flex flex-col">
            <div className="backdrop-layer flex-1 bg-gray-950 translate-x-full"></div>
            <div className="backdrop-layer flex-1 bg-gray-900 translate-x-full"></div>
            <div className="backdrop-layer flex-1 bg-blue-950/20 translate-x-full"></div>
        </div>

        {/* Menu Content Container */}
        <div className="menu-content relative w-full h-full flex flex-col md:flex-row pointer-events-auto transform translate-x-full">
            
            {/* Shapes Visual Decoration (Desktop Only) */}
            <div className="ambient-background-shapes absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
              {/* Shape 1: Floating circles */}
              <div className="bg-shape bg-shape-1 absolute inset-0 opacity-0 transition-opacity duration-300">
                <div className="shape-element absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"></div>
                <div className="shape-element absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl"></div>
                <div className="shape-element absolute top-2/3 left-1/4 w-24 h-24 rounded-full bg-purple-500/10 blur-lg"></div>
              </div>

              {/* Shape 2: Wave pattern */}
              <div className="bg-shape bg-shape-2 absolute inset-0 opacity-0 transition-opacity duration-300">
                <svg className="shape-element absolute top-1/2 left-1/4 w-96 h-96 text-blue-400/10" viewBox="0 0 200 200" fill="currentColor">
                  <path d="M40,-62.7C52.2,-54.5,62.5,-44.4,69.6,-32.5C76.7,-20.6,80.7,-6.9,78.9,6.2C77.1,19.3,69.6,31.8,59.8,42.5C50,53.2,38,62.1,24.5,67.6C11.1,73.1,-3.8,75.2,-18.2,72.2C-32.5,69.2,-46.3,61.1,-56.3,49.8C-66.2,38.5,-72.3,24,-74.6,8.7C-76.8,-6.6,-75.3,-22.7,-67.7,-35.3C-60,-47.9,-46.3,-57,-32.5,-64.3C-18.7,-71.6,-4.8,-77,8.2,-78.4C21.2,-79.8,32.4,-77.2,40,-62.7Z" transform="translate(100 100)" />
                </svg>
              </div>

              {/* Shape 3: Grid dots */}
              <div className="bg-shape bg-shape-3 absolute inset-0 opacity-0 transition-opacity duration-300">
                <div className="shape-element absolute top-1/3 left-1/4 grid grid-cols-4 gap-4">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/20"></div>
                  ))}
                </div>
              </div>

              {/* Shape 4: Organic blobs */}
              <div className="bg-shape bg-shape-4 absolute inset-0 opacity-0 transition-opacity duration-300">
                <div className="shape-element absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="shape-element absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-indigo-600/20 to-blue-400/20 rounded-full blur-3xl"></div>
              </div>

              {/* Shape 5: Diagonal lines */}
              <div className="bg-shape bg-shape-5 absolute inset-0 opacity-0 transition-opacity duration-300">
                <div className="shape-element absolute top-1/4 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 transform origin-left"></div>
                <div className="shape-element absolute top-1/3 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transform origin-left"></div>
                <div className="shape-element absolute top-1/2 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 transform origin-left"></div>
              </div>
            </div>

            {/* Close Button Inside Menu */}
            <button 
                onClick={closeMenu}
                className="nav-close-btn absolute top-8 right-8 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors overflow-hidden h-6"
            >
                <div className="relative h-full flex flex-col transition-transform duration-300">
                    <p className="text-xs uppercase tracking-widest font-bold">Close</p>
                    <p className="text-xs uppercase tracking-widest font-bold">Close</p>
                </div>
                <X className="menu-button-icon w-5 h-5" />
            </button>

            {/* Navigation Links List */}
            <div className="flex-1 flex items-center justify-center px-8 md:px-24">
                <nav className="w-full max-w-4xl">
                    <ul className="flex flex-col gap-4 md:gap-6">
                        <li className="menu-list-item overflow-hidden" data-shape="1">
                            <Link 
                                to="/" 
                                onClick={closeMenu}
                                className="nav-link inline-block text-5xl md:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="menu-list-item overflow-hidden" data-shape="2">
                            <Link 
                                to="/about" 
                                onClick={closeMenu}
                                className="nav-link inline-block text-5xl md:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li className="menu-list-item overflow-hidden" data-shape="3">
                            <Link 
                                to="/services/ai-phone-callers" 
                                onClick={closeMenu}
                                className="nav-link inline-block text-5xl md:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                Services
                            </Link>
                        </li>
                        <li className="menu-list-item overflow-hidden" data-shape="4">
                            <Link 
                                to="/blog" 
                                onClick={closeMenu}
                                className="nav-link inline-block text-5xl md:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="menu-list-item overflow-hidden" data-shape="5">
                            <Link 
                                to="/case-studies" 
                                onClick={closeMenu}
                                className="nav-link inline-block text-5xl md:text-8xl font-black text-white hover:text-blue-400 transition-colors duration-300"
                            >
                                Cases
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Sidebar / Additional Info */}
            <div className="w-full md:w-1/3 bg-white/5 backdrop-blur-3xl border-l border-white/10 p-12 md:p-24 flex flex-col justify-between overflow-hidden">
                <div data-menu-fade>
                    <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">Contact</h3>
                    <div className="space-y-4">
                        <a href="mailto:hello@samysai.com" className="block text-2xl md:text-3xl text-white hover:text-blue-400 transition-colors font-medium">hello@samysai.com</a>
                        <a href="tel:+15147960151" className="block text-xl text-white/60 hover:text-white transition-colors">+1 (514) 796-0151</a>
                    </div>
                </div>

                <div data-menu-fade className="space-y-12">
                    <div>
                        <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">Location</h3>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Montreal, Quebec<br />
                            Canada
                        </p>
                    </div>
                    
                    <div className="flex gap-6">
                        {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                            <a key={social} href="#" className="text-sm text-white/40 hover:text-blue-400 uppercase tracking-widest transition-colors">{social}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
