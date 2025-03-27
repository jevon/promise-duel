import React, { useEffect, useRef, useState } from 'react';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) return;
      
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsVisible(heroBottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-4 lg:py-6 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="text-carney text-xl md:text-2xl font-oswald tracking-wider animate-slide-in-left">MARK CARNEY</div>
          <div className="h-8 w-0.5 bg-white/50 mx-2 rotate-12"></div>
          <div className="text-poilievre text-xl md:text-2xl font-oswald tracking-wider animate-slide-in-right">PIERRE POILIEVRE</div>
        </div>
        <div className="text-white/70 text-sm mt-4 font-montserrat text-center max-w-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Track and compare political promises made during the 2025 Canadian election cycle
        </div>
      </div>
    </header>
  );
};

export default Header;
