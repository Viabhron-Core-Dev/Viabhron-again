import { MeshIdentity, MeshPolicy } from '@/core/kernel/types';

class MeshService {
  private identities: MeshIdentity[] = [
    { id: 'MID-01', agentId: 'head-agent', meshId: 'mesh-viabhron-01', status: 'active', lastActive: 'Just now', ipAddress: '10.0.0.2' },
    { id: 'MID-02', agentId: 'fiscal-comptroller', meshId: 'mesh-viabhron-01', status: 'active', lastActive: '5m ago', ipAddress: '10.0.0.3' },
    { id: 'MID-03', agentId: 'sentinel', meshId: 'mesh-viabhron-01', status: 'active', lastActive: '2m ago', ipAddress: '10.0.0.4' }
  ];

  private policies: MeshPolicy[] = [
    { id: 'POL-01', identityId: 'MID-01', targetSystem: 'Production DB', accessLevel: 'read', status: 'active', createdAt: '2026-04-10' },
    { id: 'POL-02', identityId: 'MID-02', targetSystem: 'Treasury Ledger', accessLevel: 'admin', status: 'active', createdAt: '2026-04-11' },
    { id: 'POL-03', identityId: 'MID-03', targetSystem: 'System Logs', accessLevel: 'read', status: 'active', createdAt: '2026-04-12' }
  ];

  async getIdentities(): Promise<MeshIdentity[]> {
    return this.identities;
  }

  async getPolicies(): Promise<MeshPolicy[]> {
    return this.policies;
  }

  async createIdentity(agentId: string): Promise<MeshIdentity> {
    const newIdentity: MeshIdentity = {
      id: `MID-0${this.identities.length + 1}`,
      agentId,
      meshId: 'mesh-viabhron-01',
      status: 'pending',
      lastActive: 'Never',
      ipAddress: `10.0.0.${this.identities.length + 2}`
    };
    this.identities.push(newIdentity);
    return newIdentity;
  }

  async addPolicy(identityId: string, targetSystem: string, accessLevel: 'read' | 'write' | 'admin'): Promise<MeshPolicy> {
    const newPolicy: MeshPolicy = {
      id: `POL-0${this.policies.length + 1}`,
      identityId,
      targetSystem,
      accessLevel,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.policies.push(newPolicy);
    return newPolicy;
  }
}

export const meshService = new MeshService();
