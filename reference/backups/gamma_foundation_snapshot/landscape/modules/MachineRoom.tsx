import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal as TerminalIcon, 
  Settings, 
  Layout, 
  Puzzle, 
  Bot, 
  HelpCircle, 
  Download,
  Brain,
  Plus,
  Trash2,
  X,
  Cpu,
  Database,
  Server,
  HardDrive
} from 'lucide-react';
import { Sidebar } from '@/vaa/components/Shell/Sidebar';
import { Tabs } from '@/vaa/components/Shell/Tabs';
import { SystemHUD } from '@/vaa/components/Shell/SystemHUD';
import { Terminal } from '@/landscape/modules/Terminal';
import { ConfirmationGate } from '@/vaa/components/Shell/ConfirmationGate';
import { Chat } from '@/vaa/components/Shell/Chat';
import { Discovery } from '@/vaa/components/Shell/Discovery';
import { ExtensionStore } from '@/vaa/components/Shell/ExtensionStore';
import { Canvas } from '@/vaa/components/Shell/Canvas';
import { Artifacts } from '@/landscape/modules/Artifacts';
import { SystemMetrics } from '@/landscape/modules/SystemMetrics';
import { Simulation } from '@/landscape/modules/Simulation';
import { Governance } from '@/landscape/modules/Governance';
import { Forge } from '@/landscape/modules/Forge';
import { AgentCLI } from '@/landscape/modules/AgentCLI';
import { Sentinel } from '@/landscape/modules/Sentinel';
import { Nexus } from '@/landscape/modules/Nexus';
import { Symphony } from '@/landscape/modules/Symphony';
import { Creative } from '@/landscape/modules/Creative';
import { SoundForge } from '@/landscape/modules/SoundForge';
import { ImageStudio } from '@/landscape/modules/ImageStudio';
import { VideoSuite } from '@/landscape/modules/VideoSuite';
import { MossSystem } from '@/landscape/modules/MossSystem';
import { SupplyChainShield } from '@/landscape/modules/SupplyChainShield';
import { SovereignMesh } from '@/landscape/modules/SovereignMesh';
import { SovereignMCPShield } from '@/landscape/modules/SovereignMCPShield';
import { QuantumForge } from '@/landscape/modules/QuantumForge';
import { SOPRegistry } from '@/vaa/components/Shell/SOPRegistry';
import { RatificationRegistry } from '@/vaa/components/Shell/RatificationRegistry';
import { SecurityDivision } from '@/vaa/components/MachineRoom/SecurityDivision';
import { EfficiencyDivision } from '@/vaa/components/MachineRoom/EfficiencyDivision';
import { Hatchery } from '@/vaa/components/Shell/Hatchery';
import { BottomNavigation } from '@/vaa/components/Shell/BottomNavigation';
import { TabSwitcher } from '@/vaa/components/Shell/TabSwitcher';

import { 
  User, 
  Extension, 
  MiniApp, 
  Client, 
  SecurityRule, 
  EfficiencyPatch, 
  SystemMode, 
  Tab, 
  BackgroundTask, 
  Notification, 
  LogEntry, 
  SOP, 
  RatificationProposal,
  ExternalPlugin,
  Agent,
  Secret,
  UIMode
} from '@/core/kernel/types';

