import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // 🛡️ Development Bypass: Mock user for faster iteration
    if (import.meta.env.DEV) {
      setUser({
        uid: 'sys-admin-dev',
        email: 'chairman-dev@viabhron.local',
        displayName: 'Chairman (Dev)',
        emailVerified: true
      } as any);
      setIsAuthReady(true);
      return;
    }

    if (!auth) {
      setIsAuthReady(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    // Add scopes if needed in the future
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  return { user, isAuthReady, login, logout };
}
