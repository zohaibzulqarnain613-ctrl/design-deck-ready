import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function SterlingGateKineticNavigation() {
  // We need a ref for the parent container to scope GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      // 1. Arrow Animation (Removed from indicator, but keeping logic if arrow existed/restored elsewhere)
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      // 2. Shape Hover
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

        const tl = gsap.timeline({
          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            setIsAnimating(false);
            if (!isMenuOpen && navWrap) {
              gsap.set(navWrap, { display: "none", clearProps: "display" });
              (navWrap as HTMLElement).style.display = "none";
            }
          }
        });
        
        if (isMenuOpen) {
            // OPEN
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<")
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            // Animate Button Text and Icon Swapping
            if (menuButtonTexts && menuButtonTexts.length > 0) {
              tl.fromTo(Array.from(menuButtonTexts), { yPercent: 0 }, { yPercent: -100, stagger: 0.2 }, "<");
            }
            if (menuButtonIcon) {
              tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
            }
              
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }
            document.body.style.overflow = "hidden";
        } else {
            // CLOSE
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 120 }, "<")
              .to(Array.from(menuButtonTexts || []), { yPercent: 0 }, "<")
              .to(menuButtonIcon || [], { rotate: 0, duration: 0.4 }, "<")
              .set(navWrap, { display: "none" });
            
            document.body.style.overflow = "unset";
        }

      }, containerRef);
      
      return () => {
        ctx.revert();
        document.body.style.overflow = "unset";
      };
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen && !isAnimating) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen, isAnimating]);

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    if (isAnimating || !isMenuOpen) return;
    setIsMenuOpen(false);
  };

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
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-400 hover:text-white transition-colors relative z-[100]"
      >
        <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
          <span className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Navigation Overlay Wrapper */}
      <div 
        className="nav-overlay-wrapper fixed inset-0 pointer-events-none hidden" 
        style={{ zIndex: 99999, overflow: 'hidden' }}
      >
        {/* Semi-transparent Backdrop Overlay */}
        <div 
          className="overlay absolute inset-0 bg-gray-950/80 backdrop-blur-xl opacity-0 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
          }}
        />

        {/* Animated Background Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="backdrop-layer absolute inset-0 bg-blue-600/10 translate-x-[101%]" />
          <div className="backdrop-layer absolute inset-0 bg-gray-900 translate-x-[101%]" />
        </div>

        {/* Menu Content Container */}
        <div className="menu-content absolute inset-0 flex flex-col justify-center px-8 md:px-20 pointer-events-auto overflow-y-auto overflow-x-hidden">
          {/* Close Button Inside Menu */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isAnimating) setIsMenuOpen(false);
            }}
            className="nav-close-btn absolute top-8 right-8 flex flex-col h-6 overflow-hidden text-white font-bold uppercase tracking-widest text-xs z-[100000] cursor-pointer"
          >
            <div className="relative flex flex-col transition-transform duration-300 pointer-events-none">
              <p className="h-6 flex items-center">Menu</p>
              <p className="h-6 flex items-center text-blue-400">Close</p>
            </div>
            <div className="menu-button-icon absolute -right-6 top-1 text-white pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
            </div>
          </button>


          {/* Abstract background shapes */}
          <div className="ambient-background-shapes absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            {/* Shape 1: Floating circles */}
            <div className="bg-shape bg-shape-1 absolute top-1/4 left-1/4 w-96 h-96 flex items-center justify-center">
              <div className="shape-element absolute w-64 h-64 border-2 border-blue-500 rounded-full opacity-0" />
              <div className="shape-element absolute w-48 h-48 border-2 border-cyan-400 rounded-full opacity-0" />
            </div>

            {/* Shape 2: Wave pattern */}
            <div className="bg-shape bg-shape-2 absolute bottom-1/4 right-1/4 w-96 h-96 flex items-center justify-center">
              <div className="shape-element absolute w-full h-1 bg-gradient-to-r from-blue-500 to-transparent opacity-0" />
              <div className="shape-element absolute w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent translate-y-8 opacity-0" />
            </div>

            {/* Shape 3: Grid dots */}
            <div className="bg-shape bg-shape-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 gap-4 opacity-0">
               {[...Array(16)].map((_, i) => (
                 <div key={i} className="shape-element w-2 h-2 bg-blue-500 rounded-full" />
               ))}
            </div>

            {/* Shape 4: Organic blobs */}
            <div className="bg-shape bg-shape-4 absolute top-20 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl shape-element opacity-0" />

            {/* Shape 5: Diagonal lines */}
            <div className="bg-shape bg-shape-5 absolute bottom-20 left-20 flex gap-4 rotate-45">
               <div className="shape-element w-1 h-64 bg-blue-500 opacity-0" />
               <div className="shape-element w-1 h-64 bg-blue-500 opacity-0 delay-75" />
            </div>
          </div>

          {/* Link List */}
          <nav className="relative z-10 flex flex-col space-y-4 md:space-y-6 pt-24 pb-12">
            {[
              { label: "About us", path: "/about", shape: "1" },
              { label: "Services", path: "/#services", shape: "3" },
              { label: "Blog", path: "/blog", shape: "4" },
              { label: "Contact us", path: "#contact", shape: "5", isScroll: true }
            ].map((link, idx) => (

              <div key={idx} className="menu-list-item overflow-hidden" data-shape={link.shape}>
                {link.isScroll ? (
                  <a
                    href={link.path}
                    onClick={handleContactClick}
                    className="nav-link block text-5xl md:text-8xl font-black text-white hover:text-blue-500 transition-colors uppercase italic"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className="nav-link block text-5xl md:text-8xl font-black text-white hover:text-blue-500 transition-colors uppercase italic"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer content inside menu */}
          <div className="mt-auto mb-8 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/10 pt-8" data-menu-fade>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Socials</p>
              <div className="flex gap-6 text-sm font-bold text-white uppercase italic">
                <a href="#" className="hover:text-blue-400">Instagram</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Get in touch</p>
              <a href="mailto:hello@samysai.com" className="text-xl md:text-2xl font-black text-white hover:text-blue-400 transition-colors italic">hello@samysai.com</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-shape { opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .bg-shape.active { opacity: 1; }
      `}</style>
    </div>
  );
}
