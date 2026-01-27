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
  signInWithCustomToken,
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

// Singleton példányok tárolása, hogy elkerüljük a build-idő inicializálást
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Segédfüggvény az inicializáláshoz csak kliens oldalon
const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    // @ts-ignore
    const configStr = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
    const firebaseConfig = JSON.parse(configStr);

    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API key is missing. Check Environment Variables.");
      return null;
    }

    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
    return null;
  }
};

// @ts-ignore
const appId = typeof __app_id !== 'undefined' ? __app_id : 'cliparena-v1';

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
  const [fb, setFb] = useState<{auth: Auth, db: Firestore} | null>(null);

  useEffect(() => {
    // Csak a komponens betöltése után inicializálunk (Rule 3 biztonságosan)
    const instances = initFirebase();
    if (instances) {
      setFb({ auth: instances.auth, db: instances.db });
      
      const unsubscribe = onAuthStateChanged(instances.auth, (u) => {
        setUser(u);
        if (u) setTimeout(() => window.location.href = '/', 2000);
      });

      const checkCustomToken = async () => {
        // @ts-ignore
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          try {
            // @ts-ignore
            await signInWithCustomToken(instances.auth, __initial_auth_token);
          } catch (e) {}
        }
      };
      checkCustomToken();

      return () => unsubscribe();
    }
  }, []);

  const ensureUserRecord = async (userObj: User | null, providedUsername: string = '') => {
    if (!userObj || !fb) return;
    const userDocRef = doc(fb.db, 'artifacts', appId, 'users', userObj.uid, 'settings', 'profile');
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
    if (!fb) return setError('A rendszer még inicializálódik...');
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(fb.auth, email, password);
        await ensureUserRecord(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(fb.auth, email, password);
        await ensureUserRecord(res.user, username);
      }
    } catch (err: any) {
      setError(err.message || 'Hiba történt.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!fb) return setError('A rendszer még inicializálódik...');
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(fb.auth, provider);
      await ensureUserRecord(res.user);
    } catch (err: any) {
      setError(err.message || 'Hiba történt.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-20 h-20 bg-[#6C2BFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#6C2BFF]/40">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">Sikeres belépés!</h2>
          <p className="text-gray-500">Átirányítás az Arénába...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6C2BFF]/10 blur-[120px] rounded-full -z-10" />
      <div className="w-full max-w-md z-10">
        <motion.div layout className="bg-[#1A1D26] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl">
          <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">
            {isLogin ? "Belépés" : "Csatlakozás"}
          </h2>
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase p-4 rounded-xl mb-6">{error}</div>}
          
          <button onClick={handleGoogleAuth} disabled={loading} className="w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl font-bold text-sm mb-6 hover:bg-gray-200 transition-all disabled:opacity-50">
            <GoogleIcon /> Belépés Google-lel
          </button>

          <form className="space-y-4" onSubmit={handleEmailAuth}>
            {!isLogin && <input type="text" placeholder="FELHASZNÁLÓNÉV" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none text-white" />}
            <input type="email" placeholder="EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none text-white" />
            <input type="password" placeholder="JELSZÓ" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:border-[#6C2BFF] focus:outline-none text-white" />
            <button type="submit" disabled={loading} className="w-full py-5 bg-[#6C2BFF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#7d42ff] transition-all disabled:opacity-50">
              {loading ? "Várj..." : isLogin ? "Bejelentkezés" : "Regisztráció"}
            </button>
          </form>

          <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-8 text-xs font-bold text-gray-500 hover:text-[#6C2BFF] transition-colors">
            {isLogin ? "Még nincs fiókod? Regisztrálj" : "Már van fiókod? Jelentkezz be"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}