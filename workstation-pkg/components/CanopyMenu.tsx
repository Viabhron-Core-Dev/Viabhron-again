import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronDown, 
  Terminal, 
  Cpu, 
  Shield, 
  FileText, 
  Activity, 
  Zap, 
  FlaskConical, 
  LayoutGrid, 
  Settings,
  Layers,
  Network,
  Bug,
  Database,
  Briefcase,
  User,
  History,
  Lock,
  Grid,
  Box,
  Gamepad2,
  Boxes,
  ShieldAlert,
  Gauge,
  Component,
  Trees,
  Smartphone
} from 'lucide-react';
import { GlassPanel } from './common/GlassPanel';

interface CanopySectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CanopySection: React.FC<CanopySectionProps> = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="text-secondary group-hover:text-primary transition-colors">
            {icon}
          </div>
          <span className="font-sans font-medium text-[10px] tracking-widest text-gray-300 uppercase">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-black/20"
          >
            <div className="p-4 grid grid-cols-2 gap-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CanopyAppIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const CanopyAppIcon: React.FC<CanopyAppIconProps> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5 group"
  >
    <div className="p-2 bg-slate-900 rounded-md mb-2 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] font-mono text-gray-400 truncate w-full text-left uppercase tracking-tighter">
      {label}
    </span>
  </button>
);

interface CanopyMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModule: (type: string, title: string) => void;
  id?: string;
}

/**
 * Canopy Menu: The Sovereign Command Center.
 * Restructured based on Gamma Taxonomy: Architecture, Cores, Vine & Spore Units, Hatchery, etc.
 */
