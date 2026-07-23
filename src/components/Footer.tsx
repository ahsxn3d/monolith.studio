"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Github, Twitter, Linkedin, Terminal } from "lucide-react";
import characterImg from "../../public/footer-model.png";

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTimeUTC = currentTime.toUTCString().replace("GMT", "UTC");
  const formattedTimeLocal = currentTime.toLocaleTimeString();

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/40 py-12 px-4 md:px-8 mt-12 overflow-hidden md:min-h-[600px] flex flex-col justify-between">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-fuchsia-600/5 blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Character Image (Absolute Bottom Right on Desktop, Hidden on Mobile) */}
      <div className="hidden md:flex absolute bottom-0 md:-right-8 lg:-right-12 z-0 pointer-events-none md:w-[400px] lg:w-[500px] xl:w-[600px] opacity-100 items-end justify-end">
        <Image 
          src={characterImg} 
          alt="Atmospheric Model" 
          className="object-contain object-right-bottom w-full h-auto"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left column: Brand */}
        <div className="md:col-span-4 space-y-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-[0_0_12px_rgba(217,70,239,0.2)]">
              <Image src="/assets/logo.png" alt="Monolith Logo" fill className="object-contain" priority sizes="28px" />
            </div>
            <span className="font-display font-bold text-base tracking-wider text-white">
              Monolith<span className="text-fuchsia-500">.</span>Studio
            </span>
          </a>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Architecting elite autonomous agents, predictive analytics layers, and immersive SaaS frontends with strict sensory-grade execution.
          </p>
          <div className="flex items-center gap-4 pt-2">
            
            {/* X (Twitter) Box */}
            <a 
              href="https://x.com/Ahsanwebdesign" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-300 group-hover:fill-white transition-colors">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.312H5.078z" />
              </svg>
            </a>

            {/* Fiverr Box */}
            <a 
              href="YOUR_FIVERR_GIG_URL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-white/5 hover:border-[#1dbf73]/30 transition-all group"
            >
              <span className="font-black text-xl tracking-tighter text-slate-500 group-hover:text-white transition-colors">
                fi<span className="text-[#1dbf73]">.</span>
              </span>
            </a>

          </div>
        </div>

        {/* Center column: Menu Links + Telemetry Stacked */}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6">
          <div className="space-y-8">
            {/* Directory */}
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3">Directory</span>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Capabilities</a></li>
                <li><a href="#workflow" className="text-slate-400 hover:text-white transition-colors">Our Process</a></li>
                <li><a href="#dashboard-demo" className="text-slate-400 hover:text-white transition-colors">Interactive Demo</a></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3">Legal</span>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Clause</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">MSA Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Security Audit</a></li>
              </ul>
            </div>
          </div>

          {/* Dynamic System Status */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">System Time telemetry</span>
            
            <div className="p-4 border border-white/5 bg-slate-950/60 rounded-2xl font-mono text-[10px] text-slate-400 space-y-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Terminal size={11} className="text-fuchsia-400" />
                  UTC Clock:
                </span>
                {mounted ? (
                  <span className="text-slate-200 font-bold">{formattedTimeUTC}</span>
                ) : (
                  <span>Loading time...</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Terminal size={11} className="text-fuchsia-400" />
                  Local Clock:
                </span>
                {mounted ? (
                  <span className="text-slate-200 font-bold">{formattedTimeLocal}</span>
                ) : (
                  <span>Loading time...</span>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">
                <span>Telemetry Node</span>
                <span>● ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Empty for Character Image */}
        <div className="md:col-span-3 hidden md:block"></div>

      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col items-start gap-2">
        <span className="text-[10px] font-mono text-slate-500">
          © {new Date().getFullYear()} Monolith Studio. All software schemas licensed under Apache-2.0.
        </span>
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          Crafted with extreme tactile precision.
        </span>
      </div>
    </footer>
  );
}
