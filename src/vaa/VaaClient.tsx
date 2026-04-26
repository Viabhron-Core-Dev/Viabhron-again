import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  MessageSquare, 
  Users, 
  Globe, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Mic, 
  ArrowLeft,
  Sparkles,
  Zap,
  Layout,
  Store,
  Shield,
  Cpu,
  Workflow as WorkflowIcon,
  MessageCircle,
  QrCode,
  Camera,
  AlertCircle,
  Video,
  Phone,
  Smile,
  Share2,
  Bookmark,
  ChevronRight,
  RefreshCw,
  Database,
  Briefcase,
  User,
  History,
  LogOut,
  Terminal,
  Egg,
  Activity,
  HardDrive,
  Wifi,
  Trash2,
  Moon,
  FileText,
  X,
  ChevronDown,
  Clock,
  CheckCircle2,
  Play,
  HelpCircle,
  Bot,
  Network,
  Layers,
  Mail,
  ShieldCheck,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../lib/db";
import { useDualMode } from "../hooks/useDualMode";
import { 
  CelestialNode, 
  CelestialChat, 
  Message, 
  CelestialViewType,
  Agent,
  CanvasNode,
  CanvasEdge,
  NewsCard,
  IntelligenceChannel,
  IntelligencePulse,
  Extension,
  Moss,
  Secret
} from "../types";
import { Toaster, toast } from "sonner";
import { Canvas } from "../landscape/modules/Canvas";

import { useClickOutside } from "../hooks/useClickOutside";

// --- Extracted Components ---
import { SovereignCheck } from "./components/SovereignCheck";
import { WorkflowBuilder } from "./components/WorkflowBuilder";
import { NewsTab } from "./components/NewsTab";
import { ChatList } from "./components/ChatList";
import { ChatView } from "./components/ChatView";
import { VaaSettings } from "./components/VaaSettings";
import { HQExtensionsVault } from "./components/HQExtensionsVault";
import { SearchAndFilters, WorkflowTab } from "./components/Misc";
import { CameraCapture, QRScanner } from "./components/MediaTools";
import { ContactList } from "./components/ContactList";
import { DiscoveryHub } from "./components/DiscoveryHub";
import { MossLoader } from "../moss/MossLoader";

interface VaaClientProps {
  agents?: Agent[];
  extensions?: Extension[];
  moss?: Moss[];
  secrets?: Secret[];
  onCreateAgent?: (agent: Partial<Agent>) => void;
  onAddSecret?: (secret: Omit<Secret, 'id' | 'createdAt'>) => void;
  onDeleteSecret?: (id: string) => void;
  onUpdateSecret?: (id: string, updates: Partial<Secret>) => void;
  onToggleMoss?: (id: string) => void;
  onToggleFreeze?: (id: string) => void;
  onCloseApp?: (id: string) => void;
  onOpenStore?: () => void;
  lastOpenedAppId?: string | null;
  onAppOpen?: (id: string) => void;
}

const TABS: ("chats" | "news" | "workflow" | "loader")[] = ["chats", "news", "workflow", "loader"];