interface MachineRoomProps {
  user: User | null;
  login: () => void;
  logout: () => void;
  extensions: Extension[];
  miniApps: MiniApp[];
  clients: Client[];
  securityRules: SecurityRule[];
  efficiencyPatches: EfficiencyPatch[];
  systemMode: SystemMode;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
  isSystemMenuOpen: boolean;
  setIsSystemMenuOpen: (v: boolean) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (v: boolean) => void;
  isLockdown: boolean;
  setIsLockdown: (v: boolean) => void;
  tabs: Tab[];
  activeTabId: string | null;
  setActiveTabId: (id: string | null) => void;
  handleAddTab: (type?: any, title?: string) => void;
  handleCloseTab: (id: string) => void;
  handleShelveTab: (id: string) => void;
  handleWakeTab: (id: string) => void;
  onQuickAction: (action: () => void) => void;
  geminiApiKey: string;
  setGeminiApiKey: (v: string) => void;
  googleClientId: string;
  setGoogleClientId: (v: string) => void;
  backgroundTasks: BackgroundTask[];
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  canvasViewMode: 'design' | 'logic';
  setCanvasViewMode: (v: 'design' | 'logic') => void;
  confirmationRequest: any;
  setConfirmationRequest: (v: any) => void;
  bridgedProjectId: string | null;
  externalPlugins: ExternalPlugin[];
  setExternalPlugins: React.Dispatch<React.SetStateAction<ExternalPlugin[]>>;
  checkSovereignProcedures: (action: string, metadata?: any) => { allowed: boolean; message?: string; };
  handleToggleMiniApp: (id: string) => void;
  handleToggleClient: (id: string) => void;
  handleToggleRule: (id: string) => void;
  handleTogglePatch: (id: string) => void;
  handleConnectCloud: () => void;
  handleInstallExtension: (ext: Extension) => void;
  handleProjectSelected: (id: string, config: any) => Promise<void>;
  handleCodexRescue: (taskId: string) => void;
  handleRatifyProposal: (id: string) => void;
  handleShelveProposal: (id: string) => void;
  handleVetoProposal: (id: string) => void;
  handleAddRule: (rule: Omit<SecurityRule, 'id' | 'createdAt'>) => void;
  handleDeleteRule: (id: string) => void;
  handleLockdown: () => void;
  handleUnlock: () => void;
  handleModeChange: (mode: SystemMode) => void;
  handleApplyPatch: (id: string) => void;
  handleHatch: (data: any) => Promise<void>;
  handleInstallPWA: () => void;
  handleDeleteAgent: (id: string) => void;
  handleAddAgent: () => void;
  onCreateAgent: (agent: Partial<Agent>) => void;
  onAddSecret: (secret: Omit<Secret, 'id' | 'createdAt'>) => void;
  onDeleteSecret: (id: string) => void;
  onUpdateSecret: (id: string, updates: Partial<Secret>) => void;
  isAddingAgent: boolean;
  setIsAddingAgent: (v: boolean) => void;
  newAgentName: string;
  setNewAgentName: (v: string) => void;
  newAgentKey: string;
  setNewAgentKey: (v: string) => void;
  agents: Agent[];
  secrets: Secret[];
  accessToken: string | null;
  sops: SOP[];
  proposals: RatificationProposal[];
  setIsAgentSettingsOpen: (v: boolean) => void;
  isAgentSettingsOpen: boolean;
  isTabSwitcherOpen: boolean;
  setIsTabSwitcherOpen: (v: boolean) => void;
  systemMenuRef: React.RefObject<HTMLDivElement>;
  uiMode: UIMode;
  setSystemMode: (mode: SystemMode) => void;
  officeName: string;
}

