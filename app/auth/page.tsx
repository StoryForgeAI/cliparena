"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

// --- FIREBASE INITIALIZATION ---
// Safe check for global variables provided by the environment
const getFirebaseConfig = () => {
  try {
    // @ts-ignore
    return JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
  } catch (e) {
    return {};
  }
};

const firebaseConfig = getFirebaseConfig();
// Standard Firebase init pattern to prevent "already exists" errors
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// @ts-ignore
const appId = typeof __app_id !== 'undefined' ? __app_id : 'cliparena-v1';

// --- ICONS ---
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // RULE 3: Auth initialization
  useEffect(() => {
    const initAuth = async () => {
      // @ts-ignore
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        try {
          // @ts-ignore
          await signInWithCustomToken(auth, __initial_auth_token);
        } catch (e) {
          console.error("Custom token sign-in failed", e);
        }
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
      }
    });
    return () => unsubscribe();
  }, []);

  // RULE 1: Ensure user record exists in Firestore
  const ensureUserRecord = async (userObj: User | null, providedUsername: string = '') => {
    if (!userObj) return;

    const userDocRef = doc(db, 'artifacts', appId, 'users', userObj.uid, 'settings', 'profile');
    
    try {
      const docSnap = await getDoc(userDocRef);
      
      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: userObj.uid,
          email: userObj.email,
          username: providedUsername || userObj.displayName || 'Új Gladiátor',
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
      setError(err.message || 'Hiba történt a hitelesítés során.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await ensureUserRecord(res.user);
    } catch (err: any) {
      setError(err.message || 'Google bejelentkezési hiba.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 bg-[#6C2BFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(108,43,255,0.5)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">Sikeres belépés!</h2>
          <p className="text-gray-500 font-light">Üdv az Arénában, {user.displayName || user.email}.<br/>Átirányítás a főoldalra...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6C2BFF]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D1B2]/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#1A1D26] border border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-2xl cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-8 h-8 bg-[#6C2BFF] rounded-lg rotate-12 flex items-center justify-center font-black italic text-xs">CA</div>
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">ClipArena <span className="text-[#6C2BFF]">Auth</span></h1>
        </div>

        <motion.div layout className="bg-[#1A1D26] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl">
          <h2 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">
            {isLogin ? "Üdvözlünk Újra" : "Csatlakozz a harchoz"}
          </h2>
          <p className="text-gray-500 text-sm mb-8 font-light leading-relaxed">
            {isLogin ? "Lépj be a profilodba a folytatáshoz." : "Hozz létre egy profilt és gyűjtsd be az első kreditjeidet."}
          </p>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl mb-6 overflow-hidden"
              >
                Hiba: {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-6 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <GoogleIcon />
            {loading ? "Kapcsolódás..." : "Belépés Google-lel"}
          </button>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full border-t border-white/5" />
            <span className="absolute bg-[#1A1D26] px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Vagy email</span>
          </div>

          <form className="space-y-4" onSubmit={handleEmailAuth}>
            {!isLogin && (
              <input 
                type="text" 
                placeholder="FELHASZNÁLÓNÉV" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all placeholder:text-gray-700 text-white"
              />
            )}
            <input 
              type="email" 
              placeholder="EMAIL CÍM" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all placeholder:text-gray-700 text-white"
            />
            <input 
              type="password" 
              placeholder="JELSZÓ" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none transition-all placeholder:text-gray-700 text-white"
            />

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-[#6C2BFF]/20 hover:bg-[#7d42ff] transition-all active:scale-[0.98] mt-4 disabled:opacity-50"
            >
              {loading ? "Feldolgozás..." : isLogin ? "Bejelentkezés" : "Fiók létrehozása"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
            >
              {isLogin ? "Még nincs fiókod? " : "Már regisztráltál? "}
              <span className="text-[#6C2BFF] uppercase ml-1">{isLogin ? "Regisztráció" : "Bejelentkezés"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}