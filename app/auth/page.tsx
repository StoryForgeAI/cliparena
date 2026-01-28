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

/*
========================================================
FIREBASE DOMAIN VERSION (NO CUSTOM DOMAIN REQUIRED)
========================================================
This version uses the DEFAULT firebase domain again:
project-id.firebaseapp.com

If login was failing, it was because authDomain did not match
Firebase authorized domain list.

MAKE SURE THIS DOMAIN EXISTS IN:
Firebase → Authentication → Settings → Authorized domains
========================================================
*/

// ✅ FIREBASE CONFIG
const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN, // must be project.firebaseapp.com
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  };

  if (!config.apiKey || !config.authDomain) return null;
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
    if (!config) {
      setError('Missing Firebase env variables');
      return;
    }

    try {
      app = getApps().length ? getApp() : initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app);

      const unsub = onAuthStateChanged(auth, (u) => {
        if (u) setUser(u);
        setInitialized(true);
      });

      return () => unsub();
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  // ✅ CREATE USER DOC IF NOT EXISTS
  const ensureUserRecord = async (userObj: User | null, providedUsername = '') => {
    if (!userObj || !db) return;

    const appId = process.env.NEXT_PUBLIC_APP_ID || 'cliparena-v1';
    const ref = doc(db, 'artifacts', appId, 'users', userObj.uid, 'settings', 'profile');

    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: userObj.uid,
        email: userObj.email,
        username: providedUsername || userObj.displayName || userObj.email,
        plan: 'Free',
        credits: 5,
        joinedAt: new Date().toISOString()
      });
    }
  };

  // ✅ EMAIL LOGIN / REGISTER
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    setError('');

    try {
      const res = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      await ensureUserRecord(res.user, username);
      setRedirecting(true);
      setTimeout(() => (window.location.href = '/'), 1500);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN (DEFAULT FIREBASE POPUP)
  const handleGoogle = async () => {
    if (!auth) return;

    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const res = await signInWithPopup(auth, provider);
      await ensureUserRecord(res.user);

      setRedirecting(true);
      setTimeout(() => (window.location.href = '/'), 1500);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') setError(err.message);
      setLoading(false);
    }
  };

  if (user && redirecting) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h2 className="text-2xl font-bold">Login successful</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#161821] p-8 rounded-3xl">

        <button
          onClick={handleGoogle}
          disabled={!initialized || loading}
          className="w-full bg-white text-black py-4 rounded-xl font-bold mb-6"
        >
          Continue with Google
        </button>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="w-full p-3 rounded bg-black/40" />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full p-3 rounded bg-black/40" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-3 rounded bg-black/40" />

          <button disabled={loading || !initialized} className="w-full bg-[#6C2BFF] py-4 rounded-xl font-bold">
            {loading ? 'Processing…' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="mt-6 text-xs text-gray-400 w-full">
          {isLogin ? 'Create account' : 'Already have an account?'}
        </button>

        {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

/*
================ LOGIN FIX CHECKLIST ================

1. Vercel ENV MUST CONTAIN:
NEXT_PUBLIC_FB_AUTH_DOMAIN=your-project-id.firebaseapp.com

2. Firebase → Authentication → Settings → Authorized Domains
Must include:
- your-project-id.firebaseapp.com
- localhost

3. Google Provider ENABLED in Firebase

4. After changing ENV → REDEPLOY Vercel

=====================================================
*/