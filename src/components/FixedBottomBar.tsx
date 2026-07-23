import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, ChevronDown, ChevronUp, Lock } from "lucide-react";

interface FixedBottomBarProps {
  onOpenConsultation: () => void;
}

export function FixedBottomBar({ onOpenConsultation }: FixedBottomBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Default to collapsed ONLY on mobile viewports
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, []);

  // Prevent hydration flash and ensure document.body is available for createPortal
  if (!mounted || typeof document === 'undefined') return null;

  const barContent = (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-none flex justify-center" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            // w-fit mx-auto to make it a compact pill on mobile, w-full for desktop
            className="w-fit mx-auto md:w-full bg-slate-950/20 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-xl py-3 px-4 md:py-1.5 md:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 max-w-[95vw] md:max-w-none md:flex-nowrap"
          >
            {/* Grayscale Payment Trust Badges */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2 md:gap-3 flex-shrink-0">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Lock size={10} className="text-slate-400 hidden sm:block" />
                <span className="md:hidden hidden sm:inline">TRANSACT SECURELY:</span>
                <span className="hidden md:inline">TRANSACT SECURELY:</span>
              </span>
              <div className="flex items-center gap-2 md:gap-2.5 opacity-40 grayscale hover:opacity-80 transition-all duration-300">
                {/* Stripe Grayscale SVG */}
                <svg className="h-3 md:h-4 w-auto text-white flex-shrink-0" viewBox="0 0 40 16" fill="currentColor">
                  <path d="M36.1 7.2c0-2.4-1.2-3.7-3.4-3.7-2.3 0-3.6 1.5-3.6 3.7 0 2.7 1.6 3.7 3.7 3.7.9 0 1.7-.2 2.3-.6l.1-1.3c-.6.3-1.3.4-2 .4-1.2 0-2.1-.4-2.2-1.7h6.2c.1-.8.1-1.6-.1-2.2zm-4.9-.9c0-.7.5-1.2 1.3-1.2.8 0 1.2.5 1.2 1.2h-2.5zm-5.7-2.8c-.8 0-1.4.3-1.7.6V.3L22 .7v10.5c0 .9.8 1.4 1.7 1.4.8 0 1.5-.2 1.9-.5l-.1-1.3c-.4.2-1 .3-1.4.3-.4 0-.8-.2-.8-.7V5.5h2.2V4h-2.2V3.5zm-6.8.5c0-.9-.7-1.4-1.7-1.4-.8 0-1.5.3-2 .7l.1 1.3c.5-.3 1.1-.5 1.6-.5.4 0 .7.1.7.5 0 .7-.9.8-1.7 1.1-.9.3-1.8.8-1.8 2.1 0 1.3 1.1 2 2.3 2 1 0 1.7-.4 2-.8v.7H20V4c0-.1 0-.1 0 0zm-1.3 3.6c0 .7-.5 1.1-1.3 1.1-.5 0-.9-.2-.9-.6 0-.5.5-.7 1.3-.9v.4zM9 4V.5L7.2.9V4H5.5V5.5h1.7v4.6c0 1.4.9 2.1 2.3 2.1.8 0 1.5-.2 1.9-.5V10.4c-.4.2-.9.3-1.4.3-.4 0-.8-.2-.8-.7V5.5H11V4H9zM3 5.4c0-.6.4-1 1-1 .5 0 .9.2 1.1.5l.1-1.3C4.8 3.3 4.2 3.1 3.4 3.1 1.5 3.1.3 4.4.3 6.6c0 3 2.1 3.7 4 3.7 1 0 1.8-.2 2.3-.6l-.1-1.3c-.5.3-1.1.4-1.8.4-1.2-.1-1.7-.8-1.7-3.4z" />
                </svg>

                {/* Lemon Squeezy Equivalent Logo */}
                <div className="flex items-center gap-1">
                  <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-[6px] md:text-[8px] font-bold text-black font-mono leading-none">L</span>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-white font-sans whitespace-nowrap">lemon squeezy</span>
                </div>
              </div>
            </div>

            {/* Quick Contact & Legal Links */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-2.5 md:gap-4 mt-1 md:mt-0 whitespace-nowrap">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-mono text-slate-300 hover:text-white hover:underline uppercase transition-all flex-shrink-0 min-h-[44px]"
              >
                <MessageSquare size={10} className="text-fuchsia-400 md:hidden" />
                <MessageSquare size={12} className="text-fuchsia-400 hidden md:block" />
                Direct Chat
              </button>

              <a
                href="mailto:buildwithmonolith@gmail.com"
                className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-mono text-slate-300 hover:text-white hover:underline uppercase transition-all flex-shrink-0 min-h-[44px]"
              >
                <Mail size={10} className="text-fuchsia-400 md:hidden" />
                <Mail size={12} className="text-fuchsia-400 hidden md:block" />
                 buildwithmonolith@gmail.com
              </a>

              <div className="h-3 w-px bg-white/10 hidden lg:block flex-shrink-0" />

              {/* Legal Policies */}
              <div className="hidden lg:flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-mono text-slate-500 uppercase flex-shrink-0">
                <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                <span>//</span>
                <a href="#terms" className="hover:text-slate-300 transition-colors">SLA Terms</a>
              </div>

              {/* Collapse Trigger Button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-white/5 hover:bg-white/5 text-slate-500 hover:text-white transition-all ml-1 md:ml-1 flex-shrink-0"
                title="Collapse bottom bar"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // By wrapping with w-full flex justify-center on mobile, we guarantee perfect centering without drift
            className="w-full flex justify-center md:justify-end pointer-events-auto"
          >
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 px-4 md:p-2 md:px-2 rounded-full md:rounded-xl bg-slate-950/95 backdrop-blur-xl border border-white/10 hover:bg-slate-900 text-slate-300 hover:text-white shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all flex items-center gap-2 md:gap-1 text-[10px] font-mono uppercase tracking-wider font-bold"
              title="Expand status bar"
            >
              <Lock size={12} className="text-emerald-400 md:hidden" />
              <ChevronUp size={14} className="hidden md:block" />
              <span className="md:hidden">Secure</span>
              <span className="hidden md:inline">Show Trust & Telemetry</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(barContent, document.body);
}
