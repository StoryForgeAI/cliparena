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

// --- FIREBASE KONFIGURÁCIÓ EGYENKÉNTI VÁLTOZÓKKAL ---
const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  };

  // Ellenőrizzük, hogy legalább az API Key megvan-e
  if (!config.apiKey) {
    console.error("DEBUG: Hiányzik a NEXT_PUBLIC_FB_API_KEY!");
    return null;
  }
  return config;
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const config = getFirebaseConfig();
    if (config) {
      try {
        app = getApps().length > 0 ? getApp() : initializeApp(config);
        auth = getAuth(app);
        db = getFirestore(app);
        
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          if (u) {
            setTimeout(() => { window.location.href = '/'; }, 1500);
          }
        });
        
        setInitialized(true);
        return () => unsubscribe();
      } catch (e: any) {
        console.error("Firebase hiba:", e);
        setError("Firebase hiba: " + e.message);
      }
    } else {
      setError("Konfigurációs hiba: A Vercel változók (API Key, stb.) hiányoznak.");
    }
  }, []);

  const ensureUserRecord = async (userObj: User | null, providedUsername: string = '') => {
    if (!userObj || !db) return;
    
    const currentAppId = process.env.NEXT_PUBLIC_APP_ID || 'cliparena-v1';
    const userDocRef = doc(db, 'artifacts', currentAppId, 'users', userObj.uid, 'settings', 'profile');
    
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
      console.error("Firestore hiba:", err);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        await ensureUserRecord(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserRecord(res.user, username);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!auth) return;
    setLoading(true);
    setError('');
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      await ensureUserRecord(res.user);
    } catch (err: any) {
      setError("Google belépés sikertelen.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-16 h-16 bg-[#6C2BFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Sikeres Belépés</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#161821] border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
        {!initialized && !error && (
          <div className="absolute inset-0 bg-[#161821] z-50 flex items-center justify-center rounded-[40px]">
            <div className="w-8 h-8 border-4 border-[#6C2BFF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <h2 className="text-2xl font-black uppercase italic mb-8 tracking-tighter">
          {isLogin ? "Bejelentkezés" : "Regisztráció"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogle} 
          disabled={loading || !initialized} 
          className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-6 hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          Google Belépés
        </button>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="FELHASZNÁLÓNÉV" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" 
            />
          )}
          <input 
            type="email" 
            placeholder="EMAIL" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" 
          />
          <input 
            type="password" 
            placeholder="JELSZÓ" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white" 
          />
          <button 
            type="submit" 
            disabled={loading || !initialized} 
            className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#7d42ff] transition-all disabled:opacity-50"
          >
            {loading ? "Várj..." : (isLogin ? "Belépés" : "Csatlakozás")}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-6 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          {isLogin ? "Nincs fiókod? Regisztrálj" : "Már van fiókod? Belépés"}
        </button>
      </div>
    </div>
  );
}