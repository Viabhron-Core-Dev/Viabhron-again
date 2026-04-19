import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '@/landscape/engines/firebase';
import { EngineConfig, EngineSession, EngineImportManifest } from '@/core/kernel/types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const engineOrchestrator = {
  /**
   * Imports a mature engine substrate into the OS.
   */
  async importEngine(userId: string, manifest: EngineImportManifest, name: string, type: EngineConfig['type']): Promise<string> {
    const path = `users/${userId}/kernel/engines/configs`;
    try {
      const engineId = manifest.dockerImage?.split('/').pop()?.split(':')[0] || `engine_${Date.now()}`;
      const engineConfig: EngineConfig = {
        id: engineId,
        name,
        type,
        status: 'dormant',
        metabolicLoad: manifest.metabolicLoad,
        config: {},
        importManifest: manifest
      };

      await setDoc(doc(db, path, engineId), engineConfig);
      return engineId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      return '';
    }
  },

  /**
   * "Ignites" an engine, spinning up its computational core.
   */
  async igniteEngine(userId: string, engineId: string, agentId: string, missionId: string): Promise<string> {
    const configPath = `users/${userId}/kernel/engines/configs/${engineId}`;
    const sessionPath = `users/${userId}/kernel/engines/sessions`;

    try {
      const configSnap = await getDoc(doc(db, configPath));
      if (!configSnap.exists()) throw new Error('Engine configuration not found');
      
      const config = configSnap.data() as EngineConfig;

      // Update status to active
      await updateDoc(doc(db, configPath), { status: 'active' });

      // Create a new session
      const session: Omit<EngineSession, 'id'> = {
        engineId,
        agentId,
        missionId,
        startedAt: new Date(),
        tokensConsumed: 0
      };

      const sessionRef = await addDoc(collection(db, sessionPath), session);
      return sessionRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, sessionPath);
      return '';
    }
  },

  /**
   * "Hibernates" an engine to conserve metabolic resources.
   */
  async hibernateEngine(userId: string, engineId: string, sessionId: string, tokensConsumed: number): Promise<void> {
    const configPath = `users/${userId}/kernel/engines/configs/${engineId}`;
    const sessionPath = `users/${userId}/kernel/engines/sessions/${sessionId}`;

    try {
      await updateDoc(doc(db, configPath), { status: 'hibernating' });
      await updateDoc(doc(db, sessionPath), { 
        endedAt: new Date(),
        tokensConsumed 
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, sessionPath);
    }
  },

  /**
   * List all available engines.
   */
  subscribeToEngines(userId: string, callback: (engines: EngineConfig[]) => void) {
    const path = `users/${userId}/kernel/engines/configs`;
    return onSnapshot(collection(db, path), (snapshot) => {
      const engines = snapshot.docs.map(doc => doc.data() as EngineConfig);
      callback(engines);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};
