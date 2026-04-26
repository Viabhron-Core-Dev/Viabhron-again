import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import mainAppletConfig from '../../firebase-applet-config.json';

// Attempt to load from local storage or use the main applet config
const savedConfig = localStorage.getItem('viabhron_firebase_config');
let configToUse = mainAppletConfig;

if (savedConfig) {
  try {
    configToUse = JSON.parse(savedConfig);
  } catch (e) {
    console.error("Failed to parse saved firebase config", e);
  }
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

try {
  if (!getApps().length) {
    app = initializeApp(configToUse);
  } else {
    // If it's already initialized, we might need a named app if the config is different
    // but for the workstation, we often want to use the default one if it matches
    app = getApp();
  }
  
  // CRITICAL: Ensure we use the correct database ID
  const dbId = (configToUse as any).firestoreDatabaseId || (mainAppletConfig as any).firestoreDatabaseId;
  db = getFirestore(app, dbId);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization deferred or failed. Waiting for Setup Box.", error);
}

export { app, db, auth };

export const reinitializeFirebase = (newConfig: any) => {
  localStorage.setItem('viabhron_firebase_config', JSON.stringify(newConfig));
  window.location.reload(); // Simplest way to re-bind everything
};
