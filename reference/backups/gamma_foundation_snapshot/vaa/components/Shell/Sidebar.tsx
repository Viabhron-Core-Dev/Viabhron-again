import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  MessageSquare, 
  Settings, 
  Shield, 
  Zap, 
  Activity, 
  Terminal, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  User as UserIcon,
  LogOut,
  Globe,
  Workflow,
  Box,
  Cpu,
  Lock,
  Search,
  History,
  Bell
} from 'lucide-react';
import { Tab, User, SystemMode } from '@/core/kernel/types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onShelveTab: (id: string) => void;
  onWakeTab: (id: string) => void;
  tabs: Tab[];
  user: User | null;
  onOpenSystemMenu: () => void;
  isSystemMenuOpen: boolean;
  geminiApiKey?: string;
  systemMode: SystemMode;
  login?: () => void;
  logout?: () => void;
  extensions?: any[];
  miniApps?: any[];
  clients?: any[];
  securityRules?: any[];
  efficiencyPatches?: any[];
  onToggleMiniApp?: (id: string) => void;
  onToggleClient?: (id: string) => void;
  onToggleRule?: (id: string) => void;
  onTogglePatch?: (id: string) => void;
  onConnectCloud?: () => void;
  onOpenStore?: () => void;
  onOpenCanvas?: () => void;
  onOpenArtifacts?: () => void;
  onOpenMetrics?: () => void;
  onOpenSimulation?: () => void;
  onOpenGovernance?: () => void;
  onOpenForge?: () => void;
  onOpenAgentCLI?: () => void;
  onOpenSentinel?: () => void;
  onOpenSecurity?: () => void;
  onOpenEfficiency?: () => void;
  onOpenHatchery?: () => void;
  onOpenSOPs?: () => void;
  onOpenProposals?: () => void;
  onOpenSettings?: () => void;
  onOpenSoundForge?: () => void;
  onOpenImageStudio?: () => void;
  onOpenVideoSuite?: () => void;
  onOpenMossSystem?: () => void;
  onOpenSupplyChainShield?: () => void;
  onOpenSovereignMesh?: () => void;
  onOpenSovereignMCPShield?: () => void;
  onOpenQuantumForge?: () => void;
  onOpenPlaceholderClient?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  activeTabId,
  onSwitchTab,
  onAddTab,
  onCloseTab,
  onShelveTab,
  onWakeTab,
  tabs,
  user,
  onOpenSystemMenu,
  isSystemMenuOpen,
  systemMode,
  login,
  logout,
  extensions,
  miniApps,
  clients,
  securityRules,
  efficiencyPatches,
  onToggleMiniApp,
  onToggleClient,
  onToggleRule,
  onTogglePatch,
  onConnectCloud,
  onOpenStore,
  onOpenCanvas,
  onOpenArtifacts,
  onOpenMetrics,
  onOpenSimulation,
  onOpenGovernance,
  onOpenForge,
  onOpenAgentCLI,
  onOpenSentinel,
  onOpenSecurity,
  onOpenEfficiency,
  onOpenHatchery,
  onOpenSOPs,
  onOpenProposals,
  onOpenSettings,
  onOpenSoundForge,
  onOpenImageStudio,
  onOpenVideoSuite,
  onOpenMossSystem,
  onOpenSupplyChainShield,
  onOpenSovereignMesh,
  onOpenSovereignMCPShield,
  onOpenQuantumForge,
  onOpenPlaceholderClient
}) => {
  const activeTabs = tabs.filter(t => t.status === 'active');
  const shelvedTabs = tabs.filter(t => t.status === 'shelved');

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-full bg-gray-950 border-r border-white/5 flex flex-col relative z-[90]"
    >
      {/* Header */}
      <div className="h-20 flex items-center px-6 justify-between border-b border-white/5">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-sm tracking-widest text-white uppercase">Viabhron</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-600/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
        {/* Active Sessions */}
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center justify-between px-2 mb-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Sessions</span>
              <button onClick={onAddTab} className="p-1 hover:bg-white/5 rounded text-gray-400">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
          
          <div className="space-y-1">
            {activeTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onSwitchTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all group ${
                  activeTabId === tab.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${activeTabId === tab.id ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-xs font-bold truncate">{tab.title || 'Untitled'}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-tighter">Resident Agent</div>
                  </div>
                )}
                {!isCollapsed && activeTabId === tab.id && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onShelveTab(tab.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded text-gray-400"
                  >
                    <History className="w-3 h-3" />
                  </button>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Shelved Sessions */}
        {shelvedTabs.length > 0 && (
          <div className="space-y-2">
            {!isCollapsed && (
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Neural Archive</span>
            )}
            <div className="space-y-1">
              {shelvedTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onWakeTab(tab.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-all group"
                >
                  <div className="p-2 bg-white/5 rounded-xl">
                    <History className="w-4 h-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-xs font-bold truncate">{tab.title}</div>
                      <div className="text-[9px] text-gray-700 uppercase tracking-tighter">Shelved</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* System Divisions */}
        <div className="space-y-2">
          {!isCollapsed && (
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Protected Divisions</span>
          )}
          <div className="space-y-1">
            {[
              { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" />, color: 'text-emerald-500' },
              { id: 'efficiency', label: 'Efficiency', icon: <Zap className="w-4 h-4" />, color: 'text-blue-500' },
              { id: 'governance', label: 'Governance', icon: <Globe className="w-4 h-4" />, color: 'text-purple-500' }
            ].map(div => (
              <button
                key={div.id}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
              >
                <div className={`p-2 bg-white/5 rounded-xl ${div.color}`}>
                  {div.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-xs font-bold uppercase tracking-widest">{div.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button 
          onClick={onOpenSystemMenu}
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
            isSystemMenuOpen ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/5">
            <UserIcon className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left min-w-0">
              <div className="text-xs font-bold truncate">{user?.email?.split('@')[0] || 'Chairman'}</div>
              <div className="text-[9px] text-gray-600 uppercase tracking-tighter">{systemMode} Mode</div>
            </div>
          )}
          {!isCollapsed && <Settings className="w-4 h-4 text-gray-600" />}
        </button>
        
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
};
