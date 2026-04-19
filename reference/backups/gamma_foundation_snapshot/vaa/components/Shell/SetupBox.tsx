import React from 'react';
import { Settings, Shield, Key, Globe, ArrowRight } from 'lucide-react';

interface SetupBoxProps {
  onComplete: (config: any) => void;
}

export const SetupBox: React.FC<SetupBoxProps> = ({ onComplete }) => {
  const handleComplete = () => {
    onComplete({
      officeName: 'Primary Substrate',
      brainType: 'gemini-1.5-pro',
      geminiKey: 'sk-...'
    });
  };

  return (
    <div className="p-8 bg-gray-900 border border-white/10 rounded-[3rem] shadow-2xl max-w-md w-full space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
          <Settings className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">System Setup</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configure Initial Substrate</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <Key className="w-4 h-4 text-gray-600" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gemini API Key</span>
          </div>
          <input 
            type="password" 
            placeholder="Enter API Key..."
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>

        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mesh Node Name</span>
          </div>
          <input 
            type="text" 
            placeholder="e.g. Primary-Substrate-01"
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      <button 
        onClick={handleComplete}
        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3"
      >
        Finalize Setup
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
