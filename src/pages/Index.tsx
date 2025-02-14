
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
  const [showCongrats, setShowCongrats] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [clickAttempts, setClickAttempts] = useState(0);

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

  const handleCatClick = () => {
    setShowCongrats(true);
    // Generate extra hearts for celebration
    const celebrationHearts = Array.from({ length: 10 }, (_, i) => (
      <FloatingHeart
        key={`celebration-${i}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
    setHearts(prev => [...prev, ...celebrationHearts]);
  };

  const handleCatMove = () => {
    if (clickAttempts < 5) {
      const newX = Math.random() * 200 - 100; // -100 to 100
      const newY = Math.random() * 200 - 100; // -100 to 100
      setCatPosition({ x: newX, y: newY });
      setClickAttempts(prev => prev + 1);
    } else {
      handleCatClick();
    }
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

            {/* Interactive Cat Section */}
            <div className="mt-8 relative">
              <button
                onClick={handleCatMove}
                className="relative group transform transition-all duration-300 hover:scale-105"
                style={{
                  transform: `translate(${catPosition.x}px, ${catPosition.y}px)`,
                }}
              >
                <img
                  src="https://cataas.com/cat/cute/says/Beni%20Tikla!"
                  alt="Sevimli Kedi"
                  className="w-48 h-48 mx-auto object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-primary font-medium text-sm">
                    {clickAttempts < 5 ? 'Yakalayamadın! 😋' : 'Benim sonsuza kadar sevgilim olur musun?'}
                  </p>
                </div>
              </button>
            </div>

            {/* Congratulatory Message */}
            {showCongrats && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white/90 p-8 rounded-2xl shadow-xl text-center space-y-4 animate-scale-in">
                  <Sparkles className="text-primary mx-auto" size={32} />
                  <h2 className="text-3xl font-bold text-primary">Tebrikler!</h2>
                  <p className="text-xl text-foreground/80">
                    Sonsuza kadar benim canım sevgilimsin! 💖
                  </p>
                  <button
                    onClick={() => setShowCongrats(false)}
                    className="mt-4 px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-colors"
                  >
                    Tamam 💝
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
