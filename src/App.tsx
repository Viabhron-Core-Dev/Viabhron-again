import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from './hooks/useAuth';
import { SetupBox } from './components/Setup/SetupBox';
import { Onboarding } from './components/Setup/Onboarding';
import { VaaClient } from './vaa/VaaClient';
import { db } from './lib/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { Agent, Moss, Secret, Extension } from './types';

// Expert Shell Integration
import { SovereignShell } from '../workstation-pkg/SovereignShell';
import { useTabs } from '../workstation-pkg/hooks/useTabs';
import { Tab } from '../workstation-pkg/types';
import { ChatView } from './vaa/components/ChatView';
import { Canvas } from './landscape/modules/Canvas';
import { VaaSettings } from './vaa/components/VaaSettings';
import { MossLoader } from './moss/MossLoader';

export default function App() {
  const { user, isAuthReady } = useAuth();
  const [isProvisioned, setIsProvisioned] = useState<boolean>(() => {
    if (import.meta.env.DEV) return true;
    return localStorage.getItem('viabhron_provisioned') === 'true';
  });
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    if (import.meta.env.DEV) return true;
    return localStorage.getItem('viabhron_onboarding_completed') === 'true';
  });

  const [uiMode, setUiMode] = useState<'vaa' | 'expert'>(() => {
    return (localStorage.getItem('viabhron:ui-mode') as 'vaa' | 'expert') || 'vaa';
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const [moss, setMoss] = useState<Moss[]>([]);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);

  // Deep Shell Logic
  const { 
    tabs, 
    activeTabId, 
    setActiveTabId, 
    handleAddTab, 
    handleCloseTab, 
    handleWakeTab, 
    handleShelveTab 
  } = useTabs(user, extensions);

  useEffect(() => {
    const handleToggle = () => {
      setUiMode(prev => {
        const next = prev === 'vaa' ? 'expert' : 'vaa';
        localStorage.setItem('viabhron:ui-mode', next);
        return next;
      });
    };

    window.addEventListener('viabhron:toggle-ui', handleToggle);

    const handlePopState = (event: PopStateEvent) => {
      if (uiMode === 'expert') {
        if (activeTabId) {
          setActiveTabId(null);
          // Prevent standard back navigation if we just closed a tab
          event.preventDefault();
          window.history.pushState(null, '');
        } else {
          setUiMode('vaa');
          localStorage.setItem('viabhron:ui-mode', 'vaa');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('viabhron:toggle-ui', handleToggle);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [uiMode, activeTabId]);

  useEffect(() => {
    if (uiMode === 'expert') {
      window.history.pushState({ mode: 'expert' }, '');
    }
  }, [uiMode, activeTabId]);

  useEffect(() => {
    if (!user || !db) return;

    // Listen to agents
    const agentsRef = collection(db, 'users', user.uid, 'agents');
    const unsubscribeAgents = onSnapshot(agentsRef, (snap) => {
      const fetchedAgents = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Agent));
      setAgents(prev => JSON.stringify(prev) === JSON.stringify(fetchedAgents) ? prev : fetchedAgents);
    });

    // Listen to secrets
    const secretsRef = collection(db, 'users', user.uid, 'secrets');
    const unsubscribeSecrets = onSnapshot(secretsRef, (snap) => {
      const fetchedSecrets = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Secret));
      setSecrets(prev => JSON.stringify(prev) === JSON.stringify(fetchedSecrets) ? prev : fetchedSecrets);
    });

    // Listen to moss (apps)
    const mossRef = collection(db, 'users', user.uid, 'moss');
    const unsubscribeMoss = onSnapshot(mossRef, (snap) => {
      const fetchedMoss = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Moss));
      setMoss(prev => JSON.stringify(prev) === JSON.stringify(fetchedMoss) ? prev : fetchedMoss);
    });

    return () => {
      unsubscribeAgents();
      unsubscribeSecrets();
      unsubscribeMoss();
    };
  }, [user]);

  const handleSetupComplete = () => {
    setIsProvisioned(true);
    localStorage.setItem('viabhron_provisioned', 'true');
    window.location.reload();
  };

  const handleOnboardingComplete = () => {
    setOnboardingCompleted(true);
    localStorage.setItem('viabhron_onboarding_completed', 'true');
  };

  // --- Expert Module Renderer ---
  const renderExpertModule = (tab: Tab) => {
    switch (tab.type) {
      case 'chat': {
        const chatAgent = agents.find(a => a.id === tab.agentId) || agents.find(a => a.isResident);
        if (!chatAgent) return <div className="p-8 text-white/50">Initializing Agent...</div>;
        
        // Construct a chat object for ChatView
        const dummyChat = {
          id: tab.id,
          name: chatAgent.name,
          type: 'agent' as const,
          messages: [], // In a real app, this would be fetched from a subcollection
          updatedAt: Date.now(),
          isHeadAgent: chatAgent.role === 'head'
        };

        return (
          <div className="h-full bg-white text-black overflow-hidden rounded-xl">
             <ChatView 
               chat={dummyChat as any}
               onBack={() => setActiveTabId(null)}
               onShowMenu={() => {}}
               onOpenCommandCenter={() => {}}
               onSendMessage={() => {}}
               showMenu={false}
               menuRef={{ current: null } as any}
             />
          </div>
        );
      }
      case 'canvas':
        return (
          <div className="h-full relative bg-[#0a0a0c]">
            <Canvas 
              tabId={tab.id}
              initialData={tab.canvasData || { nodes: [], edges: [] }}
              onUpdate={(data) => {
                 // Update tab data in background if needed
              }}
            />
          </div>
        );
      case 'loader':
      case 'moss_system':
        return (
          <div className="h-full bg-white text-black rounded-xl overflow-hidden">
            <MossLoader 
              moss={moss}
              agents={agents}
              onToggleMoss={() => {}}
              onToggleFreeze={() => {}}
              onCloseApp={() => {}}
              onInstall={() => {}}
              onAppOpen={() => {}}
              uiMode="expert"
            />
          </div>
        );
      case 'settings':
        return (
          <div className="h-full bg-white text-black rounded-xl overflow-hidden">
            <VaaSettings 
              onClose={() => setActiveTabId(null)}
              availableFilters={['All', 'Semi Local', 'Cloudflare']}
              activeFilters={['All']}
              onToggleFilter={() => {}}
              onReorderFilters={() => {}}
              secrets={secrets}
              onAddSecret={() => {}}
              onDeleteSecret={() => {}}
              onUpdateSecret={() => {}}
            />
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center text-white/20 font-mono text-sm uppercase tracking-[0.3em]">
            Module Interface Under Construction: {tab.type}
          </div>
        );
    }
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen w-screen bg-wa-dark flex items-center justify-center">
        <div className="animate-pulse text-emerald-500 font-mono tracking-widest text-xs uppercase">
          Initializing Kernel...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-wa-dark overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {!isProvisioned ? (
          <SetupBox key="setup" onComplete={handleSetupComplete} />
        ) : !onboardingCompleted ? (
          <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
        ) : uiMode === 'expert' ? (
          <motion.div
            key="expert"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 h-full"
          >
            <SovereignShell 
              tabs={tabs}
              activeTabId={activeTabId}
              onTabSelect={id => {
                if (!id) setActiveTabId(null);
                else handleWakeTab(id);
              }}
              onAddTab={handleAddTab}
              onCloseTab={handleCloseTab}
              onMinimizeTab={handleShelveTab}
              renderModule={renderExpertModule}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="vaa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 h-full"
          >
            <VaaClient 
              agents={agents} 
              moss={moss} 
              secrets={secrets} 
              extensions={extensions}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
