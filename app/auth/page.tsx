"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  Firestore
} from 'firebase/firestore';

// --- GLOBALS & HELPERS ---
const getEnvVar = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  if (typeof window[name] !== 'undefined') return window[name];
  // @ts-ignore
  if (typeof globalThis[name] !== 'undefined') return globalThis[name];
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
  return null;
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  if (auth && db) return { auth, db };

  try {
    const configStr = getEnvVar('NEXT_PUBLIC_FIREBASE_CONFIG')
    
    if (!configStr) {
      console.error("DEBUG: Firebase config string is missing from environment.");
      return null;
    }

    const firebaseConfig = JSON.parse(configStr);
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    return { auth, db };
  } catch (e: any) {
    console.error("Firebase Init Error:", e);
    return null;
  }
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Adunk neki egy kis időt, hátha a változó injektálása lassabb
    const timer = setTimeout(() => {
      const instances = initFirebase();
      if (instances) {
        setIsInitialized(true);
        const unsubscribe = onAuthStateChanged(instances.auth, (u) => {
          setUser(u);
          if (u) setTimeout(() => { window.location.href = '/'; }, 1500);
        });
        return () => unsubscribe();
      } else {
        setError("Firebase hiba: Kérlek ellenőrizd a Vercel Environment Variables beállításait! (__firebase_config)");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const ensureUserRecord = async (userObj: User | null, providedUsername: string = '') => {
    const instances = initFirebase();
    if (!userObj || !instances) return;
    
    // @ts-ignore
    const currentAppId = getEnvVar('__app_id') || 'cliparena-v1';
    const userDocRef = doc(instances.db, 'artifacts', currentAppId, 'users', userObj.uid, 'settings', 'profile');
    
    try {
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: userObj.uid,
          email: userObj.email,
          username: providedUsername || userObj.displayName || 'Gladiátor',
          plan: 'Free',
          credits: 5,
          joinedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Firestore error:", err);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const instances = initFirebase();
    if (!instances) return;
    setLoading(true); setError('');
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(instances.auth, email, password);
        await ensureUserRecord(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(instances.auth, email, password);
        await ensureUserRecord(res.user, username);
      }
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    const instances = initFirebase();
    if (!instances) return;
    setLoading(true); setError('');
    try {
      const res = await signInWithPopup(instances.auth, new GoogleAuthProvider());
      await ensureUserRecord(res.user);
    } catch (err: any) { setError("Hiba a Google belépésnél."); }
    finally { setLoading(false); }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center font-sans">
        <div className="w-16 h-16 bg-[#6C2BFF] rounded-full flex items-center justify-center animate-bounce mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">Sikeres belépés</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#161821] border border-white/5 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
        {!isInitialized && !error && (
          <div className="absolute inset-0 bg-[#161821] z-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#6C2BFF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <h2 className="text-2xl font-black uppercase italic mb-6">{isLogin ? "Belépés" : "Regisztráció"}</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold p-4 rounded-xl mb-6">{error}</div>}

        <button onClick={handleGoogle} disabled={loading || !isInitialized} className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-6 hover:opacity-90 disabled:opacity-50 transition-all">
          Google Belépés
        </button>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && <input type="text" placeholder="FELHASZNÁLÓNÉV" required value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" />}
          <input type="email" placeholder="EMAIL" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" />
          <input type="password" placeholder="JELSZÓ" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" />
          <button type="submit" disabled={loading || !isInitialized} className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] disabled:opacity-50">
            {loading ? "Várj..." : (isLogin ? "Belépés" : "Regisztráció")}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-xs text-gray-500 font-bold hover:text-white transition-colors">
          {isLogin ? "Nincs fiókod? Regisztrálj" : "Már van fiókod? Lépj be"}
        </button>
      </div>
    </div>
  );
}