import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 24 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 p-1.5">
        <Shield size={size * 0.7} className="text-white" />
      </div>
      <span className="font-black tracking-widest text-white uppercase" style={{ fontSize: size * 0.6 }}>
        Viabhron
      </span>
    </div>
  );
};
