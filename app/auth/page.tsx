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

// --- INITIALIZATION LOGIC ---
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  if (auth && db) return { auth, db };

  try {
    // @ts-ignore
    const configStr = typeof __firebase_config !== 'undefined' ? __firebase_config : null;
    
    if (!configStr) {
      throw new Error("A __firebase_config változó nem található a Vercel-ben!");
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

// @ts-ignore
const appId = typeof __app_id !== 'undefined' ? __app_id : 'cliparena-v1';

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
    const instances = initFirebase();
    if (instances) {
      setIsInitialized(true);
      const unsubscribe = onAuthStateChanged(instances.auth, (u) => {
        setUser(u);
        if (u) {
          // Sikeres belépés után várunk egy kicsit, hogy lássa az animációt
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      });
      return () => unsubscribe();
    } else {
      setError("Hiba: A Firebase konfiguráció hiányzik vagy hibás.");
    }
  }, []);

  const ensureUserRecord = async (userObj: User | null, providedUsername: string = '') => {
    const instances = initFirebase();
    if (!userObj || !instances) return;

    const userDocRef = doc(instances.db, 'artifacts', appId, 'users', userObj.uid, 'settings', 'profile');
    
    try {
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: userObj.uid,
          email: userObj.email,
          username: providedUsername || userObj.displayName || 'Gladiátor',
          plan: 'Free',
          credits: 5,
          joinedAt: new Date().toISOString(),
          avatarUrl: userObj.photoURL || null
        });
      }
    } catch (err) {
      console.error("Firestore sync error:", err);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const instances = initFirebase();
    if (!instances) return;

    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(instances.auth, email, password);
        await ensureUserRecord(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(instances.auth, email, password);
        await ensureUserRecord(res.user, username);
      }
    } catch (err: any) {
      setError(err.message.includes('auth/invalid-email') ? 'Érvénytelen email cím.' : 
             err.message.includes('auth/wrong-password') ? 'Hibás jelszó.' : 
             err.message.includes('auth/user-not-found') ? 'Nincs ilyen felhasználó.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const instances = initFirebase();
    if (!instances) return;

    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(instances.auth, provider);
      await ensureUserRecord(res.user);
    } catch (err: any) {
      setError("Google bejelentkezés megszakítva vagy hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 bg-[#6C2BFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(108,43,255,0.3)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Sikeres Belépés</h2>
          <p className="text-gray-500">Irány az Aréna...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#6C2BFF]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-[#6C2BFF] to-[#8E54FF] rounded-2xl flex items-center justify-center mb-4 shadow-xl rotate-3">
             <span className="font-black italic text-lg">CA</span>
          </div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">ClipArena <span className="text-[#6C2BFF]">Gate</span></h1>
        </div>

        <motion.div layout className="bg-[#161821] border border-white/5 p-8 rounded-[32px] shadow-2xl relative">
          {!isInitialized && !error && (
            <div className="absolute inset-0 bg-[#161821]/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-[32px]">
              <div className="w-6 h-6 border-2 border-[#6C2BFF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <h2 className="text-2xl font-black uppercase italic mb-6 tracking-tighter">
            {isLogin ? "Visszatérés" : "Csatlakozás"}
          </h2>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase p-4 rounded-xl mb-6 tracking-widest">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleGoogleAuth} 
            disabled={loading || !isInitialized} 
            className="w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-6 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
            Belépés Google-lel
          </button>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full border-t border-white/5" />
            <span className="absolute bg-[#161821] px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Vagy Email</span>
          </div>

          <form className="space-y-4" onSubmit={handleEmailAuth}>
            {!isLogin && (
              <input 
                type="text" 
                placeholder="PROFIL NÉV" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all text-white" 
              />
            )}
            <input 
              type="email" 
              placeholder="EMAIL" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all text-white" 
            />
            <input 
              type="password" 
              placeholder="JELSZÓ" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all text-white" 
            />

            <button 
              type="submit" 
              disabled={loading || !isInitialized} 
              className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#7d42ff] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Folyamatban..." : isLogin ? "Belépés" : "Regisztráció"}
            </button>
          </form>

          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="w-full mt-8 text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            {isLogin ? "Nincs még fiókod? " : "Van már fiókod? "}
            <span className="text-[#6C2BFF] uppercase ml-1">{isLogin ? "Regisztráció" : "Bejelentkezés"}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}