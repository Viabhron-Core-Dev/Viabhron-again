import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Settings, 
  ClipboardList, 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Briefcase, 
  Search, 
  User, 
  Globe, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { OnboardingState, OnboardingStep } from '../../types';

interface OnboardingProps {
  onComplete: (state: OnboardingState) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<OnboardingStep>('choice');
  const [intent, setIntent] = useState<OnboardingState['intent']>();
  const [hardware, setHardware] = useState<OnboardingState['hardwareProfile']>();

  const handleChoice = (choice: 'chat' | 'questionnaire') => {
    if (choice === 'chat') {
      onComplete({ step: 'completed', completed: true });
    } else {
      setStep('questionnaire');
    }
  };

  const handleFinalize = () => {
    onComplete({
      step: 'completed',
      intent,
      hardwareProfile: hardware,
      completed: true
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-wa-dark flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'choice' && (
          <motion.div 
            key="choice"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full space-y-8 text-center"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
                Sovereign Kernel <br/> <span className="text-emerald-400">Successfully Ratified</span>
              </h1>
              <p className="text-zinc-400 text-lg">
                Your private office is online. How shall we begin our mission?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => handleChoice('chat')}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left space-y-4"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 w-fit group-hover:scale-110 transition-transform">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Direct Exploration</h3>
                  <p className="text-sm text-zinc-500 mt-1">Jump straight into Vaa and start interacting with your agents.</p>
                </div>
              </button>

              <button 
                onClick={() => handleChoice('questionnaire')}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left space-y-4 ring-2 ring-blue-500/20"
              >
                <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400 w-fit group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Mission Mapping</h3>
                  <p className="text-sm text-zinc-500 mt-1">Configure your intent for optimized agent response and roadmap.</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'questionnaire' && (
          <motion.div 
            key="questionnaire"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl w-full bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Intent Mapping</h2>
              <p className="text-sm text-zinc-400">Customize your OS behavior based on your primary use case.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Primary Focus</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'coding', label: 'Coding', icon: Code },
                    { id: 'business', label: 'Management', icon: Briefcase },
                    { id: 'research', label: 'Intelligence', icon: Search },
                    { id: 'personal', label: 'Personal', icon: User },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setIntent(item.id as any)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        intent === item.id 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hardware Substrate</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Lite', desc: 'Mobile/Web' },
                    { id: 'medium', label: 'Balanced', desc: 'Desktop' },
                    { id: 'high', label: 'Heavy', desc: 'Workstation' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setHardware(item.id as any)}
                      className={`p-3 rounded-xl border transition-all text-center space-y-1 ${
                        hardware === item.id 
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-[10px] opacity-60 font-mono tracking-tighter">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              disabled={!intent || !hardware}
              onClick={() => setStep('roadmap')}
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold transition-all flex items-center justify-center gap-2"
            >
              Confirm Configuration <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 'roadmap' && (
          <motion.div 
            key="roadmap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl w-full bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Kernel Roadmap</h2>
                <p className="text-sm text-zinc-400">Optimization protocols established for your mission.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" /> Infrastructure Recommendation
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {hardware === 'low' 
                    ? "Cloud-dominant synthesis recommended. Agents will handle high-compute tasks in project backend. Local device used for ratification only."
                    : hardware === 'high'
                    ? "Heavyweight local synthesis possible. We recommend running local model instances alongside cloud anchors for maximum resilience."
                    : "Balanced hybrid substrate initialized. Critical anchors in cloud; lightweight agents synced locally."
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Resident Agents</h3>
                  <ul className="text-xs text-zinc-500 space-y-2">
                    <li className="flex items-center gap-2 font-medium text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Cloud Manager (Root)
                    </li>
                    <li className="flex items-center gap-2 font-medium text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Sentinel (Guardian)
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pulse Check</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    OS metabolism established. You will receive daily pulse reports via Vaa for ratification.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalize}
              className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold transition-all"
            >
              Initialize OS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
