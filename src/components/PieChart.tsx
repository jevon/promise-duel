import React, { useEffect, useRef } from 'react';

interface PieChartProps {
  carneyPercentage: number;
  poilievrePercentage: number;
  size?: number;
  label?: string;
  showLabel?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ 
  carneyPercentage, 
  poilievrePercentage, 
  size = 100, 
  label,
  showLabel = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Normalize percentages to ensure they add up to 100%
  const total = carneyPercentage + poilievrePercentage;
  const normalizedCarney = Math.round((carneyPercentage / total) * 100);
  const normalizedPoilievre = 100 - normalizedCarney;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = size;
    canvas.height = size;
    
    // Load texture images
    const redTexture = new Image();
    const blueTexture = new Image();
    
    redTexture.src = '/promise-duel/uploads/bg-red-texture.png';
    blueTexture.src = '/promise-duel/uploads/bg-blue-texture.png';
    
    let loadedImages = 0;
    const onImageLoad = () => {
      loadedImages++;
      if (loadedImages === 2) {
        drawChart();
      }
    };
    
    redTexture.onload = onImageLoad;
    blueTexture.onload = onImageLoad;
    
    function drawChart() {
      const center = size / 2;
      const radius = (size / 2) - 1;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fill();
      
      // Draw Poilievre's portion (blue)
      if (normalizedPoilievre > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, 0, (Math.PI * 2) * (normalizedPoilievre / 100));
        ctx.closePath();
        ctx.clip();
        
        const pattern = ctx.createPattern(blueTexture, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, size, size);
        }
        ctx.restore();
      }
      
      // Draw Carney's portion (red)
      if (normalizedCarney > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, 
          (Math.PI * 2) * (normalizedPoilievre / 100), 
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        
        const pattern = ctx.createPattern(redTexture, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, size, size);
        }
        ctx.restore();
      }
      
      // Draw border
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Initial draw with solid colors
    const center = size / 2;
    const radius = (size / 2) - 1;
    
    ctx.clearRect(0, 0, size, size);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();
    
    // Draw initial solid colors while textures load
    if (normalizedPoilievre > 0) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, 0, (Math.PI * 2) * (normalizedPoilievre / 100));
      ctx.fillStyle = 'rgb(37, 99, 235)';
      ctx.fill();
    }
    
    if (normalizedCarney > 0) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, 
        (Math.PI * 2) * (normalizedPoilievre / 100), 
        Math.PI * 2
      );
      ctx.fillStyle = 'rgb(220, 38, 38)';
      ctx.fill();
    }
    
    // Draw border
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [carneyPercentage, poilievrePercentage, size, normalizedCarney, normalizedPoilievre]);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative"
        style={{
          width: size,
          height: size,
          aspectRatio: '1'
        }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%'
          }}
        />
      </div>
      
      {label && showLabel && (
        <div className="text-white/70 text-xs mt-2 text-center">{label}</div>
      )}
    </div>
  );
};

export default PieChart; 