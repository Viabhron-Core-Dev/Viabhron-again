import { 
  Terminal as TerminalIcon, 
  Activity, 
  Cpu, 
  Shield, 
  Zap, 
  Command, 
  Eye, 
  Palette, 
  Share2, 
  Music, 
  Image, 
  Video, 
  Box,
  Layers,
  Lock,
  Radar,
  List,
  Activity as Pulse,
  MessageSquare,
  Network,
  Database,
  RefreshCw,
  Bus,
  Send,
  Brain,
  Scale,
  Globe,
  Zap as Vibe,
  Coffee,
  Briefcase,
  Volume2,
  Cloud,
  ShieldAlert,
  ShieldCheck,
  Atom,
  Wand2,
  Workflow,
  GraduationCap
} from 'lucide-react';
import { Extension } from '@/core/kernel/types';
import { MetabolicSecretary } from '@/landscape/modules/MetabolicSecretary';
import { WorkspaceControl } from '@/landscape/modules/WorkspaceControl';
import { AmbientSounderControl } from '@/landscape/modules/AmbientSounderControl';
import { CloudflareControl } from '@/landscape/modules/CloudflareControl';
import { ArchitectureAwareControl } from '@/landscape/modules/ArchitectureAwareControl';
import { SocialSandboxControl } from '@/landscape/modules/SocialSandboxControl';
import { QuantumControl } from '@/landscape/modules/QuantumControl';
import { AgentForgeControl } from '@/landscape/modules/AgentForgeControl';
import { FrameworkAdapterControl } from '@/landscape/modules/FrameworkAdapterControl';
import { PaymentShieldControl } from '@/landscape/modules/PaymentShieldControl';
import { ThreatIntelControl } from '@/landscape/modules/ThreatIntelControl';
import { PulseFeedControl } from '@/landscape/modules/PulseFeedControl';
import { AcademyBridgeControl } from '@/landscape/modules/AcademyBridgeControl';
import { InteractionSubstrateControl } from '@/landscape/modules/InteractionSubstrateControl';

// New imports for missing modules
import { Forge } from '@/landscape/modules/Forge';
import { Nexus } from '@/landscape/modules/Nexus';
import { Creative } from '@/landscape/modules/Creative';
import { Artifacts } from '@/landscape/modules/Artifacts';
import { SystemMetrics } from '@/landscape/modules/SystemMetrics';
import { AgentCLI } from '@/landscape/modules/AgentCLI';
import { Governance } from '@/landscape/modules/Governance';
import { Symphony } from '@/landscape/modules/Symphony';
import { Simulation } from '@/landscape/modules/Simulation';
import { Sentinel } from '@/landscape/modules/Sentinel';
import { Terminal } from '@/landscape/modules/Terminal';

