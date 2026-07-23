"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import { Shield, Sparkles, ArrowLeft, Mail, Lock, Check } from "lucide-react";

interface AuthPageProps {
  onBackToPortfolio: () => void;
}

export function AuthPage({ onBackToPortfolio }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    signIn("google", { callbackUrl: "/admin/projects" });
  };

  return (
    <div className="min-h-[100dvh] bg-[#030014] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-fuchsia-500/30 selection:text-white">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] max-w-full h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none overflow-hidden" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] max-w-full h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none overflow-hidden" />

      {/* Header / Nav */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-white uppercase transition-all group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back To Workspace
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 font-mono font-black">
            Φ
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
            AISTUDIO.CONDUIT
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 md:p-10 backdrop-blur-3xl shadow-[0_0_50px_rgba(217,70,239,0.15)] relative overflow-hidden"
          >
            {/* Corner Decorative Light */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-600/10 blur-3xl rounded-full" />

            {!isSuccess ? (
              <div className="space-y-6">
                {/* Title */}
                <div className="text-center space-y-2">
                  <div className="inline-flex p-2.5 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 mb-2">
                    <Shield size={20} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-display">
                    {authMode === "signin" ? "Initialize Secure Session" : "Create Developer Account"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {authMode === "signin"
                      ? "Authenticate against SOC-2 certified access containers."
                      : "Create client credentials to configure telemetry models."}
                  </p>
                </div>

                {/* Third Party OAuth */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 hover:border-fuchsia-500/40"
                >
                  {/* Custom Google SVG with light mask */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px bg-white/5 flex-1" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    OR CRYTOGRAPHIC ADAPTER
                  </span>
                  <div className="h-px bg-white/5 flex-1" />
                </div>

                {/* Standard form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block">Developer Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="developer@conduit.sh"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-3 pl-11 pr-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block">Access Key Password</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-3 pl-11 pr-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Initializing Tunnel..."
                    ) : (
                      <>
                        {authMode === "signin" ? "Unlock Session" : "Provision Credentials"}
                        <Sparkles size={12} />
                      </>
                    )}
                  </button>
                </form>

                {/* Switch Modes */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                    className="text-[10px] font-mono text-fuchsia-400 hover:text-fuchsia-300 uppercase transition-colors"
                  >
                    {authMode === "signin"
                      ? "Request New Access Credentials?"
                      : "Already authorized? Access standard portal"}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Check size={28} />
                </div>
                <h4 className="text-xl font-bold text-white font-display">Authorization Granted</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Cryptographic verification sequence complete. Welcome back, agent container. Directing to sandbox viewport.
                </p>
                <div className="text-[10px] font-mono text-slate-500">
                  JWT PAYLOAD TOKEN ACCEPTED // ENVELOPE ENCRYPTED
                </div>
                <div>
                  <button
                    type="button"
                    onClick={onBackToPortfolio}
                    className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-mono font-bold tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all"
                  >
                    Enter Workspace
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          <span>SECURE ENDPOINT CLUSTER</span>
          <span>© {new Date().getFullYear()} AISTUDIO.CONDUIT // ALL ACCESS REGISTERED</span>
        </div>
      </footer>
    </div>
  );
}
