import { Share2 } from 'lucide-react';
import { Extension } from '@/core/kernel/types';

export const flowiseConnector: Extension = {
  id: 'flowise',
  name: 'Hardened Flowise AI',
  description: 'Secure, low-code agentic workflow orchestration.',
  icon: Share2,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
