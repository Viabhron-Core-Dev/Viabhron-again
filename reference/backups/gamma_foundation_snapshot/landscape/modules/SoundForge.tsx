import React from 'react';
import { motion } from 'motion/react';
import { Music, Play, Save, Sliders } from 'lucide-react';

import { UIMode } from '@/core/kernel/types';

interface SoundForgeProps {
  uiMode?: UIMode;
}

export const SoundForge: React.FC<SoundForgeProps> = ({ uiMode }) => {
  return (
    <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
      <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-indigo-500/20">
        <Music className="w-10 h-10 text-indigo-400" />
      </div>
      <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Sovereign Sound Forge</h2>
      <p className="text-gray-500 max-w-md leading-relaxed mb-8">
        High-fidelity audio synthesis substrate. Composing cinematic scores and agentic loops in private cloud.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
          New Composition
        </button>
      </div>
    </div>
  );
};
