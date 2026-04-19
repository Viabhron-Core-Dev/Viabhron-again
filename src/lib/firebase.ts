import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  // Use firestoreDatabaseId from config if present
  db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || '(default)');
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed", error);
}

export { app, db, auth };