export const MachineRoom: React.FC<MachineRoomProps> = (props) => {
  const {
    user, login, logout, extensions, miniApps, clients, securityRules, efficiencyPatches,
    systemMode, isSidebarCollapsed, setIsSidebarCollapsed, isSystemMenuOpen, setIsSystemMenuOpen,
    isTerminalOpen, setIsTerminalOpen, isLockdown, setIsLockdown, tabs, activeTabId, setActiveTabId,
    handleAddTab, handleCloseTab, handleShelveTab, handleWakeTab, onQuickAction, geminiApiKey,
    setGeminiApiKey, googleClientId, setGoogleClientId, backgroundTasks, notifications,
    setNotifications, logs, addLog, canvasViewMode, setCanvasViewMode, confirmationRequest,
    setConfirmationRequest, bridgedProjectId, externalPlugins, setExternalPlugins,
    checkSovereignProcedures, handleToggleMiniApp, handleToggleClient, handleToggleRule,
    handleTogglePatch, handleConnectCloud, handleInstallExtension, handleProjectSelected,
    handleCodexRescue, handleRatifyProposal, handleShelveProposal, handleVetoProposal,
    handleAddRule, handleDeleteRule, handleLockdown, handleUnlock, handleModeChange,
    handleApplyPatch, handleHatch, handleInstallPWA, handleDeleteAgent, handleAddAgent,
    isAddingAgent, setIsAddingAgent, newAgentName, setNewAgentName, newAgentKey, setNewAgentKey,
    agents, accessToken, sops, proposals, setIsAgentSettingsOpen, isAgentSettingsOpen,
    isTabSwitcherOpen, setIsTabSwitcherOpen, systemMenuRef, uiMode, setSystemMode, officeName
  } = props;

  // We need to access some functions from App.tsx via props or move them here.
  // For now, it's safer to keep most logic in App.tsx and pass as props.

  return (
    <div className="flex-1 flex overflow-hidden relative">
      <Sidebar 
        user={user}
        login={login}
        logout={logout}
        extensions={extensions} 
        miniApps={miniApps}
        clients={clients}
        securityRules={securityRules}
        efficiencyPatches={efficiencyPatches}
        onToggleMiniApp={handleToggleMiniApp}
        onToggleClient={handleToggleClient}
        onToggleRule={handleToggleRule}
        onTogglePatch={handleTogglePatch}
        onConnectCloud={handleConnectCloud} 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenStore={() => onQuickAction(() => handleAddTab('store', 'Extension Store'))}
        onOpenCanvas={() => onQuickAction(() => handleAddTab('canvas', 'Visual Workflow'))}
        onOpenArtifacts={() => onQuickAction(() => handleAddTab('artifacts', 'Generative Artifacts'))}
        onOpenMetrics={() => onQuickAction(() => handleAddTab('metrics', 'System Metrics'))}
        onOpenSimulation={() => onQuickAction(() => handleAddTab('simulation', 'Simulation Engine'))}
        onOpenGovernance={() => onQuickAction(() => handleAddTab('governance', 'Agent Governance Toolkit'))}
        onOpenForge={() => onQuickAction(() => handleAddTab('forge', 'Vibe Forge (AI IDE)'))}
        onOpenAgentCLI={() => onQuickAction(() => handleAddTab('agent_cli', 'Agent CLI'))}
        onOpenSentinel={() => onQuickAction(() => handleAddTab('sentinel', 'Sentinel Guardian'))}
        onOpenSecurity={() => onQuickAction(() => handleAddTab('security', 'Security Division'))}
        onOpenEfficiency={() => onQuickAction(() => handleAddTab('efficiency', 'Efficiency Patches'))}
        onOpenHatchery={() => onQuickAction(() => handleAddTab('hatchery', 'The Hatchery'))}
        onOpenSOPs={() => onQuickAction(() => handleAddTab('sops', 'SOP Registry'))}
        onOpenProposals={() => onQuickAction(() => handleAddTab('proposals', 'Ratification Registry'))}
        onOpenSettings={() => onQuickAction(() => handleAddTab('settings', 'System Settings'))}
        onOpenSoundForge={() => onQuickAction(() => handleAddTab('sound_forge', 'Sound Forge'))}
        onOpenImageStudio={() => onQuickAction(() => handleAddTab('image_studio', 'Image Studio'))}
        onOpenVideoSuite={() => onQuickAction(() => handleAddTab('video_suite', 'Video Suite'))}
        onOpenMossSystem={() => onQuickAction(() => handleAddTab('moss_system', 'Moss System'))}
        onOpenSupplyChainShield={() => onQuickAction(() => handleAddTab('supply_chain_shield', 'Supply Chain Shield'))}
        onOpenSovereignMesh={() => onQuickAction(() => handleAddTab('sovereign_mesh', 'Sovereign Mesh'))}
        onOpenSovereignMCPShield={() => onQuickAction(() => handleAddTab('sovereign_mcp_shield', 'Sovereign MCP Shield'))}
        onOpenQuantumForge={() => onQuickAction(() => handleAddTab('sovereign_quantum_forge', 'Quantum Forge'))}
        onOpenPlaceholderClient={() => onQuickAction(() => handleAddTab('placeholder_client', 'Flagship Client'))}
        geminiApiKey={geminiApiKey}
        systemMode={systemMode}
        activeTabId={activeTabId || ''}
        onSwitchTab={setActiveTabId}
        onAddTab={() => onQuickAction(() => handleAddTab())}
        onCloseTab={handleCloseTab}
        onShelveTab={handleShelveTab}
        onWakeTab={handleWakeTab}
        onOpenSystemMenu={() => setIsSystemMenuOpen(true)}
        isSystemMenuOpen={isSystemMenuOpen}
        tabs={tabs}
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="hidden md:block">
          <Tabs 
            tabs={tabs}
            activeTabId={activeTabId || ''}
            onAddTab={() => onQuickAction(() => handleAddTab())}
            onCloseTab={handleCloseTab}
            onSwitchTab={(id) => onQuickAction(() => {
              const tab = tabs.find(t => t.id === id);
              if (tab?.status === 'shelved') {
                handleWakeTab(id);
              } else {
                setActiveTabId(id);
              }
            })}
          />
        </div>
        
        <div className={`flex-1 relative overflow-hidden pb-32 md:pb-0`}>
          {(!isSidebarCollapsed || isSystemMenuOpen) && (
            <div 
              className="absolute inset-0 z-[80] bg-black/20 backdrop-blur-[2px]"
              onClick={() => {
                setIsSidebarCollapsed(true);
                setIsSystemMenuOpen(false);
              }}
            />
          )}

          <SystemHUD 
            systemMode={systemMode}
            onModeChange={setSystemMode}
            onToggleLockdown={() => setIsLockdown(!isLockdown)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenSettings={() => setIsSystemMenuOpen(true)}
            uiMode={uiMode}
            onClearCache={() => console.log('Cache cleared')}
            onHibernateAll={() => tabs.forEach(t => handleShelveTab(t.id))}
            isLockdown={isLockdown}
            officeName={officeName}
          />

          <AnimatePresence>
            {isTerminalOpen && (
              <div className="absolute bottom-4 right-4 w-full max-w-lg h-64 z-[150]">
                <Terminal onClose={() => setIsTerminalOpen(false)} />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLockdown && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[200] pointer-events-none border-[4px] border-red-600/50 animate-pulse flex items-start justify-center pt-20"
              >
                <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-[0.5em] shadow-2xl shadow-red-600/50 flex items-center gap-3">
                  <Shield className="w-4 h-4 animate-bounce" />
                  System Lockdown Active
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ConfirmationGate 
            isOpen={confirmationRequest?.isOpen || false}
            title={confirmationRequest?.title || ''}
            description={confirmationRequest?.description || ''}
            agentName={confirmationRequest?.agentName || ''}
            onConfirm={() => {
              confirmationRequest?.onConfirm();
              setConfirmationRequest(null);
            }}
            onCancel={() => setConfirmationRequest(null)}
          />

          <div className="flex-1 relative h-full">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-300 ${tab.id === activeTabId && tab.status === 'active' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
              >
                {tab.type === 'chat' ? (
                  <Chat 
                    tabId={tab.id} 
                    userId={user?.uid} 
                    agentId={tab.agentId}
                    isBridged={!!bridgedProjectId}
                    geminiApiKey={geminiApiKey}
                    availableExtensions={extensions}
                    activeExtensionIds={tab.activeExtensionIds || []}
                    externalPlugins={externalPlugins}
                    onUpdateExternalPlugins={setExternalPlugins}
                    onUpdateExtensions={(ids) => {
                      // Logic handled in App.tsx or use setDoc here if db available
                    }}
                    isLockdown={isLockdown}
                    checkSovereignProcedures={checkSovereignProcedures}
                    uiMode="browser"
                  />
                ) : tab.type === 'discovery' && accessToken ? (
                  <Discovery 
                    accessToken={accessToken} 
                    onProjectSelected={handleProjectSelected} 
                    uiMode="browser"
                  />
                ) : tab.type === 'store' ? (
                  <ExtensionStore 
                    onInstall={handleInstallExtension} 
                    installedIds={extensions.map(e => e.id)} 
                    uiMode="browser"
                  />
                ) : tab.type === 'canvas' ? (
                  <Canvas 
                    tabId={tab.id}
                    userId={user?.uid}
                    initialData={tab.canvasData}
                    viewMode={canvasViewMode}
                    onViewModeChange={setCanvasViewMode}
                    onUpdate={(data) => {
                       // Logic handled in App.tsx
                    }}
                    uiMode="browser"
                  />
                ) : tab.type === 'artifacts' ? (
                  <Artifacts 
                    tabId={tab.id}
                    userId={user?.uid}
                    uiMode="browser"
                  />
                ) : tab.type === 'metrics' ? (
                  <SystemMetrics uiMode="browser" />
                ) : tab.type === 'simulation' ? (
                  <Simulation uiMode="browser" />
                ) : tab.type === 'governance' ? (
                  <Governance uiMode="browser" />
                ) : tab.type === 'forge' ? (
                  <Forge isLockdown={isLockdown} checkSovereignProcedures={checkSovereignProcedures} uiMode="browser" />
                ) : tab.type === 'agent_cli' ? (
                  <AgentCLI isLockdown={isLockdown} checkSovereignProcedures={checkSovereignProcedures} uiMode="browser" />
                ) : tab.type === 'sentinel' ? (
                  <Sentinel 
                    backgroundTasks={backgroundTasks}
                    onRescue={handleCodexRescue}
                    notifications={notifications}
                    onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))}
                    onDelete={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
                    onClearAll={() => setNotifications([])}
                    onAction={(id, status) => {
                      setNotifications(prev => prev.map(n => {
                        if (n.id === id && n.action) {
                          if (status === 'approved') n.action.onApprove();
                          if (status === 'rejected') n.action.onReject();
                          return { ...n, action: { ...n.action, status } };
                        }
                        return n;
                      }));
                      addLog({
                        level: 'INFO',
                        source: 'UI-Shell',
                        message: `Chairman ${status} action for notification: ${id}`,
                        metadata: { notificationId: id, status }
                      });
                    }}
                    logs={logs}
                    uiMode="browser"
                  />
                ) : tab.type === 'nexus' ? (
                  <Nexus uiMode="browser" />
                ) : tab.type === 'symphony' ? (
                  <Symphony uiMode="browser" backgroundTasks={backgroundTasks} logs={logs} />
                ) : tab.type === 'creative' ? (
                  <Creative uiMode="browser" />
                ) : tab.type === 'sound_forge' ? (
                  <SoundForge uiMode="browser" />
                ) : tab.type === 'image_studio' ? (
                  <ImageStudio uiMode="browser" />
                ) : tab.type === 'video_suite' ? (
                  <VideoSuite uiMode="browser" />
                ) : tab.type === 'moss_system' ? (
                  <MossSystem uiMode="browser" />
                ) : tab.type === 'supply_chain_shield' ? (
                  <SupplyChainShield uiMode="browser" />
                ) : tab.type === 'sovereign_mesh' ? (
                  <SovereignMesh uiMode="browser" />
                ) : tab.type === 'sovereign_mcp_shield' ? (
                  <SovereignMCPShield uiMode="browser" />
                ) : tab.type === 'sovereign_quantum_forge' ? (
                  <QuantumForge uiMode="browser" />
                ) : tab.type === 'sops' ? (
                  <SOPRegistry sops={sops} onExecute={(sop) => console.log('Executing SOP:', sop)} uiMode="browser" />
                ) : tab.type === 'proposals' ? (
                  <RatificationRegistry 
                    proposals={proposals.filter(p => p.status === 'pending' || p.status === 'shelved')} 
                    onRatify={handleRatifyProposal}
                    onShelve={handleShelveProposal}
                    onVeto={handleVetoProposal}
                    uiMode="browser"
                  />
                ) : tab.type === 'security' ? (
                  <SecurityDivision 
                    rules={securityRules}
                    onAddRule={handleAddRule}
                    onToggleRule={handleToggleRule}
                    onDeleteRule={handleDeleteRule}
                    onLockdown={handleLockdown}
                    isLockdownActive={isLockdown}
                    onUnlock={handleUnlock}
                    uiMode="browser"
                  />
                ) : tab.type === 'efficiency' ? (
                  <EfficiencyDivision 
                    mode={systemMode}
                    onModeChange={handleModeChange}
                    patches={efficiencyPatches}
                    onApplyPatch={handleApplyPatch}
                    uiMode="browser"
                  />
                ) : tab.type === 'hatchery' ? (
                  <Hatchery onHatch={handleHatch} uiMode="browser" />
                ) : tab.type === 'settings' ? (
                  <div className={`h-full bg-gray-950 p-8 pb-32 md:pb-8 overflow-y-auto no-scrollbar`}>
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-white">System Settings</h1>
                          <p className="text-sm text-gray-500">Manage your Viabhron environment</p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">System Provisioning</h3>
                            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Bridged</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Firebase', icon: Database, status: 'Active', color: 'text-orange-400' },
                              { label: 'Cloud Run', icon: Server, status: 'Active', color: 'text-blue-400' },
                              { label: 'G-Drive', icon: HardDrive, status: 'Active', color: 'text-purple-400' },
                            ].map((item: any) => (
                              <div key={item.label} className="bg-gray-950 border border-white/5 rounded-xl p-3 text-center space-y-2">
                                <item.icon className={`w-5 h-5 mx-auto ${item.color}`} />
                                <div className="text-[10px] font-bold text-white uppercase tracking-tight">{item.label}</div>
                                <div className="text-[8px] text-gray-500 uppercase tracking-widest">{item.status}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Cloud Configuration</h3>
                            <Brain className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Google OAuth Client ID</label>
                              <input 
                                type="text"
                                value={googleClientId}
                                onChange={(e) => setGoogleClientId(e.target.value)}
                                placeholder="000000000000-xxxxxxxx.apps.googleusercontent.com"
                                className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-xs focus:border-blue-500 transition-all outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gemini API Key</label>
                              <input 
                                type="password"
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-xs focus:border-blue-500 transition-all outline-none"
                              />
                            </div>
                            <div className="flex justify-end">
                              <button 
                                onClick={async () => {
                                  // Call safe save logic from props
                                  console.log("Saving Cloud Config");
                                }}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                              >
                                Save Configuration
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6 relative">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Agent Cluster Manager</h3>
                              <p className="text-[10px] text-gray-600 uppercase tracking-tighter">Manage your Private AI Kernel & Specialists</p>
                            </div>
                            <button 
                              onClick={() => setIsAddingAgent(true)}
                              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Head AI (Kernel) */}
                          <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                  <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white uppercase tracking-tight">Main Head AI <span className="text-[10px] text-blue-400 ml-2">Kernel</span></div>
                                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Gemma 2B (Local Office)</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Running</div>
                                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">4GB RAM Allocated</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {agents.map((agent) => (
                              <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl group">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: agent.color }}>
                                    {agent.name[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{agent.name}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{agent.provider} Specialist</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <button 
                                    onClick={() => handleDeleteAgent(agent.id)}
                                    className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden relative z-[100]">
          <BottomNavigation 
            tabs={tabs}
            activeTabId={activeTabId || ''}
            isSidebarOpen={!isSidebarCollapsed}
            onTabSelect={(id) => onQuickAction(() => {
              const tab = tabs.find(t => t.id === id);
              if (tab?.status === 'shelved') {
                handleWakeTab(id);
              } else {
                setActiveTabId(id);
              }
            })}
            onTabClose={handleCloseTab}
            onAddTab={() => onQuickAction(() => handleAddTab())}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onToggleUIMode={() => {}}
            onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
            onOpenSystemMenu={() => setIsSystemMenuOpen(true)}
            onEditTab={() => {}}
            onShareTab={() => {}}
          />
        </div>

        <AnimatePresence>
          {isSystemMenuOpen && (
            <motion.div
              ref={systemMenuRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="fixed bottom-24 right-4 w-64 bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-[120] overflow-hidden"
            >
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => {
                    setIsTerminalOpen(!isTerminalOpen);
                    setIsSystemMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                >
                  <TerminalIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Agent Terminal</span>
                </button>
                <button 
                  onClick={() => {
                    setCanvasViewMode(canvasViewMode === 'design' ? 'logic' : 'design');
                    setIsSystemMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                >
                  <Layout className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">View Mode</span>
                </button>
                <button 
                  onClick={() => {
                    onQuickAction(() => handleAddTab('settings', 'System Settings'));
                    setIsSystemMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                >
                  <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">System Settings</span>
                </button>
                <button 
                  onClick={() => {
                    setIsAgentSettingsOpen(true);
                    setIsSystemMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                >
                  <Bot className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Agent Settings</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isTabSwitcherOpen && (
            <TabSwitcher 
              tabs={tabs}
              activeTabId={activeTabId || ''}
              onTabSelect={(id) => onQuickAction(() => {
                const tab = tabs.find(t => t.id === id);
                if (tab?.status === 'shelved') {
                  handleWakeTab(id);
                } else {
                  setActiveTabId(id);
                }
                setIsTabSwitcherOpen(false);
              })}
              onTabClose={handleCloseTab}
              onAddTab={() => onQuickAction(() => {
                handleAddTab();
                setIsTabSwitcherOpen(false);
              })}
              onClose={() => setIsTabSwitcherOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAgentSettingsOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white uppercase tracking-widest">Agent Settings</h2>
                  <button onClick={() => setIsAgentSettingsOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                {/* Plugin settings logic */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
