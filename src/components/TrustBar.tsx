import { motion } from "motion/react";
import { 
  Cpu, Radio, Shield, Zap, Sparkles 
} from "lucide-react";

export function TrustBar() {
  const logos = [
    { name: "Vertex AI", icon: <Cpu size={16} /> },
    { name: "Helix Labs", icon: <Radio size={16} /> },
    { name: "Aether Corp", icon: <Shield size={16} /> },
    { name: "Quantum", icon: <Zap size={16} /> },
    { name: "Strata", icon: <Sparkles size={16} /> }
  ];

  // Repeat logos to make infinite marquee effect seamless
  const extendedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full border-y border-white/5 bg-white/[0.01] py-10 overflow-hidden relative">
      {/* Absolute side overlays for seamless marquee fade edge */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 text-center">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Trusted by elite engineering squads globally
        </span>
      </div>

      <div className="flex select-none overflow-hidden">
        {/* Infinite marquee animation wrapper using Framer Motion */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex gap-8 md:gap-16 shrink-0 pr-8 md:pr-16 items-center"
        >
          {extendedLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 opacity-30 hover:opacity-75 transition-opacity duration-300 cursor-default"
            >
              <div className="text-slate-400">
                {logo.icon}
              </div>
              <span className="font-display font-bold text-sm tracking-widest uppercase text-slate-300">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
