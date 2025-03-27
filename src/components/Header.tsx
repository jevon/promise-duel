import React, { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  activePolitician?: 'carney' | 'poilievre';
  onPoliticianChange?: (politician: 'carney' | 'poilievre') => void;
}

const Header: React.FC<HeaderProps> = ({ activePolitician, onPoliticianChange }) => {
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
          <button 
            onClick={() => onPoliticianChange?.('carney')}
            className={`text-xl md:text-2xl font-oswald tracking-wider transition-colors duration-200
                       ${activePolitician === 'carney' ? 'text-carney' : 'text-carney/50 hover:text-carney/80'}
                       lg:text-carney lg:hover:text-carney/80 relative`}
          >
            MARK CARNEY
            {activePolitician === 'carney' && (
              <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 text-carney text-xs lg:hidden">▼</span>
            )}
          </button>
          <div className="h-8 w-0.5 bg-white/50 mx-2 rotate-12"></div>
          <button 
            onClick={() => onPoliticianChange?.('poilievre')}
            className={`text-xl md:text-2xl font-oswald tracking-wider transition-colors duration-200
                       ${activePolitician === 'poilievre' ? 'text-poilievre' : 'text-poilievre/50 hover:text-poilievre/80'}
                       lg:text-poilievre lg:hover:text-poilievre/80 relative`}
          >
            PIERRE POILIEVRE
            {activePolitician === 'poilievre' && (
              <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 text-poilievre text-xs lg:hidden">▼</span>
            )}
          </button>
        </div>
        <div className="text-white/70 text-sm mt-4 font-montserrat text-center max-w-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Track and compare political promises made during the 2025 Canadian election cycle
        </div>
      </div>
    </header>
  );
};

export default Header;
