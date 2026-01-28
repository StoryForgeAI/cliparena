"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN, // Ide jön a saját domained a Vercel-ben!
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  };
  if (!config.apiKey) return null;
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
  const [redirecting, setRedirecting] = useState(false);

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
          setInitialized(true);
        });
        return () => unsubscribe();
      } catch (e: any) {
        setError("Firebase Error: " + e.message);
      }
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
          username: providedUsername || userObj.email || 'Gladiator', // Google esetén az email lesz a username
          plan: 'Free',
          credits: 5,
          joinedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Firestore Error:", err);
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
      setRedirecting(true);
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!auth) return;
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      
      // Google belépésnél az email kerül a Username oszlopba
      await ensureUserRecord(res.user, res.user.email || '');
      
      setRedirecting(true);
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Sign-In failed: " + err.code);
      }
      setLoading(false);
    }
  };

  if (user && redirecting) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-[#6C2BFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-black uppercase italic italic tracking-tighter">SUCCESS</h2>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">Entering Clip Arena...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6C2BFF]/10 blur-[120px] rounded-full -z-10" />
      
      <div className="w-full max-w-md bg-[#161821] border border-white/5 p-10 rounded-[48px] shadow-2xl relative">
        {!initialized && !error && (
          <div className="absolute inset-0 bg-[#161821] z-50 flex items-center justify-center rounded-[48px]">
            <div className="w-6 h-6 border-2 border-[#6C2BFF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-1">CLIP ARENA</h1>
            <p className="text-gray-600 text-[10px] font-bold tracking-[0.4em] uppercase">Secure Access</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold p-4 rounded-2xl mb-6 uppercase text-center tracking-widest">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogle} 
          disabled={loading || !initialized} 
          className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-8 hover:bg-gray-100 transition-all disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="USERNAME" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white transition-all placeholder:text-gray-800" 
            />
          )}
          <input 
            type="email" 
            placeholder="EMAIL" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white transition-all placeholder:text-gray-800" 
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#6C2BFF] outline-none text-white transition-all placeholder:text-gray-800" 
          />
          <button 
            type="submit" 
            disabled={loading || !initialized} 
            className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-[#7d42ff] transition-all disabled:opacity-50 shadow-lg shadow-[#6C2BFF]/20"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Register")}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-10 text-[9px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-[0.3em] italic"
        >
          {isLogin ? "New member? Sign Up" : "Already a member? Sign In"}
        </button>
      </div>
    </div>
  );
}