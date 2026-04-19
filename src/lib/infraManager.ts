import { initializeApp, deleteApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * MVK Implementation of Infrastructure Manager
 */
class InfrastructureManager {
  private currentApp: FirebaseApp | null = null;
  public db: Firestore | null = null;
  private token: string | null = null;

  // 1. Fetch User's Google Cloud Projects
  async fetchUserProjects(accessToken: string) {
    this.token = accessToken;
    try {
      const response = await fetch('https://cloudresourcemanager.googleapis.com/v1/projects', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error("Error fetching projects", error);
      return [];
    }
  }

  // 2. Fetch the Firebase Config for a specific project
  async getProjectConfig(projectId: string) {
    const url = `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps/-/config`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch config for project ${projectId}. Ensure Firebase Management API is enabled.`);
    }
    return await response.json();
  }

  // 3. Hot-Swap the Database Connection
  async connectToUserBackend(config: any) {
    try {
      const apps = getApps();
      for (const app of apps) {
        if (app.name !== '[DEFAULT]') { // Keep the default app if it exists (for auth)
           // But actually in this setup, we usually replace the whole thing or use named apps
           // For simplicity in MVK, we'll just initialize a second app or re-use.
        }
      }

      // Initialize with a unique name if not default
      this.currentApp = initializeApp(config, "user-backend-" + Date.now());
      this.db = getFirestore(this.currentApp);
      
      localStorage.setItem('viabhron_firebase_config', JSON.stringify(config));
      return this.db;
    } catch (error) {
      console.error("Error connecting to backend", error);
      return null;
    }
  }

  // 4. Provision Triple-Service (Stub)
  async provisionTripleService(projectId: string, brainType: string) {
    console.log(`Provisioning for ${projectId}...`);
    // Simulated delay for UI
    await new Promise(r => setTimeout(r, 3000));
    
    const residentUrl = `https://viabhron-architect-${projectId}.a.run.app`;
    localStorage.setItem('resident_agent_url', residentUrl);
    localStorage.setItem('resident_brain_type', brainType);
    
    return {
      success: true,
      residentUrl
    };
  }
}

export const infra = new InfrastructureManager();
