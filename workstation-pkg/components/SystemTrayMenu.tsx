import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  FolderOpen, 
  Terminal, 
  Settings, 
  Cpu, 
  ShieldCheck,
  X,
  Zap,
  Lock,
  Search,
  Database,
  Cloud,
  Layers,
  Component
} from 'lucide-react';
import { GlassPanel } from './common/GlassPanel';
import { Tab } from '../types';

interface SystemTrayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModule: (type: string, title: string) => void;
  tabs: Tab[];
  onCloseTab: (id: string) => void;
}

export const SystemTrayMenu: React.FC<SystemTrayMenuProps> = ({ 
  isOpen, 
  onClose, 
  onOpenModule,
  tabs,
  onCloseTab
}) => {
  const systemShortcuts = [
    { label: 'Architecture', icon: <Component size={14} />, type: 'architecture', title: 'Architecture' },
    { label: 'Nexus', icon: <Layers size={14} />, type: 'nexus', title: 'Nexus' },
    { label: 'Cores', icon: <Cpu size={14} />, type: 'cores', title: 'Cores' },
    { label: 'Metrics', icon: <Activity size={14} />, type: 'metrics', title: 'Metrics' },
  ];

  const maintenanceItems = [
    { label: 'Agent CLI', icon: <Terminal size={14} />, type: 'agent_cli', title: 'CLI' },
    { label: 'Artifacts', icon: <FolderOpen size={14} />, type: 'artifacts', title: 'Artifacts' },
    { label: 'Governance', icon: <ShieldCheck size={14} />, type: 'governance', title: 'Governance' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Stops at TaskBar) */}
          <div 
            className="fixed inset-0 z-[350] bg-transparent pb-14" 
            onClick={onClose} 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-4 z-[400] w-80 max-h-[80vh] flex flex-col"
          >
            <GlassPanel intensity="high" className="rounded-2xl border border-white/10 shadow-2xl p-0 flex flex-col overflow-hidden">
              
              {/* Pulse Monitor (Header) */}
              <div className="p-4 bg-slate-950/60 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-secondary animate-pulse" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-gray-300">Pulse_Monitor</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-emerald-500 uppercase">Live</span>
                  </div>
                </div>
                
                {/* Simulated Metabolic Graph */}
                <div className="h-12 w-full flex items-end gap-[2px]">
                  {[40, 70, 45, 90, 65, 30, 55, 80, 40, 60, 75, 50, 85, 35, 65, 45, 90, 70, 50, 60].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.02, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary/5 to-primary/40 rounded-t-sm"
                    />
                  ))}
                </div>
                
                <div className="flex justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-500 uppercase">Metabolism</span>
                    <span className="text-[10px] font-mono font-bold">1.2 T/s</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] text-gray-500 uppercase">Latency</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">12ms</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4 pb-4">
                
                {/* Section: Active Tasks */}
                <div>
                  <div className="px-2 mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Active_Processes</span>
                    <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">{tabs.length}</span>
                  </div>
                  <div className="space-y-1">
                    {tabs.length === 0 ? (
                      <div className="px-3 py-4 text-center border border-dashed border-white/5 rounded-xl">
                        <span className="text-[10px] font-mono text-gray-600 uppercase">No_Active_Spores</span>
                      </div>
                    ) : (
                      tabs.map(tab => (
                        <div key={tab.id} className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                            <span className="text-xs font-sans text-gray-300 truncate">{tab.title}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onCloseTab(tab.id);
                            }}
                            className="p-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all"
                            title="Kill Process"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section: Quick Launch */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="px-2 mb-2">
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest text-left block">Sovereign_Hub</span>
                    </div>
                    <div className="space-y-1">
                      {systemShortcuts.map(item => (
                        <button 
                          key={item.type}
                          onClick={() => { onOpenModule(item.type, item.title); onClose(); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-left group"
                        >
                          <div className="text-gray-500 group-hover:text-primary transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-sans text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="px-2 mb-2">
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest text-left block">Maintenance</span>
                    </div>
                    <div className="space-y-1">
                      {maintenanceItems.map(item => (
                        <button 
                          key={item.type}
                          onClick={() => { onOpenModule(item.type, item.title); onClose(); }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-left group"
                        >
                          <div className="text-gray-500 group-hover:text-indigo-400 transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-sans text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* System Actions Footer */}
              <div className="shrink-0 p-3 bg-slate-950/60 border-t border-white/5 flex items-center justify-between">
                <button 
                  onClick={() => { onOpenModule('settings', 'Settings'); onClose(); }}
                  className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all group"
                >
                  <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em]">Shell_Cfg</span>
                </button>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all" title="Secure Lock">
                    <Lock size={14} />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-xl text-primary transition-all" title="System Reboot">
                    <Zap size={14} className="fill-current" />
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