export const VaaClient: React.FC<VaaClientProps> = ({ 
  agents = [], 
  extensions = [], 
  moss = [], 
  secrets = [],
  onCreateAgent,
  onAddSecret,
  onDeleteSecret,
  onUpdateSecret,
  onToggleMoss,
  onToggleFreeze,
  onCloseApp,
  onOpenStore,
  lastOpenedAppId,
  onAppOpen
}) => {
  const { isNative, triggerVibration } = useDualMode();
  const [activeTab, setActiveTab] = useState<"chats" | "news" | "workflow" | "loader">("chats");
  
  // PWA Install Logic
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handlePwaInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };
  const systemMoss: Moss[] = [
    {
      id: 'ma-pulse',
      name: 'Pulse Monitor',
      description: 'System health and agent metabolism tracker.',
      icon: 'Activity',
      enabled: true,
      type: 'sovereign',
      category: 'core',
      status: 'inactive'
    }
  ];

  // Merge provided moss with system moss
  const allMoss = [...systemMoss, ...moss.filter(m => m.id !== 'ma-pulse')];

  const [lastOpenedAppIdState, setLastOpenedAppIdState] = useState<string | null>('ma-pulse');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [omegaPressing, setOmegaPressing] = useState<'none' | 'tapping' | 'holding'>('none');
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const startOmegaPress = () => {
    setOmegaPressing('tapping');
    pressTimer.current = setTimeout(() => {
      setOmegaPressing('holding');
      // Trigger haptic if native
      if (isNative && triggerVibration) triggerVibration();
    }, 600);
  };

  const endOmegaPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    if (omegaPressing === 'holding') {
      // Long press -> Resident Architect
      setSelectedChat(headAgentChat);
    } else if (omegaPressing === 'tapping') {
      // Single tap -> Local Agent
      const localAgentChat: CelestialChat = {
        id: 'local-pulse',
        name: 'Local Pulse',
        type: 'agent',
        messages: [
          {
            id: "lp1",
            role: "assistant",
            content: "Local Pulse active. Offline intelligence substrate responsive. I am your standalone Field Agent.",
            timestamp: new Date().toISOString()
          }
        ],
        updatedAt: Date.now(),
        isHeadAgent: false,
        filterCategory: 'Local'
      };
      setSelectedChat(localAgentChat);
    }
    setOmegaPressing('none');
  };

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        setIsInputFocused(true);
      }
    };
    const handleFocusOut = () => {
      // Small timeout to prevent flickering when jumping between inputs
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) {
          setIsInputFocused(false);
        }
      }, 50);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
  const [isAppFullscreen, setIsAppFullscreen] = useState(() => {
    return localStorage.getItem('viabhron:vaa:app-fullscreen') === 'true';
  });
  const [isAnyAppActive, setIsAnyAppActive] = useState(false);

  const handleToggleFullscreen = () => {
    const newState = !isAppFullscreen;
    setIsAppFullscreen(newState);
    localStorage.setItem('viabhron:vaa:app-fullscreen', String(newState));
  };
  const [selectedChat, setSelectedChat] = useState<CelestialChat | null>(null);
  const [view, setView] = useState<"main" | "workflow">("main");
  const [workflowData, setWorkflowData] = useState<{ nodes: CanvasNode[]; edges: CanvasEdge[] }>({ nodes: [], edges: [] });
  const [showMenu, setShowMenu] = useState(false);
  const [showVaaSettings, setShowVaaSettings] = useState(false);
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [newsFilter, setNewsFilter] = useState<string>("");
  const [showNewsFilterModal, setShowNewsFilterModal] = useState(false);
  const [showSovereignCheck, setShowSovereignCheck] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [showWorkflowSpeedDial, setShowWorkflowSpeedDial] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [showNewsDetails, setShowNewsDetails] = useState(false);
  const [showAgentShare, setShowAgentShare] = useState(false);
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const [newsCards] = useState<NewsCard[]>([
    {
      id: "1",
      title: "Sovereign Audit: Node-7 Bulkhead Warning",
      summary: "Resident Agent detected structural metadata drift in the isolated security layer.",
      fullContent: "The Sovereign Kernel detected an anomaly in Node-7. Log analysis suggests a potential collision in memory-mapped I/O. As chairman, you are advised to ratify the 'Security Patch 8004'. This affecting your local private cloud stability.",
      source: "Resident Sentinel",
      timestamp: "Now",
      category: "Critical"
    },
    {
      id: "2",
      title: "Market Metabolism: DeFi Pulse Up 12%",
      summary: "Your identified assets in the TRON substrate are showing high yield indicators.",
      fullContent: "Automated analysis of your linked DeFi wallets shows a 12.4% increase in liquidity returns. The Strategic Analyst recommends re-balancing the 'Alpha-1' portfolio to capture current metabolic peaks.",
      source: "Strategic Analyst",
      timestamp: "12m ago",
      category: "Metabolism"
    },
    {
      id: "3",
      title: "Llama 3.2: Edge Optimized Release",
      summary: "New mobile-first weights available for Spore deployment.",
      fullContent: "Meta has released Llama 3.2 1B and 3B models. These are specifically optimized for hardware like your current mobile edge device. They can be 'hatched' in the Loader tab for zero-latency local reasoning.",
      source: "GitHub Sentinel",
      timestamp: "2h ago",
      category: "Models"
    }
  ]);

  const handleNewsCardTap = (index: number) => {
    setSwipeIndex(index);
    setShowSwipeView(true);
    setTimeout(() => {
      if (swipeContainerRef.current) {
        const cardHeight = swipeContainerRef.current.clientHeight;
        swipeContainerRef.current.scrollTo({
          top: index * cardHeight,
          behavior: 'auto'
        });
      }
    }, 10);
  };
  const [showCamera, setShowCamera] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [isKernelActive, setIsKernelActive] = useState(true);
  const [newsIntakeMode, setNewsIntakeMode] = useState<"vaa" | "viabhron">("vaa");
  
  useEffect(() => {
    // Check if resident agent exists as proxy for kernel state
    const residentAgent = agents.find(a => a.isResident && a.role === 'head');
    setIsKernelActive(!!residentAgent);
  }, [agents]);

  const [activeChatFilter, setActiveChatFilter] = useState("All");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [availableChatFilters, setAvailableChatFilters] = useState(["All", "Semi Local", "Cloudflare", "GitHub", "Gmail", "Corporate", "Hatchery"]);
  const [activeChatFilters, setActiveChatFilters] = useState(["All", "Semi Local", "Cloudflare", "GitHub", "Gmail"]);
  const [chats, setChats] = useState<CelestialChat[]>([]);
  
  const [showDiscoveryHub, setShowDiscoveryHub] = useState(false);
  const [intelligenceChannels, setIntelligenceChannels] = useState<IntelligenceChannel[]>([
    { id: 'gh-ms', name: 'Microsoft', type: 'github', isFollowing: true, lastPulse: '12m ago' },
    { id: 'gh-meta', name: 'Meta AI', type: 'github', isFollowing: true, lastPulse: '1h ago' },
    { id: 'hf-deepseek', name: 'DeepSeek', type: 'huggingface', isFollowing: true, lastPulse: '2h ago' }
  ]);
  const [intelligencePulses, setIntelligencePulses] = useState<IntelligencePulse[]>([
    { id: 'p1', channelId: 'gh-ms', content: "OpenSauced is trending with 1.2k stars today.", timestamp: '12m ago', type: 'trending' },
    { id: 'p2', channelId: 'hf-deepseek', content: "DeepSeek-V3 checkpoints published on Hub.", timestamp: '2h ago', type: 'model_release' },
    { id: 'p3', channelId: 'gh-meta', content: "Llama-3 (8B) quantized versions released.", timestamp: '4h ago', type: 'model_release' }
  ]);

  const hasGithubKey = secrets.some(s => s.label.toLowerCase().includes('github') && s.value);
  const hasHFKey = secrets.some(s => s.label.toLowerCase().includes('huggingface') && s.value);

  const handleFollowChannel = (channel: IntelligenceChannel) => {
    setIntelligenceChannels(prev => {
      const exists = prev.find(c => c.id === channel.id);
      if (exists) {
        return prev.map(c => c.id === channel.id ? { ...c, isFollowing: !c.isFollowing } : c);
      }
      return [...prev, { ...channel, isFollowing: true }];
    });
    toast.success(`${channel.isFollowing ? 'Unfollowed' : 'Following'} ${channel.name}`);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setShowMenu(false));
  useClickOutside(newsMenuRef, () => setShowNewsMenu(false));
  useClickOutside(chatMenuRef, () => setShowChatMenu(false));
  useClickOutside(plusMenuRef, () => setShowPlusMenu(false));

  const displayTabs = [TABS[TABS.length - 1], ...TABS, TABS[0]];

  const initialAgentsChats = useMemo(() => {
    const residentAgent = agents.find(a => a.isResident && a.role === 'head');
    
    const agentNodes: CelestialChat[] = agents
      .filter(agent => (!agent.isStaff || agent.isResident) && agent.id !== residentAgent?.id)
      .map(agent => ({
        id: `agent-${agent.id}`,
        nodeId: agent.id,
        name: agent.name,
        lastMessage: agent.description || "System Agent ready for deployment.",
        messages: [],
        type: "agent",
        updatedAt: 0, // Using fixed value or relying on updates
        isHeadAgent: agent.role === 'head',
        filterCategory: agent.isResident ? "Semi Local" : "Corporate"
      }));

    const staticChats: CelestialChat[] = [
      {
        id: "my-notes",
        nodeId: "user-self",
        name: "My Notes (Nucleus Buffer)",
        lastMessage: "Chairman's private scratchpad initiated.",
        messages: [],
        type: "agent",
        updatedAt: 1,
        filterCategory: "Semi Local",
        isSelf: true
      },
      {
        id: residentAgent ? `agent-${residentAgent.id}` : "cloud-manager-resident",
        nodeId: residentAgent?.id || "cloud-manager",
        name: "Cloud Manager",
        lastMessage: residentAgent?.description || "Sovereign Brain Initialized. Awaiting Chairman's command.",
        messages: [
          {
            id: "cm1",
            role: "assistant",
            content: "Welcome back, Chairman. The Sovereign Kernel is stable. I am your Resident Agent, managing the private cloud substrate. How shall we proceed?",
            timestamp: "2024-01-01T00:00:00Z"
          }
        ],
        type: "agent",
        isHeadAgent: true,
        updatedAt: 2,
        filterCategory: "Semi Local"
      },
      {
        id: "sentinel-feed",
        name: "Sentinel Feed",
        lastMessage: "System Monitoring Active: All bulkheads secure.",
        messages: [
          {
            id: "s1",
            role: "assistant",
            content: "[INFO] Viabhron Kernel initialized successfully.",
            timestamp: "2024-01-01T00:00:00Z"
          },
          {
            id: "s2",
            role: "assistant",
            content: "[SUCCESS] Sovereign Listener Bridge connected.",
            timestamp: "2024-01-01T00:00:01Z"
          },
          {
            id: "s3",
            role: "assistant",
            content: "[WARN] High memory usage detected in Node-7.",
            timestamp: "2024-01-01T00:00:02Z"
          }
        ],
        type: "sentinel",
        isSentinel: true,
        updatedAt: 3,
        filterCategory: "Semi Local"
      },
      {
        id: "glasswing-auditor",
        name: "Glasswing Auditor",
        lastMessage: "Chairman, I have synthesized a new vulnerability in Node-7.",
        messages: [
          { 
            id: "gw1", 
            role: "assistant", 
            content: "[GLASSWING BRIEFING] I have identified a potential privilege escalation flaw in the 'Extra Processor' node manifest. This flaw is similar to the 27-year-old OpenBSD bug recently disclosed. I have a Sovereign Patch ready for ratification.", 
            timestamp: "2024-01-01T00:00:00Z",
            metadata: { type: "security-alert", severity: "high" }
          }
        ],
        type: "agent",
        updatedAt: 4,
        filterCategory: "Cloudflare"
      },
      {
        id: "mission-control",
        name: "Mission Control",
        lastMessage: "Finance Auditor Agent: 1,240 claims processed.",
        messages: [
          { 
            id: "mc1", 
            role: "assistant", 
            content: "[MISSION LOG] Finance Auditor Agent has successfully connected to the UiPath Orchestrator substrate. Primary User status confirmed.", 
            timestamp: "2024-01-01T00:00:00Z"
          },
          { 
            id: "mc2", 
            role: "assistant", 
            content: "[STATUS] Healthcare Claims Worker synthesis at 45%. Adversarial Auditor is currently vetting the automation manifest.", 
            timestamp: "2024-01-01T00:00:01Z"
          }
        ],
        type: "agent",
        updatedAt: 5,
        filterCategory: "Corporate"
      }
    ];

    return [...staticChats, ...agentNodes];
  }, [agents]);

  useEffect(() => {
    setChats(initialAgentsChats);
  }, [initialAgentsChats]);

  const headAgentChat = chats.find(c => c.isHeadAgent);

  // --- MOBILE-FIRST: BACK BUTTON LOGIC ---
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Close in priority order
      if (showCamera) setShowCamera(false);
      else if (showQRScanner) setShowQRScanner(false);
      else if (showVaaSettings) setShowVaaSettings(false);
      else if (showContactList) setShowContactList(false);
      else if (showWorkflowBuilder) setShowWorkflowBuilder(false);
      else if (showSwipeView) setShowSwipeView(false);
      else if (isAnyAppActive) {
        // Find active app and trigger close via event? 
        // Or just force close by simulating purge event
        window.dispatchEvent(new CustomEvent('viabhron:close-all-moss'));
      }
      else if (selectedChat) setSelectedChat(null);
      else if (view === "workflow") setView("main");
    };

    window.addEventListener('popstate', handlePopState);

    const handleNavApi = () => {
      setShowVaaSettings(true);
      // We need to tell VaaSettings to open the apiKeys subpage
      // Since we don't have a direct prop for subpage, we can use a temporary global or state in VaaClient
      // But VaaSettings is already open, so let's just make it simple.
      // I'll add a 'initialSubPage' prop to VaaSettings or just rely on a window event.
      window.dispatchEvent(new CustomEvent('vaa:settings-go-api'));
    };
    window.addEventListener('viabhron:nav-settings-api', handleNavApi);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('viabhron:nav-settings-api', handleNavApi);
    };
  }, [
    showCamera, showQRScanner, showVaaSettings, showContactList, 
    showWorkflowBuilder, showSwipeView, isAnyAppActive, selectedChat, view
  ]);

  // Utility to push state whenever a sub-view opens
  const pushNav = () => {
    window.history.pushState({ view: 'sub-view' }, '');
  };

  // Sync state pushing
  useEffect(() => {
    if (selectedChat || showSwipeView || isAnyAppActive || showVaaSettings || showCamera || showQRScanner || showContactList || showWorkflowBuilder) {
      pushNav();
    }
  }, [selectedChat, showSwipeView, isAnyAppActive, showVaaSettings, showCamera, showQRScanner, showContactList, showWorkflowBuilder]);
  // ---------------------------------------

  const handleTabClick = (tabId: "chats" | "news" | "workflow" | "loader") => {
    if (showContactList) setShowContactList(false);
    const realIndex = TABS.indexOf(tabId);
    const displayIndex = realIndex + 1;
    setActiveTab(tabId);
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: displayIndex * contentRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSwipe = (direction: number) => {
    const currentIndex = TABS.indexOf(activeTab);
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) nextIndex = TABS.length - 1;
    if (nextIndex >= TABS.length) nextIndex = 0;
    
    handleTabClick(TABS[nextIndex]);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Initial position: start at the first real tab (index 1)
    el.scrollLeft = el.clientWidth;

    let isTeleporting = false;

    const handleScroll = () => {
      if (isTeleporting) return;

      const scrollWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      
      // Instant update of activeTab for the bottom nav highlight
      const index = Math.round(scrollLeft / scrollWidth);
      
      // Determine the logical active tab based on scroll position
      let logicalIndex = index - 1;
      if (logicalIndex < 0) logicalIndex = TABS.length - 1;
      if (logicalIndex >= TABS.length) logicalIndex = 0;
      
      const newActiveTab = TABS[logicalIndex];
      
      setActiveTab(prev => {
        if (prev !== newActiveTab) return newActiveTab;
        return prev;
      });

      // Teleportation logic: Check if we've landed on a clone
      const isAtStartClone = scrollLeft <= 5;
      const isAtEndClone = scrollLeft >= (TABS.length + 1) * scrollWidth - 5;

      if (isAtStartClone || isAtEndClone) {
        isTeleporting = true;
        // Instant teleport without smooth behavior
        if (isAtStartClone) {
          el.scrollLeft = TABS.length * scrollWidth;
        } else if (isAtEndClone) {
          el.scrollLeft = scrollWidth;
        }
        
        // Small delay before re-enabling scroll logic to prevent feedback loops
        setTimeout(() => {
          isTeleporting = false;
        }, 50);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTabContent = (tabId: string) => {
    const filteredChats = chats.filter(chat => {
      const matchesFilter = activeChatFilter === "All" || chat.filterCategory === activeChatFilter;
      const matchesSearch = chat.name.toLowerCase().includes(chatSearchQuery.toLowerCase()) || 
                           chat.lastMessage.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
                           chat.messages.some(m => m.content.toLowerCase().includes(chatSearchQuery.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    });

    switch (tabId) {
      case "chats":
        return (
          <>
            <SearchAndFilters 
              filters={activeChatFilters} 
              activeFilter={activeChatFilter}
              onFilterChange={setActiveChatFilter}
              searchQuery={chatSearchQuery}
              onSearchChange={setChatSearchQuery}
            />
            <ChatList chats={filteredChats} onSelectChat={setSelectedChat} />
          </>
        );
      case "news":
        return (
          <NewsTab 
            onShowMenu={() => setShowNewsMenu(!showNewsMenu)} 
            showMenu={showNewsMenu}
            menuRef={newsMenuRef}
            onOpenFilter={() => setShowNewsFilterModal(true)}
            showSwipeView={showSwipeView}
            setShowSwipeView={setShowSwipeView}
            agents={agents}
            newsCards={newsCards}
            onCardTap={handleNewsCardTap}
            onOpenDiscovery={() => setShowDiscoveryHub(true)}
            channels={intelligenceChannels}
            pulses={intelligencePulses}
            newsIntakeMode={newsIntakeMode}
            isKernelActive={isKernelActive}
          />
        );
      case "workflow":
        return <WorkflowTab onOpenWorkflow={() => setView("workflow")} />;
      case "loader":
        return (
          <MossLoader 
            moss={allMoss} 
            agents={agents}
            onToggleMoss={onToggleMoss || (() => {})}
            onToggleFreeze={onToggleFreeze || (() => {})}
            onCloseApp={onCloseApp || (() => {})}
            onInstall={onOpenStore || (() => {})}
            onAppOpen={(id) => {
              setLastOpenedAppIdState(id);
              onAppOpen?.(id);
            }}
            uiMode="vaa"
            isFullscreen={isAppFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            onAppActiveChange={setIsAnyAppActive}
            headChat={headAgentChat}
            onSendMessage={handleSendMessage}
          />
        );
      default:
        return null;
    }
  };

  const handleSelectContact = (agent: Agent) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.nodeId === agent.id);
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      // Create a new chat thread
      const newChat: CelestialChat = {
        id: `chat-${Date.now()}`,
        nodeId: agent.id,
        name: agent.name,
        type: "agent",
        messages: [],
        updatedAt: Date.now(),
        lastMessage: "Mission initiated."
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChat(newChat);
    }
    setShowContactList(false);
    setShowPlusMenu(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedChat || !content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...selectedChat.messages, newMessage];
    const updatedChat = {
      ...selectedChat,
      messages: updatedMessages,
      lastMessage: content.trim(),
      updatedAt: Date.now()
    };

    setChats(prev => prev.map(c => c.id === selectedChat.id ? updatedChat : c));
    setSelectedChat(updatedChat);

    // Skip AI simulation for self-chats
    if (updatedChat.isSelf) return;

    if (updatedChat.isAiProvider && updatedChat.provider && updatedChat.model) {
      // Direct API Routing
      const responseId = `resp-${Date.now()}`;
      const placeholderResponse: Message = {
        id: responseId,
        role: "assistant",
        content: "Drafting response...",
        timestamp: new Date().toISOString(),
        status: "pending"
      };

      const chatWithPlaceholder = {
        ...updatedChat,
        messages: [...updatedMessages, placeholderResponse]
      };
      
      setChats(prev => prev.map(c => c.id === selectedChat.id ? chatWithPlaceholder : c));
      setSelectedChat(chatWithPlaceholder);

      try {
        const { streamAiResponse } = await import('../lib/aiService');
        await streamAiResponse(
          updatedChat.provider as any,
          updatedChat.model,
          updatedMessages.map(m => ({ role: m.role as any, content: m.content })),
          {
            onChunk: (text) => {
              setChats(prev => prev.map(c => {
                if (c.id === selectedChat.id) {
                  const msgs = [...c.messages];
                  const lastIdx = msgs.length - 1;
                  if (msgs[lastIdx].id === responseId) {
                    msgs[lastIdx] = { ...msgs[lastIdx], content: text, status: undefined };
                  }
                  return { ...c, messages: msgs, lastMessage: text };
                }
                return c;
              }));
              setSelectedChat(prev => {
                if (prev?.id === selectedChat.id) {
                  const msgs = [...prev.messages];
                  const lastIdx = msgs.length - 1;
                  if (msgs[lastIdx].id === responseId) {
                    msgs[lastIdx] = { ...msgs[lastIdx], content: text, status: undefined };
                  }
                  return { ...prev, messages: msgs, lastMessage: text };
                }
                return prev;
              });
            },
            onComplete: (fullText) => {
              // Final sync
              const finalMessage: Message = {
                id: responseId,
                role: "assistant",
                content: fullText,
                timestamp: new Date().toISOString()
              };
              setChats(prev => prev.map(c => {
                if (c.id === selectedChat.id) {
                  const msgs = c.messages.map(m => m.id === responseId ? finalMessage : m);
                  return { ...c, messages: msgs, lastMessage: fullText, updatedAt: Date.now() };
                }
                return c;
              }));
              // No need to set selected chat again, chunk handled it
            },
            onError: (err) => {
              const errorMessage: Message = {
                id: `err-${Date.now()}`,
                role: "system",
                content: `Protocol Breach: ${err}`,
                timestamp: new Date().toISOString(),
                interactiveOptions: [
                  { id: 'fix-key', label: 'Check API Keys', action: 'viabhron:nav-settings-api', type: 'primary' }
                ]
              };
              setChats(prev => prev.map(c => {
                if (c.id === selectedChat.id) {
                  const msgs = c.messages.filter(m => m.id !== responseId);
                  return { ...c, messages: [...msgs, errorMessage] };
                }
                return c;
              }));
              setSelectedChat(prev => {
                if (prev?.id === selectedChat.id) {
                  const msgs = prev.messages.filter(m => m.id !== responseId);
                  return { ...prev, messages: [...msgs, errorMessage] };
                }
                return prev;
              });
            }
          }
        );
      } catch (e: any) {
        toast.error(`Neural Link Failure: ${e.message}`);
      }
      return;
    }

    // Default simulation for standard agents
    setTimeout(() => {
      const response: Message = {
        id: `resp-${Date.now()}`,
        role: "assistant",
        content: `I have received your command: "${content.trim()}". Processing via Sovereign Kernel...`,
        timestamp: new Date().toISOString()
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, response],
        lastMessage: response.content,
        updatedAt: Date.now()
      };

      setChats(prev => prev.map(c => c.id === selectedChat.id ? finalChat : c));
      if (selectedChat?.id === finalChat.id) {
        setSelectedChat(finalChat);
      }
    }, 1500);
  };

  const handleSystemPurge = () => {
    // Clear all LocalStorage related to Viabhron
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('viabhron')) {
        localStorage.removeItem(key);
      }
    });

    // Force reload to trigger setup/onboarding
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden font-sans selection:bg-wa-header/10 pt-safe pb-safe">
      <Toaster position="top-center" richColors />
      
      <AnimatePresence>
        {showDiscoveryHub && (
          <DiscoveryHub 
            onClose={() => setShowDiscoveryHub(false)}
            hasGithub={hasGithubKey}
            hasHF={hasHFKey}
            onFollow={handleFollowChannel}
            followingIds={intelligenceChannels.filter(c => c.isFollowing).map(c => c.id)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === "workflow" ? (
          <motion.div 
            key="workflow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full flex flex-col"
          >
            <div className="bg-wa-header text-white p-4 flex items-center justify-between shadow-md z-50">
              <div className="flex items-center gap-3">
                <button onClick={() => setView("main")}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col">
                  <h2 className="font-bold uppercase tracking-widest text-sm">Workflow 1</h2>
                  <span className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em]">Workflow Lab</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  <Zap className="w-4 h-4 fill-white" />
                  Run
                </button>
                <button className="p-2.5 bg-white/10 rounded-xl">
                  <Database className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Canvas 
                tabId="celestial-workflow"
                initialData={workflowData}
                onUpdate={setWorkflowData}
              />
            </div>
          </motion.div>
        ) : showContactList ? (
          <motion.div
            key="contacts"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="h-full"
          >
            <ContactList 
              agents={agents} 
              extensions={extensions}
              secrets={secrets}
              onSelect={handleSelectContact} 
              onBack={() => setShowContactList(false)}
              onCreateAgent={(agent) => {
                onCreateAgent?.(agent);
                setShowContactList(false);
              }}
            />
          </motion.div>
        ) : !selectedChat ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            {!(isAppFullscreen && isAnyAppActive) && (
              <div className="bg-wa-header text-white p-5 flex flex-col gap-4 shadow-lg z-20">
                <div className="flex justify-between items-center">
                  <h1 
                    className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'));
                    }}
                  >
                    VhatsAppeningAi
                  </h1>
                  <div className="flex items-center gap-6 relative">
                    <QrCode 
                      className="w-6 h-6 text-white/90 cursor-pointer hover:text-white transition-colors" 
                      onClick={() => setShowQRScanner(true)}
                    />
                    <Camera 
                      className="w-6 h-6 text-white/90 cursor-pointer hover:text-white transition-colors" 
                      onClick={() => setShowCamera(true)}
                    />
                    <button onClick={() => setShowMenu(!showMenu)}>
                      <MoreVertical className="w-6 h-6 text-white/90" />
                    </button>

                    <AnimatePresence>
                      {showMenu && (
                        <motion.div 
                          ref={menuRef}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-10 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                        >
                          {[
                            { label: "Settings", icon: <Settings className="w-5 h-5" />, action: () => { setShowVaaSettings(true); setShowMenu(false); } },
                            { label: "Contacts", icon: <Users className="w-5 h-5" />, action: () => { setShowContactList(true); setShowMenu(false); } },
                            { label: "Backup/Restore", icon: <History className="w-5 h-5" />, action: () => setShowMenu(false) },
                            { label: "Logout", icon: <LogOut className="w-5 h-5" />, action: () => setShowMenu(false), color: "text-red-500" }
                          ].map((item, i) => (
                            <button 
                              key={item.label}
                              onClick={item.action}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors ${item.color || "text-slate-700"}`}
                            >
                              {item.icon}
                              <span className="text-sm font-bold">{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

      <div className="flex-1 flex flex-col overflow-hidden relative z-10 bg-white">
        <div 
          ref={contentRef}
          className={`flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full ${showSwipeView ? 'pointer-events-none' : ''}`}
        >
          {displayTabs.map((tabId, index) => (
            <div key={`${tabId}-${index}`} className="flex-shrink-0 w-full h-full snap-start snap-always flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                {renderTabContent(tabId)}
              </div>
            </div>
          ))}
        </div>

        {/* Global Sovereign Action Stack (Omega + FAB) */}
        {!isAnyAppActive && !isInputFocused && (
          <div className="absolute bottom-8 right-6 flex flex-col gap-4 items-center z-50 mb-safe mr-safe">
            <div className="relative">
              {/* Dynamic Aura */}
              <AnimatePresence>
                {omegaPressing === 'holding' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.3 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 bg-indigo-500 rounded-full blur-xl z-20"
                  />
                )}
                {omegaPressing === 'tapping' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.2 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 bg-slate-400 rounded-full blur-md z-20"
                  />
                )}
              </AnimatePresence>
              
              <button 
                onMouseDown={startOmegaPress}
                onMouseUp={endOmegaPress}
                onMouseLeave={() => {
                  if (pressTimer.current) {
                    clearTimeout(pressTimer.current);
                    pressTimer.current = null;
                  }
                  setOmegaPressing('none');
                }}
                onTouchStart={startOmegaPress}
                onTouchEnd={endOmegaPress}
                className={`w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-30 ring-4 ring-white relative ${
                  omegaPressing === 'holding' ? 'bg-indigo-600' : 'bg-wa-accent'
                }`}
              >
                <span className="text-2xl font-bold">Ω</span>
                {omegaPressing === 'none' && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">3</div>
                )}
              </button>
            </div>

            {!selectedChat && (
              <div className="relative">
                <AnimatePresence>
                  {showWorkflowSpeedDial && activeTab === 'workflow' && (
                    <div className="absolute bottom-20 right-0 flex flex-col gap-3 items-end z-[60]">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={() => {
                          setShowWorkflowBuilder(true);
                          setShowWorkflowSpeedDial(false);
                        }}
                        className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                      >
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Pipeline Builder</span>
                        <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ delay: 0.05 }}
                        onClick={() => {
                          setView("workflow");
                          setShowWorkflowSpeedDial(false);
                        }}
                        className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                      >
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Visual Lab</span>
                        <div className="w-10 h-10 bg-wa-header text-white rounded-xl flex items-center justify-center">
                          <WorkflowIcon className="w-5 h-5" />
                        </div>
                      </motion.button>
                    </div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => {
                    if (activeTab === 'chats') setShowPlusMenu(!showPlusMenu);
                    if (activeTab === 'news') setShowSwipeView(true);
                    if (activeTab === 'workflow') setShowWorkflowSpeedDial(!showWorkflowSpeedDial);
                    if (activeTab === 'loader' && lastOpenedAppIdState) {
                      const event = new CustomEvent('viabhron:open-moss', { detail: { id: lastOpenedAppIdState } });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="w-16 h-16 bg-indigo-500 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30"
                >
                  {activeTab === 'chats' && <Plus className={`w-8 h-8 transition-transform ${showPlusMenu ? 'rotate-45' : ''}`} />}
                  {activeTab === 'news' && <Sparkles className="w-8 h-8" />}
                  {activeTab === 'workflow' && <Plus className={`w-8 h-8 transition-transform ${showWorkflowSpeedDial ? 'rotate-45' : ''}`} />}
                  {activeTab === 'loader' && <Play className="w-8 h-8" />}
                </button>

                <AnimatePresence>
                  {showPlusMenu && activeTab === 'chats' && (
                    <motion.div
                      ref={plusMenuRef}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-20 right-0 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                    >
                      {[
                        { label: "Normal Chat", icon: <MessageCircle className="w-5 h-5" />, action: () => setShowContactList(true) },
                        { label: "Group Chat", icon: <Users className="w-5 h-5" />, action: () => setShowContactList(true) },
                        { label: "Debate (Parallel)", icon: <Layout className="w-5 h-5" />, action: () => setShowContactList(true) },
                        { label: "Debate (Interagent)", icon: <Zap className="w-5 h-5" />, action: () => setShowContactList(true) },
                      ].map((item) => (
                        <button 
                          key={item.label}
                          onClick={item.action}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700"
                        >
                          {item.icon}
                          <span className="text-sm font-bold">{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {!isAnyAppActive && !selectedChat && !isInputFocused && (
        <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40 pb-safe">
          {[
            { id: "chats", label: "CHATS", icon: <Sparkles className="w-7 h-7" /> },
            { id: "news", label: "NEWS", icon: <Globe className="w-7 h-7" /> },
            { id: "workflow", label: "WORKFLOW", icon: <WorkflowIcon className="w-7 h-7" /> },
            { id: "loader", label: "LOADER", icon: <Cpu className="w-7 h-7" /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id as any)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === tab.id ? "text-wa-header scale-110" : "text-slate-400"
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${activeTab === tab.id ? "bg-indigo-50" : "bg-transparent"}`}>
                {tab.icon}
              </div>
              <span className="text-[9px] font-black tracking-[0.15em]">{tab.label}</span>
            </button>
          ))}
        </div>
      )}
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full"
          >
            <ChatView 
              chat={selectedChat} 
              onBack={() => setSelectedChat(null)} 
              onShowMenu={() => setShowChatMenu(!showChatMenu)}
              onOpenCommandCenter={() => window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'))}
              onSendMessage={handleSendMessage}
              showMenu={showChatMenu}
              menuRef={chatMenuRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Vertical Intelligence Briefing (Full Screen Root Layer) */}
      <AnimatePresence>
        {showSwipeView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[500] flex flex-col pt-safe pb-safe"
          >
            <div 
              ref={swipeContainerRef}
              className="flex-1 overflow-y-auto snap-y snap-mandatory no-scrollbar flex flex-col h-full"
            >
              {newsCards.map(card => (
                <div key={card.id} className="h-full w-full flex-shrink-0 snap-start snap-always flex flex-col p-8 pt-20 relative bg-white">
                  <div className="max-w-xl mx-auto w-full flex-1 flex flex-col">
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                          <Zap className="w-4 h-4 fill-white" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{card.category}</span>
                      </div>
                      <h1 className="text-4xl font-black leading-tight uppercase tracking-tighter text-slate-900">{card.title}</h1>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span>{card.source}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span>{card.timestamp}</span>
                      </div>
                    </div>

                    <div className={`flex-1 overflow-y-auto no-scrollbar pb-32 ${showNewsDetails ? 'opacity-100' : 'opacity-90'}`}>
                      <p className="font-bold text-slate-800 text-xl leading-relaxed uppercase tracking-tight italic mb-8 border-l-4 border-indigo-500 pl-6">
                        "{card.summary}"
                      </p>
                      
                      {showNewsDetails && (
                        <div className="space-y-6 text-slate-600 leading-relaxed font-sans pb-10">
                          {card.fullContent.split('. ').map((p, i) => (
                            <p key={i} className="text-base">{p}.</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Bar for Swipe View */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6">
                    <div className="max-w-xl mx-auto flex gap-4">
                      <button 
                        onClick={() => {
                          import('sonner').then(({ toast }) => toast.success("Intel priority registered by Viabhron"));
                        }}
                        className="flex-1 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1 group active:bg-slate-100 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Save</span>
                      </button>
                      <button 
                        onClick={() => setShowAgentShare(true)}
                        className="flex-1 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1 group active:bg-slate-100 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Share</span>
                      </button>
                      <button 
                        onClick={() => setShowNewsDetails(!showNewsDetails)}
                        className={`flex-1 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border ${
                          showNewsDetails ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${showNewsDetails ? 'rotate-180' : ''}`} />
                        <span className={`text-[8px] font-black uppercase tracking-widest ${showNewsDetails ? 'text-white' : 'text-slate-400'}`}>
                          {showNewsDetails ? 'Brief' : 'Details'}
                        </span>
                      </button>
                      <button 
                        onClick={() => setShowSwipeView(false)}
                        className="flex-1 h-14 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Close</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Share Popup */}
            <AnimatePresence>
              {showAgentShare && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[510] flex items-end"
                  onClick={() => setShowAgentShare(false)}
                >
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    className="w-full bg-white rounded-t-[3rem] p-8 pb-12 max-h-[80vh] flex flex-col"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Share Intelligence</h3>
                      <button onClick={() => setShowAgentShare(false)} className="p-2 bg-slate-100 rounded-full">
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-4">
                      {agents.map(agent => (
                        <button
                          key={agent.id}
                          onClick={() => {
                            import('sonner').then(({ toast }) => toast.success(`Briefing dispatched to ${agent.name}`));
                            setShowAgentShare(false);
                          }}
                          className="flex flex-col items-center p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-slate-100 transition-colors gap-3"
                        >
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 border border-slate-100">
                            {agent.name.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{agent.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      {/* News Filter Modal */}
      <AnimatePresence>
        {showNewsFilterModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">Intelligence Filter</h2>
                <button onClick={() => setShowNewsFilterModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-6 h-6 rotate-90" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Set your "Editorial Mandate." The Resident AI will prioritize news based on this prompt.
              </p>
              <div className="space-y-4">
                <textarea 
                  value={newsFilter}
                  onChange={(e) => setNewsFilter(e.target.value)}
                  placeholder="e.g. Prioritize news on AI security vulnerabilities and Ethereum gas price spikes."
                  className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm focus:ring-2 focus:ring-wa-header/20 outline-none resize-none"
                />
                <button 
                  onClick={() => {
                    import('sonner').then(({ toast }) => toast.success("Intelligence filter updated"));
                    setShowNewsFilterModal(false);
                  }}
                  className="w-full py-4 bg-wa-header text-white rounded-2xl font-bold shadow-lg shadow-wa-header/20 uppercase tracking-widest text-xs"
                >
                  Apply Mandate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sovereign Check (Task Manager) */}
      <AnimatePresence>
        {showSovereignCheck && <SovereignCheck onClose={() => setShowSovereignCheck(false)} />}
      </AnimatePresence>

      {/* Workflow Builder */}
      <AnimatePresence>
        {showWorkflowBuilder && (
          <div className="fixed inset-0 z-[600] pt-safe pb-safe">
            <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Vaa Settings */}
      <AnimatePresence>
        {showVaaSettings && (
          <VaaSettings 
            onClose={() => setShowVaaSettings(false)} 
            availableFilters={availableChatFilters}
            activeFilters={activeChatFilters}
            onToggleFilter={(filter) => {
              setActiveChatFilters(prev => 
                prev.includes(filter) 
                   ? prev.filter(f => f !== filter) 
                   : [...prev, filter]
              );
            }}
            onReorderFilters={setAvailableChatFilters}
            secrets={secrets}
            onAddSecret={onAddSecret!}
            onDeleteSecret={onDeleteSecret!}
            onUpdateSecret={onUpdateSecret!}
            onSystemPurge={handleSystemPurge}
            isNative={isNative}
            canInstallPwa={!!deferredPrompt}
            onInstallPwa={handlePwaInstall}
            newsIntakeMode={newsIntakeMode}
            onSetNewsIntakeMode={setNewsIntakeMode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCamera && (
          <CameraCapture 
            onClose={() => setShowCamera(false)}
            agents={agents}
            onSend={(agentId, image) => {
              const agent = agents.find(a => a.id === agentId);
              import('sonner').then(({ toast }) => toast.success(`Image sent to ${agent?.name || 'Agent'}`));
              setShowCamera(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQRScanner && (
          <QRScanner 
            onClose={() => setShowQRScanner(false)}
            onScan={(data) => {
              import('sonner').then(({ toast }) => toast.info(`QR Scanned: ${data}`));
              setShowQRScanner(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