export const agentTerminalModule: Extension = {
  id: 'terminal',
  name: 'Agent Terminal',
  description: 'Secure shell execution and system command interface.',
  icon: TerminalIcon,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const systemMetricsModule: Extension = {
  id: 'metrics',
  name: 'System Metrics',
  description: 'Real-time telemetry and resource monitoring.',
  icon: Activity,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const simulationEngineModule: Extension = {
  id: 'simulation',
  name: 'Simulation Engine',
  description: 'Multi-agent scenario testing and digital twin simulations.',
  icon: Cpu,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const governanceToolkitModule: Extension = {
  id: 'governance',
  name: 'Governance Toolkit',
  description: 'Management of system policies, SOPs, and ratifications.',
  icon: Shield,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const vibeForgeModule: Extension = {
  id: 'forge',
  name: 'Vibe Forge',
  description: 'Autonomous implementation and code generation sandbox.',
  icon: Zap,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const agentCliModule: Extension = {
  id: 'agent-cli',
  name: 'Agent CLI',
  description: 'Command-line interface for direct agent interaction.',
  icon: Command,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sentinelGuardianModule: Extension = {
  id: 'sentinel',
  name: 'Sentinel Guardian',
  description: 'Real-time threat detection and security auditing.',
  icon: Eye,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignCreativeStudioModule: Extension = {
  id: 'creative',
  name: 'Creative Studio',
  description: 'Visual orchestration and multi-step creative workflows.',
  icon: Palette,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const viabhronNexusModule: Extension = {
  id: 'nexus',
  name: 'Viabhron Nexus',
  description: 'Relational knowledge graph and persistent OS memory.',
  icon: Share2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const symphonyModule: Extension = {
  id: 'symphony',
  name: 'Symphony Orchestration',
  description: 'Autonomous project implementation and workflow management.',
  icon: Layers,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const soundForgeModule: Extension = {
  id: 'sound-forge',
  name: 'Sound Forge',
  description: 'Audio synthesis and music theory arrangement.',
  icon: Music,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const imageStudioModule: Extension = {
  id: 'image-studio',
  name: 'Image Studio',
  description: 'Advanced image analysis and visual reasoning.',
  icon: Image,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const videoSuiteModule: Extension = {
  id: 'video-suite',
  name: 'Video Suite',
  description: 'Video processing and motion synthesis.',
  icon: Video,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const mossSystemModule: Extension = {
  id: 'moss',
  name: 'MOSS System',
  description: 'Modular Operating Substrate System for edge deployment.',
  icon: Box,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

// Additional modules from the new hierarchy
export const identity8004Module: Extension = {
  id: 'identity-8004',
  name: 'Sovereign Identity & 8004',
  description: 'Management of the 8004 Sovereign Identity Protocol.',
  icon: Lock,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const securityRadarModule: Extension = {
  id: 'security-radar',
  name: 'Global Security Radar',
  description: 'Real-time monitoring of global security threats and anomalies.',
  icon: Radar,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const agentRegistryModule: Extension = {
  id: 'agent-registry',
  name: 'Governed Agent Catalog',
  description: 'Registry of all accredited agents and their capabilities.',
  icon: List,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const smonitorProtocolModule: Extension = {
  id: 'smonitor-protocol',
  name: 'Sovereign Monitor Protocol (SMP)',
  description: 'Distributed telemetry and pulse-checking substrate.',
  icon: Pulse,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const linguisticBridgeModule: Extension = {
  id: 'linguistic-bridge',
  name: 'Linguistic Bridge',
  description: 'Cross-model semantic mapping and prompt hardening.',
  icon: MessageSquare,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const memoryPalaceModule: Extension = {
  id: 'memory-palace',
  name: 'Sovereign Memory Palace',
  description: 'Persistent relational knowledge graph and OS memory.',
  icon: Database,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const verificationLoopModule: Extension = {
  id: 'svl',
  name: 'Sovereign Verification Loop (SVL)',
  description: 'Automated validation and fact-checking of agent outputs.',
  icon: RefreshCw,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const eventBusModule: Extension = {
  id: 'seb',
  name: 'Sovereign Event Bus (SEB)',
  description: 'High-speed asynchronous communication layer for agents.',
  icon: Bus,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const dispatchModule: Extension = {
  id: 'sd',
  name: 'Sovereign Dispatch (SD)',
  description: 'Mission routing and task allocation engine.',
  icon: Send,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const deepExecutionModule: Extension = {
  id: 'deep-execution',
  name: 'Deep Execution Substrate',
  description: 'Low-level compute optimization for complex reasoning.',
  icon: Brain,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const ethicalSentinelModule: Extension = {
  id: 'ethical-sentinel',
  name: 'Ethical Sentinel',
  description: 'Alignment auditing and safety-by-design enforcement.',
  icon: Scale,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const webReconShieldModule: Extension = {
  id: 'web-recon-shield',
  name: 'Web Reconnaissance Shield',
  description: 'Secure browsing and information gathering substrate.',
  icon: Globe,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const vibeAssemblyModule: Extension = {
  id: 'vibe-assembly',
  name: 'Vibe-Assembly',
  description: 'Artisanal UI generation and style synthesis.',
  icon: Vibe,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const metabolicSecretaryModule: Extension = {
  id: 'metabolic-secretary',
  name: 'Metabolic Secretary',
  description: 'Autonomous background monitoring and resonance filtering.',
  icon: Coffee,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const workspaceBridgeModule: Extension = {
  id: 'workspace-bridge',
  name: 'Workspace Bridge',
  description: 'Deep integration with Email and Calendar services.',
  icon: Briefcase,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const ambientSounderModule: Extension = {
  id: 'ambient-sounder',
  name: 'Ambient Sounder',
  description: 'Natural Text-to-Speech engine for eyes-free interaction.',
  icon: Volume2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const cloudflareBridgeModule: Extension = {
  id: 'cloudflare-cf-bridge',
  name: 'Cloudflare Sovereign Bridge',
  description: 'Agent-first orchestration of global edge infrastructure.',
  icon: Cloud,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const architectureAwareSchedulerModule: Extension = {
  id: 'architecture-aware-scheduler',
  name: 'Architecture-Aware Scheduler',
  description: 'Optimal task routing across the Vine Mesh based on hardware profile.',
  icon: Cpu,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignSocialSandboxModule: Extension = {
  id: 'sovereign-social-sandbox',
  name: 'Sovereign Social Sandbox',
  description: 'Sandboxed social interaction via Sovereign URIs.',
  icon: ShieldAlert,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const quantumBridgeModule: Extension = {
  id: 'quantum-ops-bridge',
  name: 'Quantum Bridge',
  description: 'Orchestration of external QaaS and local quantum simulation.',
  icon: Atom,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignAgentForgeModule: Extension = {
  id: 'sovereign-agent-forge',
  name: 'Sovereign Agent Forge',
  description: 'Plain-English synthesis of custom agents.',
  icon: Wand2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const frameworkAdapterBridgeModule: Extension = {
  id: 'framework-adapter-bridge',
  name: 'Framework Adapter Bridge',
  description: 'Translation and execution of external AI framework logic.',
  icon: Workflow,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignPaymentShieldModule: Extension = {
  id: 'sovereign-payment-shield',
  name: 'Sovereign Payment Shield',
  description: 'Enforcement of BIS/RBI security standards for payments.',
  icon: ShieldCheck,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignThreatIntelModule: Extension = {
  id: 'sovereign-threat-intel',
  name: 'Sovereign Threat Intelligence Bridge',
  description: 'Real-time ingestion of MITRE ATT&CK and ATLAS threat data.',
  icon: Radar,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignPulseFeedModule: Extension = {
  id: 'sovereign-pulse-feed',
  name: 'Sovereign Pulse Feed',
  description: 'Unified intelligence synthesis for personal and security data.',
  icon: Zap,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignAcademyBridgeModule: Extension = {
  id: 'sovereign-academy-bridge',
  name: 'Sovereign Academy Bridge',
  description: 'Private, agent-led educational environment for competitive exams.',
  icon: GraduationCap,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignInteractionSubstrateModule: Extension = {
  id: 'sovereign-interaction-substrate',
  name: 'Sovereign Interaction Substrate',
  description: 'Modular, scriptable kernels for games and apps.',
  icon: Layers,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export {
  MetabolicSecretary,
  WorkspaceControl,
  AmbientSounderControl,
  CloudflareControl,
  ArchitectureAwareControl,
  SocialSandboxControl,
  QuantumControl,
  AgentForgeControl,
  FrameworkAdapterControl,
  PaymentShieldControl,
  ThreatIntelControl,
  PulseFeedControl,
  AcademyBridgeControl,
  InteractionSubstrateControl,
  Forge,
  Nexus,
  Creative,
  Artifacts,
  SystemMetrics,
  AgentCLI,
  Governance,
  Symphony,
  Simulation,
  Sentinel,
  Terminal
};

export const extensionModules = [
  {
    id: 'metabolic-secretary',
    name: 'Metabolic Secretary',
    component: MetabolicSecretary,
    icon: Coffee
  },
  {
    id: 'workspace-bridge',
    name: 'Workspace Control',
    component: WorkspaceControl,
    icon: Briefcase
  },
  {
    id: 'ambient-sounder',
    name: 'Ambient Sounder',
    component: AmbientSounderControl,
    icon: Volume2
  },
  {
    id: 'cloudflare-cf-bridge',
    name: 'Cloudflare Control',
    component: CloudflareControl,
    icon: Cloud
  },
  {
    id: 'architecture-aware-scheduler',
    name: 'Architecture Scheduler',
    component: ArchitectureAwareControl,
    icon: Cpu
  },
  {
    id: 'sovereign-social-sandbox',
    name: 'Social Sandbox',
    component: SocialSandboxControl,
    icon: ShieldAlert
  },
  {
    id: 'quantum-ops-bridge',
    name: 'Quantum Bridge',
    component: QuantumControl,
    icon: Atom
  },
  {
    id: 'sovereign-agent-forge',
    name: 'Agent Forge',
    component: AgentForgeControl,
    icon: Wand2
  },
  {
    id: 'framework-adapter-bridge',
    name: 'Framework Bridge',
    component: FrameworkAdapterControl,
    icon: Workflow
  },
  {
    id: 'sovereign-payment-shield',
    name: 'Payment Shield',
    component: PaymentShieldControl,
    icon: ShieldCheck
  },
  {
    id: 'sovereign-threat-intel',
    name: 'Threat Intel Bridge',
    component: ThreatIntelControl,
    icon: Radar
  },
  {
    id: 'sovereign-pulse-feed',
    name: 'Pulse Feed',
    component: PulseFeedControl,
    icon: Zap
  },
  {
    id: 'sovereign-academy-bridge',
    name: 'Academy Bridge',
    component: AcademyBridgeControl,
    icon: GraduationCap
  },
  {
    id: 'sovereign-interaction-substrate',
    name: 'Interaction Substrate',
    component: InteractionSubstrateControl,
    icon: Layers
  }
];
