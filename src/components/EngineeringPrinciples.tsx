import { motion } from "motion/react";
import { Cpu, ShieldCheck, Layers, Network } from "lucide-react";

export function EngineeringPrinciples() {
  const principles = [
    {
      icon: <Layers size={20} className="text-fuchsia-400" />,
      tag: "01 / ARCHITECTURE",
      title: "Sub-pixel Micro-Tactile Precision",
      description: "We enforce high-contrast layouts structured with premium font pairings, micro-padding parameters, and zero unnecessary visual noise. Every card is structured on an elegant grid system.",
      meta: "UI/UX Fidelity score: 99.8%"
    },
    {
      icon: <Cpu size={20} className="text-fuchsia-400" />,
      tag: "02 / COGNITION",
      title: "Latency-Optimized Vector Retrieval",
      description: "Our vector pipeline processes semantic embedding spaces in single-digit milliseconds. By using direct cosine-distance index clustering, we completely bypass sequential query blocks.",
      meta: "Embedding Latency: <15ms"
    },
    {
      icon: <ShieldCheck size={20} className="text-fuchsia-400" />,
      tag: "03 / PROTECTION",
      title: "Strict Security Sandboxing",
      description: "Every agent operation executes inside a containerized sandbox with locked system layers, cryptographic key rotations, and strict environment variables validation.",
      meta: "Compliance standard: SOC-2/HIPAA"
    }
  ];

  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="principles" className="relative py-10 md:py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Glow highlight behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-full h-[500px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none overflow-hidden" />

      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-md">
            <Network size={12} className="text-fuchsia-400" />
            <span className="text-[10px] font-mono tracking-widest text-fuchsia-300 uppercase">Our Core Manifesto</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
            Core Engineering Principles
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            High-performance engineering requires absolute strictness. We reject low-quality code conventions and build with production-ready reliability.
          </p>
        </div>

        {/* Principles Grid with elegant hover interactions */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                borderColor: "rgba(139, 92, 246, 0.4)", // Glowing accent border transition
                backgroundColor: "rgba(255, 255, 255, 0.025)"
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="group rounded-3xl border border-white/5 bg-white/[0.01] p-6 md:p-8 flex flex-col justify-between gap-8 backdrop-blur-xl relative overflow-hidden transition-all"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-fuchsia-600/5 group-hover:bg-fuchsia-600/10 blur-2xl rounded-full transition-all duration-300" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 inline-block transition-transform duration-300 group-hover:scale-110">
                    {p.icon}
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-fuchsia-400 uppercase font-bold bg-fuchsia-500/5 border border-fuchsia-500/10 px-2 py-0.5 rounded-md">
                    {p.tag}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white font-display group-hover:text-fuchsia-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>METRICS TELEMETRY</span>
                <span className="text-slate-300 group-hover:text-fuchsia-400 transition-colors font-semibold">
                  {p.meta}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
