import { useEffect, useState } from 'react';

interface SwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
}

interface SwipeState {
  isSwiping: boolean;
  direction: 'left' | 'right' | null;
  touchStart: number | null;
  touchEnd: number | null;
}

export const useSwipe = ({ 
  onSwipeLeft, 
  onSwipeRight, 
  minSwipeDistance = 50 
}: SwipeProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    direction: null,
    touchStart: null,
    touchEnd: null
  });
  
  // Reset if the touch is canceled
  const handleTouchCancel = () => {
    setSwipeState({
      isSwiping: false,
      direction: null,
      touchStart: null,
      touchEnd: null
    });
  };

  const handleTouchStart = (e: TouchEvent) => {
    setSwipeState({
      ...swipeState,
      touchEnd: null,
      touchStart: e.targetTouches[0].clientX,
      isSwiping: true
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!swipeState.touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const diff = swipeState.touchStart - currentX;
    
    setSwipeState({
      ...swipeState,
      touchEnd: currentX,
      direction: diff > 0 ? 'left' : 'right',
      isSwiping: true
    });
  };

  const handleTouchEnd = () => {
    if (!swipeState.touchStart || !swipeState.touchEnd) {
      setSwipeState({
        ...swipeState,
        isSwiping: false
      });
      return;
    }
    
    const distance = swipeState.touchStart - swipeState.touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    
    // Reset values but keep direction briefly for animation
    setSwipeState({
      ...swipeState,
      isSwiping: false
    });
    
    // Clear direction after animation time
    setTimeout(() => {
      setSwipeState(prevState => ({
        ...prevState,
        direction: null,
        touchStart: null,
        touchEnd: null
      }));
    }, 300);
  };

  useEffect(() => {
    const element = document.getElementById('swipe-area');
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [swipeState.touchStart, swipeState.touchEnd]);
  
  return {
    isSwiping: swipeState.isSwiping,
    swipeDirection: swipeState.direction
  };
}; 