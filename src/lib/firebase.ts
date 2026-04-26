import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  const finalConfig = { ...appletConfig };
  
  if (!getApps().length) {
    app = initializeApp(finalConfig);
  } else {
    app = getApp();
  }
  
  // CRITICAL: We MUST use the firestoreDatabaseId from our applet config.
  // If we don't have it, we might be in a broken state, but we should at least try and not use '(default)'
  // if the ID is actually present in the file.
  const dbId = (finalConfig as any).firestoreDatabaseId;
  
  if (!dbId) {
    console.warn("Firestore Database ID missing from config! Falling back to (default), which may fail.");
  }
  
  db = getFirestore(app, dbId || '(default)');
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed", error);
}

export { app, db, auth };
