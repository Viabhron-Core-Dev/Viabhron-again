import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-xl shadow-lg shadow-blue-500/20 border border-white/10 bg-[#0B141A]`}>
      <img 
        src="/icon.png" 
        alt="Viabhron" 
        className="w-full h-full object-cover"
        onError={(e) => {
          // Reliable fallback to a sci-fi robot avatar
          e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=Viabhron&backgroundColor=0B141A&eyes=sensor&mouth=smile';
        }}
      />
    </div>
  );
};
