import { MiniApp } from '@/core/kernel/types';

export const INITIAL_MINI_APPS: MiniApp[] = [
  {
    id: 'ma-scribe',
    name: 'The Scribe',
    description: 'Private, local-first note taking with optional Sovereign Cloud backup.',
    icon: 'FileText',
    enabled: true,
    type: 'local',
    category: 'utility',
    status: 'active'
  },
  {
    id: 'ma-auditor',
    name: 'The Auditor',
    description: 'Autonomous expense tracking and receipt scanning.',
    icon: 'Receipt',
    enabled: false,
    type: 'sovereign',
    category: 'utility',
    status: 'inactive'
  },
  {
    id: 'ma-pulse',
    name: 'The Pulse',
    description: 'Personalized AI news and research feed curated by the Librarian.',
    icon: 'Activity',
    enabled: true,
    type: 'sovereign',
    category: 'intelligence',
    status: 'active'
  },
  {
    id: 'ma-gatekeeper',
    name: 'The Gatekeeper',
    description: 'Mobile security dashboard for emergency lockdown and passkey management.',
    icon: 'ShieldCheck',
    enabled: true,
    type: 'sovereign',
    category: 'security',
    status: 'active'
  }
];
