import React, { useState, useEffect } from 'react';

interface SwipeIndicatorProps {
  activePolitician: 'carney' | 'poilievre';
  isSwiping: boolean;
  swipeDirection: 'left' | 'right' | null;
}

const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ 
  activePolitician, 
  isSwiping, 
  swipeDirection 
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isSwiping) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSwiping]);

  if (!visible) return null;

  // Determine which politician we're swiping toward
  const swipingToward = swipeDirection === 'left' ? 'poilievre' : 'carney';
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center lg:hidden">
      <div 
        className={`flex items-center justify-center gap-6 px-8 py-4 rounded-full bg-black/80 backdrop-blur-sm transition-all duration-300
                  ${swipeDirection === 'left' ? 'translate-x-8' : '-translate-x-8'}`}
      >
        <div className={`text-xl font-oswald ${swipingToward === 'carney' ? 'text-carney' : 'text-white/30'}`}>
          CARNEY
        </div>
        <div className={`text-xl font-oswald ${swipingToward === 'poilievre' ? 'text-poilievre' : 'text-white/30'}`}>
          POILIEVRE
        </div>
      </div>
    </div>
  );
};

export default SwipeIndicator; 