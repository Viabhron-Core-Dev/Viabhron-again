import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from './hooks/useAuth';
import { SetupBox } from './components/Setup/SetupBox';
import { Onboarding } from './components/Setup/Onboarding';
import { VaaClient } from './vaa/VaaClient';
import { db, auth } from './lib/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { Agent, Moss, Secret, Extension } from './types';

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
  const [agents, setAgents] = useState<Agent[]>([]);
  const [moss, setMoss] = useState<Moss[]>([]);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    if (!user || !db) return;

    // Listen to agents
    const agentsRef = collection(db, 'users', user.uid, 'agents');
    const unsubscribeAgents = onSnapshot(agentsRef, (snap) => {
      const fetchedAgents = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Agent));
      setAgents(fetchedAgents);
    });

    // Listen to secrets
    const secretsRef = collection(db, 'users', user.uid, 'secrets');
    const unsubscribeSecrets = onSnapshot(secretsRef, (snap) => {
      const fetchedSecrets = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Secret));
      setSecrets(fetchedSecrets);
    });

    // Listen to moss (apps)
    const mossRef = collection(db, 'users', user.uid, 'moss');
    const unsubscribeMoss = onSnapshot(mossRef, (snap) => {
      const fetchedMoss = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Moss));
      setMoss(fetchedMoss);
    });

    return () => {
      unsubscribeAgents();
      unsubscribeSecrets();
      unsubscribeMoss();
    };
  }, [user]);

  const handleSetupComplete = (config: any) => {
    setIsProvisioned(true);
    localStorage.setItem('viabhron_provisioned', 'true');
    window.location.reload();
  };

  const handleOnboardingComplete = (state: any) => {
    setOnboardingCompleted(true);
    localStorage.setItem('viabhron_onboarding_completed', 'true');
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
        ) : (
          <motion.div 
            key="vaa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