export const CanopyMenu: React.FC<CanopyMenuProps> = ({ isOpen, onClose, onOpenModule, id }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    landscape: true // Open by default
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id={id} className="fixed inset-0 z-[300] flex flex-col justify-end pointer-events-none">
          {/* Backdrop (Stops at TaskBar) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto pb-14"
            onClick={onClose}
          />

          {/* Menu Panel - Anchored to TaskBar */}
          <GlassPanel 
            intensity="high" 
            className="w-full max-w-lg mx-auto h-[80vh] max-h-[80vh] rounded-t-3xl flex flex-col pointer-events-auto shadow-2xl relative z-10 mb-14"
          >
            {/* Search Bar (Omnibox) */}
            <div className="shrink-0 p-5 border-b border-white/10 bg-slate-950/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Query Sovereign Substrate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-primary/50 transition-colors uppercase tracking-widest placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 overscroll-contain touch-pan-y flex flex-col pb-16">
              
              {/* OS KERNEL */}
              <CanopySection 
                title="OS Kernel" 
                icon={<Trees size={16} className="text-secondary" />}
                isOpen={!!openSections.kernel}
                onToggle={() => toggleSection('kernel')}
              >
                <CanopyAppIcon icon={<Component size={16} className="text-blue-400" />} label="Architecture" onClick={() => onOpenModule('architecture', 'System Architecture')} />
                <CanopyAppIcon icon={<Cpu size={16} className="text-indigo-400" />} label="Cores" onClick={() => onOpenModule('cores', 'Core Management')} />
                <CanopyAppIcon icon={<History size={16} className="text-emerald-400" />} label="Departments" onClick={() => onOpenModule('departments', 'Department Registry')} />
                <CanopyAppIcon icon={<Network size={16} className="text-purple-400" />} label="Vine Nodes" onClick={() => onOpenModule('vine', 'Vine Network')} />
                <CanopyAppIcon icon={<Boxes size={16} className="text-amber-400" />} label="Spore Units" onClick={() => onOpenModule('spores', 'Spore Expedition')} />
              </CanopySection>

              {/* THE FORGE */}
              <CanopySection 
                title="The Forge" 
                icon={<Zap size={16} />}
                isOpen={!!openSections.forge}
                onToggle={() => toggleSection('forge')}
              >
                <CanopyAppIcon icon={<FlaskConical size={16} className="text-pink-400" />} label="Hatchery" onClick={() => onOpenModule('hatchery', 'Agent Hatchery')} />
                <CanopyAppIcon icon={<FileText size={16} className="text-sky-400" />} label="SOP Registry" onClick={() => onOpenModule('sops', 'SOP Database')} />
                <CanopyAppIcon icon={<User size={16} className="text-orange-400" />} label="Clients" onClick={() => onOpenModule('clients', 'Client Manager')} />
                <CanopyAppIcon icon={<History size={16} className="text-gray-400" />} label="Audit Logs" onClick={() => onOpenModule('audit', 'Audit Trail')} />
              </CanopySection>

              {/* LANDSCAPE (Native Modules) */}
              <CanopySection 
                title="Landscape (Modules)" 
                icon={<LayoutGrid size={16} />}
                isOpen={!!openSections.landscape}
                onToggle={() => toggleSection('landscape')}
              >
                <CanopyAppIcon icon={<Layers size={16} className="text-indigo-400" />} label="Nexus" onClick={() => onOpenModule('nexus', 'Viabhron Nexus')} />
                <CanopyAppIcon icon={<Search size={16} className="text-purple-400" />} label="Discovery" onClick={() => onOpenModule('discovery', 'Discovery Core')} />
                <CanopyAppIcon icon={<Activity size={16} className="text-red-400" />} label="Metrics" onClick={() => onOpenModule('metrics', 'System Metrics')} />
                <CanopyAppIcon icon={<Terminal size={16} className="text-emerald-400" />} label="CLI" onClick={() => onOpenModule('agent_cli', 'Agent CLI')} />
                <CanopyAppIcon icon={<Lock size={16} className="text-blue-400" />} label="Identity" onClick={() => onOpenModule('identity-8004', 'Identity-8004')} />
                <CanopyAppIcon icon={<Grid size={16} className="text-cyan-400" />} label="Creative" onClick={() => onOpenModule('creative', 'Creative Studio')} />
              </CanopySection>

              {/* MOSS (Substrate) */}
              <CanopySection 
                title="Moss Substrate" 
                icon={<Box size={16} />}
                isOpen={!!openSections.moss}
                onToggle={() => toggleSection('moss')}
              >
                <CanopyAppIcon icon={<Box size={16} className="text-secondary" />} label="Mini Apps" onClick={() => onOpenModule('loader', 'Moss Loader')} />
                <CanopyAppIcon icon={<Gamepad2 size={16} className="text-pink-500" />} label="Games" onClick={() => onOpenModule('gaming', 'Sovereign Gaming')} />
              </CanopySection>

              {/* BULKHEAD & COMPLIANCE */}
              <CanopySection 
                title="Bulkhead & Compliance" 
                icon={<Shield size={16} />}
                isOpen={!!openSections.bulkhead}
                onToggle={() => toggleSection('bulkhead')}
              >
                <CanopyAppIcon icon={<ShieldAlert size={16} className="text-red-500" />} label="Sec Patches" onClick={() => onOpenModule('security', 'Security Patches')} />
                <CanopyAppIcon icon={<Gauge size={16} className="text-emerald-500" />} label="Eff Patches" onClick={() => onOpenModule('efficiency', 'Efficiency Patches')} />
                <CanopyAppIcon icon={<Briefcase size={16} className="text-amber-500" />} label="Vault" onClick={() => onOpenModule('artifacts', 'Artifacts Vault')} />
                <CanopyAppIcon icon={<Settings size={16} className="text-slate-500" />} label="Settings" onClick={() => onOpenModule('settings', 'System Settings')} />
              </CanopySection>
            </div>

            {/* Quick Actions Footer */}
            <div className="shrink-0 p-5 bg-slate-950/60 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold ring-1 ring-primary/30">
                    V
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Chairman</span>
                  <span className="text-[8px] font-mono text-emerald-500/80 tracking-tighter uppercase">Resident_Status_Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'));
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-primary hover:text-white transition-all border border-white/5"
                  title="Switch to VAA"
                >
                  <Smartphone size={16} />
                </button>
                <button 
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all border border-white/5"
                  title="Hibernate"
                >
                  <Lock size={16} />
                </button>
                <button 
                  className="p-3 bg-primary/10 hover:bg-primary/20 rounded-xl text-primary transition-all border border-primary/20"
                  title="Power Off"
                >
                  <Zap size={16} className="fill-current" />
                </button>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
};
