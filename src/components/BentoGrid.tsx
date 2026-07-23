import { useState } from "react";
import { motion } from "motion/react";
import { 
  Cpu, Activity, Database, Check, Play, RefreshCw, 
  Sparkles, Palette, FileText, Filter, Flame
} from "lucide-react";

export function BentoGrid() {
  // Card 1 state: Agent Automation Simulator
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [isSimulatingWorkflow, setIsSimulatingWorkflow] = useState<boolean>(false);
  const [workflowStatus, setWorkflowStatus] = useState<string>("Ready");

  const workflowSteps = [
    { title: "Sensing Intent", desc: "Parsing natural dialogue vectors", duration: 800 },
    { title: "Memory Alignment", desc: "Querying semantic graph clusters", duration: 1000 },
    { title: "Cognitive Synthesis", desc: "Validating agent logic protocols", duration: 1200 },
    { title: "Safe Deployment", desc: "Executing secure API triggers", duration: 800 }
  ];

  const handleRunSimulation = () => {
    if (isSimulatingWorkflow) return;
    setIsSimulatingWorkflow(true);
    setActiveWorkflowStep(0);
    setWorkflowStatus("Processing...");

    let step = 0;
    const runStep = () => {
      if (step < workflowSteps.length) {
        setActiveWorkflowStep(step);
        setTimeout(() => {
          step++;
          runStep();
        }, workflowSteps[step].duration);
      } else {
        setIsSimulatingWorkflow(false);
        setActiveWorkflowStep(4); // Finished
        setWorkflowStatus("Executed successfully.");
      }
    };
    runStep();
  };

  // Card 2 state: Analytics Mini Metrics
  const [selectedChartRange, setSelectedChartRange] = useState<"1H" | "24H" | "7D">("24H");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const chartData = {
    "1H": [30, 45, 38, 62, 55, 70, 64, 85, 90, 75, 88, 94],
    "24H": [45, 55, 50, 75, 68, 88, 80, 95, 110, 90, 105, 118],
    "7D": [60, 70, 65, 85, 78, 92, 88, 105, 120, 100, 115, 130]
  };

  const chartLabels = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

  // Card 3 state: Cognitive Index Keywords
  const [searchFilter, setSearchFilter] = useState<string>("all");
  const memoryRecords = [
    { id: 1, text: "Customer sentiment matrix", type: "embeddings", score: "0.98", index: "#4481" },
    { id: 2, text: "KMS decryption protocols", type: "security", score: "1.00", index: "#1092" },
    { id: 3, text: "Cognitive temporal logs", type: "history", score: "0.85", index: "#5029" },
    { id: 4, text: "Vector distance parameters", type: "embeddings", score: "0.92", index: "#9042" },
    { id: 5, text: "Multi-modal agent rules", type: "security", score: "0.96", index: "#3011" }
  ];

  const filteredRecords = searchFilter === "all" 
    ? memoryRecords 
    : memoryRecords.filter((rec) => rec.type === searchFilter);

  // Card 4 state: Mini UI Theme Selector
  const [selectedAccent, setSelectedAccent] = useState<"violet" | "emerald" | "amber" | "rose">("violet");

  const accents = {
    violet: { name: "Violet Glow", bg: "bg-fuchsia-600", text: "text-fuchsia-400", border: "border-fuchsia-500/30", bgGlow: "bg-fuchsia-500/10", shadow: "shadow-[0_0_15px_rgba(217,70,239,0.3)]" },
    emerald: { name: "Emerald Bio", bg: "bg-emerald-600", text: "text-emerald-400", border: "border-emerald-500/30", bgGlow: "bg-emerald-500/10", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]" },
    amber: { name: "Amber Forge", bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", bgGlow: "bg-amber-500/10", shadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]" },
    rose: { name: "Rose Nova", bg: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/30", bgGlow: "bg-rose-500/10", shadow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]" }
  };

  const activeAccent = accents[selectedAccent];

  return (
    <section id="features" className="relative py-10 md:py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none overflow-hidden" />

      {/* Title */}
      <div className="text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-md">
          <Sparkles size={12} className="text-fuchsia-400" />
          <span className="text-[10px] font-mono tracking-widest text-fuchsia-300 uppercase">Core Capabilities</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Engineered for Deep Intelligence
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Deploy high-performance systems with strict architectural precision. Every element is crafted to optimize cognitive latency and aesthetic impact.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* Card 1: Large - Agentic Architecture (AI Automation) */}
        <div className="col-span-1 md:col-span-7 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between gap-8 relative overflow-hidden group">
          {/* Internal Top-Edge Highlight */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-fuchsia-600/10 blur-3xl rounded-full" />

          <div className="space-y-3">
            <span className="p-2.5 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 inline-block">
              <Cpu size={20} />
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display">Agentic Systems Orchestration</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Construct autonomous multi-agent pipelines with strict safety sandboxes, automatic memory consolidation, and dynamic action mapping.
            </p>
          </div>

          {/* Miniature UI Component: Interactive Workflow Simulator */}
          <div className="p-4 rounded-2xl border border-white/5 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-slate-400">Agent-Run_State: {workflowStatus}</span>
              </div>
              <button
                onClick={handleRunSimulation}
                disabled={isSimulatingWorkflow}
                className="px-3 py-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-[10px] font-mono text-white rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(217,70,239,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulatingWorkflow ? (
                  <RefreshCw size={10} className="animate-spin" />
                ) : (
                  <Play size={10} fill="currentColor" />
                )}
                Trigger Flow
              </button>
            </div>

            <div className="space-y-2.5">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowStep === idx && isSimulatingWorkflow;
                const isCompleted = activeWorkflowStep > idx || (activeWorkflowStep === 4);
                
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      isActive 
                        ? "border-fuchsia-500/30 bg-fuchsia-950/20" 
                        : isCompleted 
                        ? "border-emerald-500/10 bg-emerald-950/5" 
                        : "border-white/5 bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-mono transition-all duration-300 ${
                          isActive
                            ? "bg-fuchsia-600 border-fuchsia-500 text-white animate-pulse"
                            : isCompleted
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "border-white/10 text-slate-500"
                        }`}
                      >
                        {isCompleted ? <Check size={10} /> : idx + 1}
                      </div>
                      <div>
                        <span className={`text-[11px] font-medium block ${isActive || isCompleted ? "text-white" : "text-slate-400"}`}>{step.title}</span>
                        <span className="text-[9px] text-slate-500 block">{step.desc}</span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[9px] font-mono text-fuchsia-400 animate-pulse">Running...</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Large - Predictive Analytics (Smart Insights) */}
        <div className="col-span-1 md:col-span-5 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between gap-8 relative overflow-hidden group">
          {/* Internal Top-Edge Highlight */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-600/10 blur-3xl rounded-full" />

          <div className="space-y-3">
            <span className="p-2.5 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 inline-block">
              <Activity size={20} />
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display">Predictive Analytics & Metrics</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Synthesize rich event databases into clear vector trends, forecast demand shifts, and extract semantic intelligence.
            </p>
          </div>

          {/* Miniature UI Component: Hoverable Chart Metrics */}
          <div className="p-4 rounded-2xl border border-white/5 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Flame size={11} className="text-fuchsia-400 animate-pulse" />
                Throughput Load
              </span>
              <div className="flex gap-1">
                {(["1H", "24H", "7D"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedChartRange(r);
                      setHoveredBarIndex(null);
                    }}
                    className={`px-2 py-0.5 text-[8px] font-mono rounded-md border transition-all ${
                      selectedChartRange === r
                        ? "bg-fuchsia-600 border-fuchsia-500 text-white"
                        : "border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between h-20 gap-1.5 pt-4 relative">
              {/* Tooltip Overlay */}
              {hoveredBarIndex !== null && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-fuchsia-600 text-[9px] font-mono px-2 py-1 rounded-md text-white shadow-lg border border-fuchsia-400/20 flex items-center gap-1">
                  <span>Val: {chartData[selectedChartRange][hoveredBarIndex]} MB/s</span>
                  <span className="text-[7px] text-fuchsia-300">({chartLabels[hoveredBarIndex]})</span>
                </div>
              )}

              {chartData[selectedChartRange].map((val, idx) => {
                const maxVal = Math.max(...chartData[selectedChartRange]);
                const pct = (val / maxVal) * 100;
                
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center group/bar cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    <div className="w-full bg-slate-900 h-20 rounded-t-lg overflow-hidden flex items-end">
                      <motion.div
                        initial={{ height: "0%" }}
                        animate={{ height: `${pct}%` }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
                        className={`w-full rounded-t-md transition-colors ${
                          hoveredBarIndex === idx ? "bg-fuchsia-500 shadow-[0_0_10px_rgba(192,38,211,0.5)]" : "bg-fuchsia-600/30"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[7px] font-mono text-slate-500 px-1 pt-1 border-t border-white/5">
              <span>00:00</span>
              <span>12:00</span>
              <span>22:00</span>
            </div>
          </div>
        </div>

        {/* Card 3: Small - Vector Cognition (Semantic Store) */}
        <div className="col-span-1 md:col-span-5 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden group">
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-fuchsia-600/10 blur-3xl rounded-full" />
          
          <div className="space-y-2">
            <span className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 inline-block">
              <Database size={16} />
            </span>
            <h3 className="text-lg font-bold text-white font-display">Semantic Vector Store</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-dimension vector index query matching with strict cosine-distance scoring and instant index updates.
            </p>
          </div>

          {/* Miniature UI Component: Keyword Filter */}
          <div className="p-3.5 rounded-2xl border border-white/5 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Filter size={10} />
                Index Filter
              </span>
              <div className="flex gap-1">
                {["all", "embeddings", "security"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSearchFilter(mode)}
                    className={`px-1.5 py-0.5 text-[8px] font-mono rounded-md border capitalize transition-all ${
                      searchFilter === mode
                        ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300"
                        : "border-white/5 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
              {filteredRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={10} className="text-slate-500" />
                    <span className="text-[10px] font-sans text-slate-300 truncate max-w-[130px]">{rec.text}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px]">
                    <span className="text-slate-500">{rec.index}</span>
                    <span className="text-fuchsia-400 font-bold">{rec.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Small - Sensory Interfaces (Custom UI/UX) */}
        <div className="col-span-1 md:col-span-7 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden group">
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-fuchsia-600/10 blur-3xl rounded-full" />
          
          <div className="space-y-2">
            <span className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 inline-block">
              <Palette size={16} />
            </span>
            <h3 className="text-lg font-bold text-white font-display">Sensory Immersive Interfaces</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stunning, high-end layouts tailored with premium sub-pixel typography, custom glowing states, and dynamic live themes.
            </p>
          </div>

          {/* Miniature UI Component: Custom Accent Palette and Mockup Selector */}
          <div className="p-3.5 rounded-2xl border border-white/5 bg-slate-950/60 grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Swatch Picker */}
            <div className="md:col-span-5 space-y-2.5 flex flex-col justify-center">
              <span className="text-[9px] font-mono uppercase text-slate-500 block">Select Sub-accent:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(accents) as Array<keyof typeof accents>).map((key) => {
                  const item = accents[key];
                  const isSelected = selectedAccent === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAccent(key)}
                      className={`p-1.5 rounded-xl border text-[9px] font-mono text-left flex items-center gap-1.5 transition-all ${
                        isSelected 
                          ? "bg-white/[0.03] border-white/10 text-white" 
                          : "border-transparent text-slate-400 hover:bg-white/[0.01]"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${item.bg}`} />
                      <span className="truncate">{item.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Mockup Screen */}
            <div className="md:col-span-7 border border-white/10 rounded-xl bg-slate-950 p-2.5 relative overflow-hidden flex flex-col justify-between h-28">
              {/* Camera Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full bg-white/20" />
              
              <div className="flex items-center justify-between text-[7px] font-mono text-slate-500 pt-2 border-b border-white/5 pb-1">
                <span>SYSTEM ACTIVE</span>
                <span className={activeAccent.text}>● READY</span>
              </div>

              <div className="space-y-1 py-1">
                <span className="text-[8px] font-semibold text-white block">Aether Cloud Services</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[7px] font-mono px-1 py-0.2 rounded ${activeAccent.bgGlow} ${activeAccent.text} border ${activeAccent.border}`}>
                    Premium Core
                  </span>
                  <span className="text-[6px] text-slate-400">v2.4.9</span>
                </div>
              </div>

              {/* Glowing CTA inside phone */}
              <button
                className={`w-full py-1 text-[7px] font-mono font-bold text-white rounded-lg transition-all ${activeAccent.bg} ${activeAccent.shadow}`}
              >
                Launch Instance Core
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
