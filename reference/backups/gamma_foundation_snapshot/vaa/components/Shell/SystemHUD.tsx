import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Activity, 
  Terminal, 
  Settings, 
  Cpu, 
  Network, 
  Lock, 
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { SystemMode, UIMode } from '@/core/kernel/types';

interface SystemHUDProps {
  systemMode: SystemMode;
  onModeChange: (mode: SystemMode) => void;
  isLockdown: boolean;
  onToggleLockdown: () => void;
  onOpenTerminal: () => void;
  onOpenSettings: () => void;
  uiMode: UIMode;
  onClearCache?: () => void;
  onHibernateAll?: () => void;
  officeName?: string;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({
  systemMode,
  onModeChange,
  isLockdown,
  onToggleLockdown,
  onOpenTerminal,
  onOpenSettings,
  uiMode,
  officeName
}) => {
  return (
    <div className={`fixed ${uiMode === 'vaa' ? 'bottom-20' : 'bottom-6'} left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-500`}>
      {/* Office Branding */}
      {officeName && (
        <div className="hidden lg:flex flex-col mr-4 border-r border-white/10 pr-4">
          <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none mb-1">Substrate</span>
          <span className="text-[10px] font-bold text-white truncate max-w-[120px]">{officeName}</span>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/5">
        {(['turbo', 'eco', 'stealth'] as SystemMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              systemMode === mode 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      {/* System Stats */}
      <div className="hidden md:flex items-center gap-6 px-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Cpu className="w-3 h-3" />
            <span className="text-[8px] font-bold uppercase tracking-widest">CPU</span>
          </div>
          <span className="text-[10px] font-mono text-white">12.4%</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Network className="w-3 h-3" />
            <span className="text-[8px] font-bold uppercase tracking-widest">NET</span>
          </div>
          <span className="text-[10px] font-mono text-white">1.2GB/s</span>
        </div>
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTerminal}
          className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all border border-white/5"
          title="Open Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleLockdown}
          className={`p-3 rounded-2xl transition-all border ${
            isLockdown 
              ? 'bg-red-600 border-red-500 text-white animate-pulse' 
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-red-400'
          }`}
          title={isLockdown ? "End Lockdown" : "Initiate Lockdown"}
        >
          {isLockdown ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenSettings}
          className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all border border-white/5"
          title="System Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Lockdown Overlay Indicator */}
      <AnimatePresence>
        {isLockdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-red-600 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/40"
          >
            <AlertTriangle className="w-3 h-3 text-white" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Emergency Lockdown Active</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
