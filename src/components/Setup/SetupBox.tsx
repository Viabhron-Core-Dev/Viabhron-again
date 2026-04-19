import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Key, 
  Brain, 
  Cloud, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Zap,
  Server,
  Database,
  Loader2,
  Search,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { infra } from '../../lib/infraManager';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth as firebaseAuth } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface SetupBoxProps {
  onComplete: (config: any) => void;
}

interface Project {
  projectId: string;
  name: string;
}

export const SetupBox: React.FC<SetupBoxProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'identity' | 'discovery' | 'brain' | 'fuel' | 'ignition' | 'join'>('welcome');
  const [geminiKey, setGeminiKey] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [focus, setFocus] = useState('General Management');
  const [brainType, setBrainType] = useState('gemma-2b');
  const [isProvisioning, setIsProvisioning] = useState(false);
  
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provisioningStatus, setProvisioningStatus] = useState<string>('Initializing...');
  const [accreditationKey, setAccreditationKey] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/cloud-platform');
      provider.addScope('https://www.googleapis.com/auth/firebase');
      
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      if (token) {
        setAccessToken(token);
        setStep('discovery');
        loadProjects(token);
      }
    } catch (err) {
      setError('Failed to authenticate with Google. Please try again.');
    }
  };

  const loadProjects = async (token: string) => {
    try {
      setLoadingProjects(true);
      const fetchedProjects = await infra.fetchUserProjects(token);
      setProjects(fetchedProjects);
    } catch (err) {
      setError('Failed to fetch Google Cloud projects.');
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleIgnition = async () => {
    if (!selectedProjectId || !accessToken) return;
    
    setIsProvisioning(true);
    setError(null);
    
    try {
      setProvisioningStatus('Fetching Project Configuration...');
      const config = await infra.getProjectConfig(selectedProjectId);
      
      setProvisioningStatus('Provisioning Substrate...');
      await new Promise(r => setTimeout(r, 1000));
      setProvisioningStatus('Enabling Cloud Run & Firestore APIs...');
      await new Promise(r => setTimeout(r, 1500));
      
      const provisionResult = await infra.provisionTripleService(selectedProjectId, brainType);
      
      setProvisioningStatus('Establishing Database Connection...');
      const userDb = await infra.connectToUserBackend(config);
      
      if (!userDb) throw new Error("Failed to establish database connection.");

      setProvisioningStatus('Awakening Sentinel & Cloud Manager...');
      const userId = firebaseAuth.currentUser?.uid;
      if (userId) {
        // Initialize Sovereign Identity
        await setDoc(doc(userDb, 'users', userId, 'settings', 'identity'), {
          officeName: officeName || selectedProjectId,
          focus,
          provisionedAt: new Date().toISOString(),
          status: 'active',
          role: 'Chairman'
        });

        // Recruit Initial Agents
        const initialAgents = [
          {
            id: 'cloud-manager',
            name: 'Cloud Manager',
            role: 'head',
            provider: 'resident',
            model: brainType,
            status: 'active',
            isResident: true,
            isStaff: true,
            color: '#34d399',
            description: 'Root authority and strategic orchestrator.'
          },
          {
            id: 'sentinel',
            name: 'Sentinel',
            role: 'executive',
            provider: 'local',
            model: 'rules-v1',
            status: 'active',
            isResident: true,
            isStaff: true,
            color: '#f87171',
            description: 'System security and rule enforcement.'
          }
        ];

        for (const agent of initialAgents) {
          await setDoc(doc(userDb, 'users', userId, 'agents', agent.id), agent);
        }
      }

      setProvisioningStatus('Ratification Complete.');
      setTimeout(() => {
        onComplete({ ...config, officeName, brainType, projectId: selectedProjectId });
      }, 1000);
    } catch (err) {
      setIsProvisioning(false);
      setError(err instanceof Error ? err.message : 'Failed to provision infrastructure.');
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="relative h-2 bg-zinc-800">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-emerald-500"
            animate={{ 
              width: 
                step === 'welcome' ? '15%' : 
                step === 'identity' ? '30%' : 
                step === 'discovery' ? '45%' : 
                step === 'brain' ? '60%' : 
                step === 'fuel' ? '80%' : '100%' 
            }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Shield size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-white">Viabhron MVK</h1>
                  <p className="text-zinc-400">Establish your private agent-centric operating system. All control, no compromise.</p>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => setStep('identity')}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                  >
                    Ignite OS Substrate
                    <Zap size={20} className="transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'identity' && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Cloud size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Sovereign Identity</h2>
                  <p className="text-zinc-400 font-medium">Connect your Google Cloud project to host your agents.</p>
                </div>
                
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </button>
              </motion.div>
            )}

            {step === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">Cloud Discovery</h2>
                  <p className="text-zinc-400 text-sm">Select target project for MVK deployment.</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 no-scrollbar">
                  {loadingProjects ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <button
                        key={project.projectId}
                        onClick={() => setSelectedProjectId(project.projectId)}
                        className={`
                          w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                          ${selectedProjectId === project.projectId 
                            ? 'bg-emerald-600/20 border-emerald-500' 
                            : 'bg-zinc-950 border-white/5 hover:border-white/20'}
                        `}
                      >
                        <Database size={20} className="text-zinc-500" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{project.name}</div>
                          <div className="text-xs text-zinc-500 font-mono truncate">{project.projectId}</div>
                        </div>
                        {selectedProjectId === project.projectId && <CheckCircle2 className="text-emerald-500" size={20} />}
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-500 text-sm">
                      No projects found.
                    </div>
                  )}
                </div>

                <button
                  disabled={!selectedProjectId}
                  onClick={() => setStep('brain')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50"
                >
                  Next: Select Resident Brain
                </button>
              </motion.div>
            )}

            {step === 'brain' && (
              <motion.div
                key="brain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">The Resident Brain</h2>
                  <p className="text-zinc-400">Select the model architecture for your Cloud Manager agent.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'gemma-2b', name: 'Gemma 2B', desc: 'Secure/Light', icon: <Shield size={20} /> },
                    { id: 'phi-3', name: 'Phi-3 Mini', desc: 'Precise/Logical', icon: <Cpu size={20} /> },
                    { id: 'llama-3', name: 'Llama 3 8B', desc: 'Powerful/General', icon: <Brain size={20} /> },
                    { id: 'mistral-7b', name: 'Mistral 7B', desc: 'Fast/Balanced', icon: <Zap size={20} /> }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrainType(b.id)}
                      className={`flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
                        brainType === b.id 
                          ? 'border-emerald-500 bg-emerald-500/10 text-white' 
                          : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${brainType === b.id ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                        {b.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{b.name}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{b.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep('ignition')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-500"
                >
                  Final Ignition
                </button>
              </motion.div>
            )}

            {step === 'ignition' && (
              <motion.div
                key="ignition"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center"
              >
                {!isProvisioning ? (
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                      <Zap size={40} className="fill-current" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">System Ready</h2>
                      <p className="text-zinc-400">All systems green. Deployment to <strong>{selectedProjectId}</strong> will begin now.</p>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-left">
                        {error}
                      </div>
                    )}

                    <div className="rounded-xl bg-zinc-950 p-6 text-left text-[10px] text-zinc-500 font-mono uppercase tracking-widest space-y-1">
                      <p>• PROVIDER: GOOGLE CLOUD</p>
                      <p>• SOUL CORE: FIRESTORE</p>
                      <p>• RESIDENT: OLLAMA CONTEXT</p>
                    </div>

                    <button
                      onClick={handleIgnition}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition-all hover:bg-emerald-400"
                    >
                      Initialize Sovereign Kernel
                    </button>
                  </>
                ) : (
                  <div className="space-y-8 py-12">
                    <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto" />
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Hatching OS...</h2>
                      <p className="text-zinc-400 italic text-sm">"{provisioningStatus}"</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
