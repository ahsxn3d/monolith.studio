import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Sparkles, Cpu, Radio, Network, Database, Layers,
  Play, RefreshCw, Sliders, ToggleLeft, ToggleRight,
  Activity, Zap, CloudLightning
} from "lucide-react";

type TabType = "overview" | "agents" | "memory" | "integrations";

interface MetricType {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "System booted successfully.",
    "Connected to standard-vector-db-v4 [OK]",
    "Awaiting sensory instructions..."
  ]);
  const [selectedAgent, setSelectedAgent] = useState("Insight_Scout_v4");
  const [agentTemperature, setAgentTemperature] = useState(0.2);
  const [queryInput, setQueryInput] = useState("");
  const [isProcessingQuery, setIsProcessingQuery] = useState(false);
  const [currentProgressStep, setCurrentProgressStep] = useState(0);
  const [queryResponse, setQueryResponse] = useState("");
  const [graphData, setGraphData] = useState<number[]>([40, 55, 48, 65, 59, 75, 82, 70, 88, 92]);
  const [integrations, setIntegrations] = useState({
    slack: true,
    stripe: false,
    github: true,
    notion: false,
    shopify: false
  });
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedMemoryNode, setSelectedMemoryNode] = useState<string>("Knowledge Graph v3");

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentLogs]);

  // Real-time graph simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prev) => {
        const next = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const variance = Math.floor(Math.random() * 25) - 12;
        const newVal = Math.max(30, Math.min(100, lastVal + variance));
        return [...next, newVal];
      });

      // Periodically append high-level random logs to make it look active
      if (Math.random() > 0.7) {
        const events = [
          "Pinged memory endpoint - latency: 12ms",
          "Ingested new data node #9822 - 1.2MB",
          "Synthesizer_Prime optimized temperature bounds",
          "Auto-scaling group active - 2 instances online",
          "Vector embeddings indexed successfully"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setAgentLogs((prev) => [...prev.slice(-30), `[${new Date().toLocaleTimeString()}] ${randomEvent}`]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const triggerToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleToggleIntegration = (key: keyof typeof integrations, name: string) => {
    setIntegrations((prev) => {
      const nextState = !prev[key];
      triggerToast(`${name} integration ${nextState ? "ACTIVATED" : "DEACTIVATED"}`);
      return { ...prev, [key]: nextState };
    });
  };

  const handleRunAgentQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isProcessingQuery) return;

    setIsProcessingQuery(true);
    setCurrentProgressStep(0);
    setQueryResponse("");
    setAgentLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] USER QUERY: "${queryInput}"`,
      `[${new Date().toLocaleTimeString()}] Initializing routing protocol...`
    ]);

    const steps = [
      "Analyzing intent and semantics...",
      "Searching index storage...",
      "Resolving vector context score (cosine distance: 0.94)...",
      "Running synthesis engine via model cluster...",
      "Generating autonomous action map..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAgentLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] [STEP ${currentStep + 1}] ${steps[currentStep]}`]);
        setCurrentProgressStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(interval);
        // Answer generated!
        const responses: Record<string, string> = {
          "Insight_Scout_v4": `Analysis Complete. Detected highly positive sentiment (94.2%) with emerging interest in agentic systems. Advise initiating automated outreach via optimized email sequences.`,
          "Synthesizer_Prime": `Code architecture formulated. Built full-stack TypeScript schema integrating Drizzle ORM and Cloud SQL. Migration file generated in 42ms. Ready for pipeline integration.`,
          "Task_Pilot_v2": `Autonomous action chain complete. Ingested data sources, executed validation rules, triggered Slack alert, and synchronized billing records. 0 errors detected.`
        };
        const activeResp = responses[selectedAgent] || "Task processed successfully under standard execution limits.";
        setQueryResponse(activeResp);
        setAgentLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] RESPONSE GENERATED [SUCCESS]`,
          `[${new Date().toLocaleTimeString()}] Task finalized in ${(Math.random() * 0.4 + 0.1).toFixed(3)}s.`
        ]);
        setIsProcessingQuery(false);
        setQueryInput("");
      }
    }, 800);
  };

  const handleOptimizeMemory = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setAgentLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] INITIATING NEURAL COMPACTION...`,
      `[${new Date().toLocaleTimeString()}] Pruning legacy node links...`
    ]);

    setTimeout(() => {
      setAgentLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Re-aligning dimension spaces (1536-dim)...`,
        `[${new Date().toLocaleTimeString()}] Index health restored to 100%. Saved 240MB.`
      ]);
      setIsOptimizing(false);
      triggerToast("Neural Memory Optimization Complete!");
    }, 2000);
  };

  // Metrics overview data
  const metrics: MetricType[] = [
    {
      label: "Autonomous Runs",
      value: "14,802",
      change: "+24.8%",
      isPositive: true,
      icon: <Activity size={16} className="text-fuchsia-400" />
    },
    {
      label: "Embedding Latency",
      value: "14.2 ms",
      change: "-18.3%",
      isPositive: true,
      icon: <Zap size={16} className="text-fuchsia-400" />
    },
    {
      label: "Context Accuracy",
      value: "99.84%",
      change: "+0.02%",
      isPositive: true,
      icon: <Sparkles size={16} className="text-fuchsia-400" />
    },
    {
      label: "API Resource Load",
      value: "42.1%",
      change: "Stable",
      isPositive: true,
      icon: <Cpu size={16} className="text-fuchsia-400" />
    }
  ];

  return (
    <div className="relative w-full p-1 md:p-2 overflow-hidden">
      {/* Dynamic Toasts inside the mockup */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-fuchsia-600/90 text-white text-xs font-mono font-medium shadow-lg backdrop-blur-md border border-fuchsia-400/20"
            >
              <CloudLightning size={14} className="animate-bounce" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl md:rounded-2xl overflow-hidden bg-slate-950/80">
        {/* Mock Sidebar */}
        <div className="lg:col-span-3 border-r border-white/5 bg-slate-950/40 p-4 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">AETHER SHELL</span>
            </div>

            <nav className="flex flex-row overflow-x-auto lg:overflow-visible flex-nowrap space-x-2 lg:space-x-0 lg:space-y-1 scrollbar-none pb-2 lg:pb-0">
              {[
                { id: "overview", label: "Overview", icon: <Layers size={15} /> },
                { id: "agents", label: "Cognitive Agents", icon: <Cpu size={15} /> },
                { id: "memory", label: "Neural Memory", icon: <Network size={15} /> },
                { id: "integrations", label: "Integrations", icon: <Database size={15} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono rounded-xl transition-all text-left whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/10 font-medium"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">System Core</span>
              <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10">ONLINE</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-fuchsia-500 h-full w-[84%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Mock Main Content Area */}
        <div className="lg:col-span-9 p-4 md:p-6 flex flex-col gap-6">
          {/* Active Panel View */}
          <div className="min-h-[280px]">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-white">Core Dashboard Overview</h4>
                    <p className="text-xs text-slate-400">Continuous telemetry of semantic operations and execution efficiency.</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 border border-white/5 bg-white/[0.02] py-1 px-2.5 rounded-full">
                    Refresh Rate: 3s
                  </span>
                </div>

                {/* Grid metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-white/5 bg-white/[0.01] rounded-2xl hover:border-fuchsia-500/20 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-[10px] font-mono">{metric.label}</span>
                        {metric.icon}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-bold font-mono text-white">{metric.value}</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SVG Graph Visualization */}
                <div className="border border-white/5 bg-slate-950/60 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <Radio size={12} className="text-fuchsia-400 animate-pulse" />
                      Dynamic Workload (Requests / Sec)
                    </span>
                    <span className="text-xs font-mono text-fuchsia-400 font-bold">
                      Avg: {(graphData.reduce((a, b) => a + b, 0) / graphData.length).toFixed(1)} req/s
                    </span>
                  </div>

                  {/* Manual Sparkline Graph with SVG */}
                  <div className="h-28 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d={`M 0 100 ${graphData
                          .map((val, idx) => `L ${(idx / (graphData.length - 1)) * 500} ${100 - val * 0.8}`)
                          .join(" ")} L 500 100 Z`}
                        fill="url(#gradient-glow)"
                        className="transition-all duration-1000 ease-in-out"
                      />

                      {/* Line Stroke */}
                      <path
                        d={graphData
                          .map((val, idx) => `${idx === 0 ? "M" : "L"} ${(idx / (graphData.length - 1)) * 500} ${100 - val * 0.8}`)
                          .join(" ")}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-1000 ease-in-out"
                      />

                      {/* Moving Points */}
                      {graphData.map((val, idx) => {
                        const cx = (idx / (graphData.length - 1)) * 500;
                        const cy = 100 - val * 0.8;
                        const isLast = idx === graphData.length - 1;

                        if (!isLast) return null;

                        return (
                          <g key={idx}>
                            <circle cx={cx} cy={cy} r="6" fill="#8b5cf6" className="animate-ping opacity-75" />
                            <circle cx={cx} cy={cy} r="4" fill="#a78bfa" />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "agents" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-base font-semibold text-white">Agent Playground Cluster</h4>
                    <p className="text-xs text-slate-400 font-sans">Run real-time vector queries and test cognitive agent logic.</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap">
                    {["Insight_Scout_v4", "Synthesizer_Prime", "Task_Pilot_v2"].map((name) => (
                      <button
                        key={name}
                        onClick={() => {
                          setSelectedAgent(name);
                          setQueryResponse("");
                          setQueryInput("");
                          triggerToast(`Switched to Agent: ${name}`);
                        }}
                        className={`px-3 py-1 text-[10px] font-mono rounded-lg border transition-all ${
                          selectedAgent === name
                            ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300"
                            : "border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Controls card */}
                  <div className="md:col-span-5 space-y-3 p-3 border border-white/5 bg-white/[0.01] rounded-2xl">
                    <span className="text-xs font-mono font-medium text-slate-200 flex items-center gap-1.5">
                      <Sliders size={13} className="text-fuchsia-400" />
                      Agent Directives
                    </span>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>Temperature Bounds</span>
                        <span className="text-fuchsia-400 font-bold">{agentTemperature.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={agentTemperature}
                        onChange={(e) => setAgentTemperature(parseFloat(e.target.value))}
                        className="w-full accent-fuchsia-600 h-1 bg-slate-900 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-slate-500">
                        <span>Deterministic</span>
                        <span>Highly Creative</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl border border-white/5 bg-slate-950/50 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Terminal size={10} /> Model Spec
                      </span>
                      <p className="text-[10px] font-mono text-slate-500">gemini-2.5-flash-neural-optimized</p>
                      <p className="text-[10px] font-mono text-slate-500">context window: 1M tokens</p>
                    </div>

                    {/* Quick suggest tags */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500">Suggested queries:</span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Analyze customer feedback on agentic interfaces",
                          "Generate SQL migration for schema change",
                          "Run autonomous diagnostic script"
                        ].map((txt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setQueryInput(txt)}
                            className="text-[9px] font-sans text-left border border-white/5 bg-white/[0.02] py-1 px-2 rounded-lg text-slate-400 hover:text-white hover:bg-fuchsia-600/10 hover:border-fuchsia-500/20 transition-all truncate max-w-full"
                          >
                            {txt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Run Prompt Area */}
                  <div className="md:col-span-7 space-y-3">
                    <form onSubmit={handleRunAgentQuery} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type standard prompt query..."
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                        disabled={isProcessingQuery}
                        className="flex-1 bg-slate-950 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-2 px-3 rounded-xl outline-none transition-all font-mono"
                      />
                      <button
                        type="submit"
                        disabled={!queryInput.trim() || isProcessingQuery}
                        className={`py-2 px-4 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                          queryInput.trim() && !isProcessingQuery
                            ? "bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                            : "bg-white/[0.02] border border-white/5 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        {isProcessingQuery ? (
                          <RefreshCw size={13} className="animate-spin" />
                        ) : (
                          <Play size={13} fill="currentColor" />
                        )}
                        Run
                      </button>
                    </form>

                    <div className="h-44 border border-white/5 bg-slate-950/80 rounded-2xl p-3 font-mono text-[10px] text-slate-300 flex flex-col justify-between">
                      <div className="overflow-y-auto space-y-1 max-h-[105px] pr-1">
                        <div className="text-fuchsia-400 font-bold border-b border-white/5 pb-1 mb-1.5 flex items-center justify-between">
                          <span>SYSTEM LOGS: {selectedAgent}</span>
                          {isProcessingQuery && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-fuchsia-600/20 text-fuchsia-300 animate-pulse">
                              Processing Step {currentProgressStep}/5
                            </span>
                          )}
                        </div>
                        {agentLogs.slice(-4).map((log, idx) => (
                          <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                            <span className="text-slate-500">&gt;&gt;</span> {log}
                          </div>
                        ))}
                        <div ref={terminalEndRef} />
                      </div>

                      {/* Display response */}
                      <AnimatePresence mode="wait">
                        {queryResponse ? (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-fuchsia-950/30 border border-fuchsia-500/20 p-2.5 rounded-xl flex gap-2"
                          >
                            <Sparkles size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-[9px] text-fuchsia-300 font-sans uppercase tracking-wider mb-0.5">Model Answer Output</p>
                              <p className="text-slate-300 leading-normal text-[10px]">{queryResponse}</p>
                            </div>
                          </motion.div>
                        ) : isProcessingQuery ? (
                          <div className="bg-slate-900/30 p-2 border border-white/5 rounded-xl flex items-center gap-2">
                            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                              <motion.div
                                className="bg-fuchsia-500 h-full rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(currentProgressStep / 5) * 100}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-2 text-slate-500 border border-dashed border-white/5 rounded-xl">
                            Run a query to observe high-level vector outputs
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "memory" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-base font-semibold text-white">Neural Vector Store</h4>
                    <p className="text-xs text-slate-400">Semantic graph representing vector weights, knowledge chains, and cognitive memory.</p>
                  </div>
                  <button
                    onClick={handleOptimizeMemory}
                    disabled={isOptimizing}
                    className="py-1 px-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-mono rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                  >
                    <RefreshCw size={12} className={isOptimizing ? "animate-spin" : ""} />
                    {isOptimizing ? "Optimizing..." : "Compress Vector Store"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Interactive Node Graph via SVG */}
                  <div className="md:col-span-7 flex justify-center bg-slate-950/60 border border-white/5 rounded-2xl p-3 h-52 relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      {/* Grid background inside SVG */}
                      <defs>
                        <pattern id="graph-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#graph-grid)" />

                      {/* Connection lines */}
                      <line x1="150" y1="100" x2="60" y2="60" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="1.5" className="animate-pulse" />
                      <line x1="150" y1="100" x2="240" y2="70" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="1.5" />
                      <line x1="150" y1="100" x2="100" y2="160" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="1.5" />
                      <line x1="150" y1="100" x2="200" y2="150" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="1.5" />
                      
                      <line x1="60" y1="60" x2="240" y2="70" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="100" y1="160" x2="200" y2="150" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="2,2" />

                      {/* Center Node (Root Memory) */}
                      <circle
                        cx="150"
                        cy="100"
                        r="14"
                        fill="#d946ef"
                        onClick={() => setSelectedMemoryNode("Core Index Cluster")}
                        className="cursor-pointer hover:stroke-[3] hover:stroke-fuchsia-400 transition-all"
                      />
                      <circle cx="150" cy="100" r="22" fill="none" stroke="#d946ef" strokeWidth="1" className="animate-pulse" />

                      {/* Surrounding Nodes */}
                      {[
                        { cx: 60, cy: 60, r: 8, label: "User Profiles", color: "#a78bfa" },
                        { cx: 240, cy: 70, r: 9, label: "Knowledge Graph v3", color: "#c084fc" },
                        { cx: 100, cy: 160, r: 7, label: "Temporal History", color: "#f472b6" },
                        { cx: 200, cy: 150, r: 8, label: "Context Embeddings", color: "#818cf8" }
                      ].map((node, i) => (
                        <g key={i}>
                          <circle
                            cx={node.cx}
                            cy={node.cy}
                            r={node.r}
                            fill={node.color}
                            onClick={() => setSelectedMemoryNode(node.label)}
                            className="cursor-pointer hover:scale-125 transition-all hover:stroke-white hover:stroke-2"
                          />
                          <text
                            x={node.cx}
                            y={node.cy - 14}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            {node.label}
                          </text>
                        </g>
                      ))}

                      <text x="150" y="126" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace">
                        Root Core
                      </text>
                    </svg>

                    <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-500">
                      *Click on nodes to inspect memory metadata.
                    </div>
                  </div>

                  {/* Node Metadata Detail Card */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-3 border border-white/5 bg-white/[0.01] rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-fuchsia-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                        <Database size={12} />
                        Node Inspection
                      </div>
                      <h5 className="text-sm font-semibold text-white font-mono">{selectedMemoryNode}</h5>

                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                        <div className="p-2 bg-slate-950/60 rounded-xl">
                          <p className="text-slate-500 uppercase">Vector Size</p>
                          <p className="text-white font-bold mt-0.5">1536-dim</p>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-xl">
                          <p className="text-slate-500 uppercase">Embedding Count</p>
                          <p className="text-white font-bold mt-0.5">
                            {selectedMemoryNode.includes("Core") ? "24,800" : selectedMemoryNode.includes("Knowledge") ? "12,400" : "4,200"}
                          </p>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-xl">
                          <p className="text-slate-500 uppercase">Metric Mode</p>
                          <p className="text-white font-bold mt-0.5">Cosine Sim</p>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-xl">
                          <p className="text-slate-500 uppercase">Index Health</p>
                          <p className="text-emerald-400 font-bold mt-0.5">99.98%</p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono leading-relaxed text-slate-400 border-t border-white/5 pt-2.5">
                        <span className="text-slate-500">Node Description:</span> Represents semantic vectors capturing system context strings, structured schema files, and historical dialogue matrices. Fully compactable.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-white">Secure Gateway Integrations</h4>
                  <p className="text-xs text-slate-400">Enable neural triggers across your technical stack with one-click secure OAuth scopes.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { id: "slack", name: "Slack Alerts", desc: "Push notification webhooks and summaries.", status: "Connected" },
                    { id: "github", name: "GitHub Hooks", desc: "Deploy codebases directly on PR approval.", status: "Connected" },
                    { id: "stripe", name: "Stripe Billing", desc: "Automated billing and ledger syncing.", status: "Disconnected" },
                    { id: "notion", name: "Notion Knowledge", desc: "Ingest workspace documents automatically.", status: "Disconnected" },
                    { id: "shopify", name: "Shopify Store", desc: "Track inventory and sales statistics.", status: "Disconnected" }
                  ].map((integration) => {
                    const isConnected = integrations[integration.id as keyof typeof integrations];
                    return (
                      <div
                        key={integration.id}
                        className={`p-3.5 border rounded-2xl flex flex-col justify-between gap-3 transition-all ${
                          isConnected
                            ? "border-fuchsia-500/20 bg-fuchsia-950/5"
                            : "border-white/5 bg-white/[0.01] hover:border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-semibold text-white block">{integration.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 leading-normal">{integration.desc}</span>
                          </div>
                          <span
                            className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              isConnected
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-slate-900 text-slate-500 border border-white/5"
                            }`}
                          >
                            {isConnected ? "ACTIVE" : "OFFLINE"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-2">
                          <span className="text-[9px] font-mono text-slate-500">OAuth Client Enabled</span>
                          <button
                            type="button"
                            onClick={() => handleToggleIntegration(integration.id as keyof typeof integrations, integration.name)}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            {isConnected ? (
                              <ToggleRight size={24} className="text-fuchsia-500 cursor-pointer" />
                            ) : (
                              <ToggleLeft size={24} className="text-slate-600 cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
