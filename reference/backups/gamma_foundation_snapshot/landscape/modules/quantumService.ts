import { QuantumNode, CalibrationPulse } from '@/core/kernel/types';

class QuantumService {
  private nodes: QuantumNode[] = [
    { id: 'QN-01', name: 'Aspen-M-3', provider: 'Rigetti', status: 'online', coherenceTime: 120, errorRate: 0.02, lastCalibrated: '2h ago' },
    { id: 'QN-02', name: 'Aria-1', provider: 'IonQ', status: 'online', coherenceTime: 5000, errorRate: 0.001, lastCalibrated: '5h ago' },
    { id: 'QN-03', name: 'Advantage-6.1', provider: 'D-Wave', status: 'calibrating', coherenceTime: 1, errorRate: 0.05, lastCalibrated: 'Just now' }
  ];

  private pulses: CalibrationPulse[] = [
    { id: 'CP-01', nodeId: 'QN-01', timestamp: '2026-04-15T10:00:00Z', fidelity: 0.98, duration: '45m', status: 'success' },
    { id: 'CP-02', nodeId: 'QN-02', timestamp: '2026-04-15T08:00:00Z', fidelity: 0.999, duration: '1.2h', status: 'success' }
  ];

  async getNodes(): Promise<QuantumNode[]> {
    return this.nodes;
  }

  async getPulses(): Promise<CalibrationPulse[]> {
    return this.pulses;
  }

  async runIsingCalibration(nodeId: string): Promise<CalibrationPulse> {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.status = 'calibrating';
    }

    // Simulate Ising Calibration (hours instead of days)
    const newPulse: CalibrationPulse = {
      id: `CP-0${this.pulses.length + 1}`,
      nodeId,
      timestamp: new Date().toISOString(),
      fidelity: 0.99 + Math.random() * 0.009,
      duration: '1.5h',
      status: 'success'
    };

    this.pulses.unshift(newPulse);
    
    if (node) {
      node.status = 'online';
      node.lastCalibrated = 'Just now';
    }

    return newPulse;
  }
}

export const quantumService = new QuantumService();
