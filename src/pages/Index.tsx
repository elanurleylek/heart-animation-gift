
import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const FloatingHeart = ({ style }: { style?: React.CSSProperties }) => (
  <div 
    className="absolute animate-float"
    style={{
      ...style,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }}
  >
    <Heart 
      className="text-primary/80 animate-pulse-slow" 
      size={24 + Math.random() * 24}
      fill="currentColor"
    />
  </div>
);

const Index = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Generate initial floating hearts
    const initialHearts = Array.from({ length: 20 }, (_, i) => (
      <FloatingHeart
        key={i}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
    setHearts(initialHearts);

    // Show message with delay for animation
    setTimeout(() => setShowMessage(true), 500);
  }, []);

  const addHeart = (e: React.MouseEvent) => {
    const rect = (e.target as Element).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = (
      <FloatingHeart
        key={Date.now()}
        style={{
          left: x,
          top: y,
          position: 'absolute',
        }}
      />
    );
    
    setHearts(prev => [...prev, newHeart]);
  };

  return (
    <div 
      className="relative min-h-screen heart-background overflow-hidden"
      onClick={addHeart}
    >
      {hearts}
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className={`text-center space-y-8 ${showMessage ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center justify-center space-x-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <Sparkles className="text-primary" size={20} />
            <span className="text-primary font-medium">Sevgililer Günün Kutlu Olsun</span>
            <Sparkles className="text-primary" size={20} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Seni Çok Seviyorum!
          </h1>
          
          <div className="max-w-lg mx-auto space-y-4">
            <p className="text-lg md:text-xl text-foreground/80">
              Her anımızı özel kıldığın için teşekkür ederim. Seninle geçirdiğim her gün bir hediye.
            </p>
            
            <Heart 
              className="mx-auto text-primary animate-pulse-slow" 
              size={64} 
              fill="currentColor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
