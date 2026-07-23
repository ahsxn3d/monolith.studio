import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Code, Rocket, ArrowUpRight, 
  ChevronDown, Terminal, Clock, Server, CheckCircle2 
} from "lucide-react";

interface StepType {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  deliverables: string[];
  techSpec: string;
  codeSnippet: string;
}

export function Workflow() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepType[] = [
    {
      phase: "Phase 01",
      title: "Discover & Blueprinting",
      subtitle: "System Mapping & Semantic Modeling",
      description: "We host deep technical deep-dives to map your data vectors, outline agent permissions, align safety boundaries, and design the precise system architecture. No assumptions made.",
      icon: <Compass size={20} className="text-fuchsia-400" />,
      duration: "Week 01",
      deliverables: [
        "System Architecture Diagram (SVG)",
        "Unified Semantic DB Schema",
        "Agent Persona Specifications",
        "Operational Security Sandbox rules"
      ],
      techSpec: "Data Layer: PG Vector / Firestore Index. Gateway: Express API with strict JWT.",
      codeSnippet: `// schema.ts - Unified Vector Blueprint
import { pgTable, serial, vector, text } from "drizzle-orm";

export const cognitiveIndex = pgTable("cognitive_index", {
  id: serial("id").primaryKey(),
  vector: vector("embeddings", { dimensions: 1536 }),
  content: text("knowledge_node").notNull(),
  meta: text("context_metadata")
});`
    },
    {
      phase: "Phase 02",
      title: "Build & Context Refinement",
      subtitle: "Full-Stack Agile Synthesis",
      description: "Our core engineering cycles begin. We construct your serverless REST/gRPC endpoints, configure persistent RAG indices, implement custom agent fail-safes, and spin up isolated dev clusters.",
      icon: <Code size={20} className="text-fuchsia-400" />,
      duration: "Weeks 02-04",
      deliverables: [
        "Fully-functioning backend API (CJS/ESM)",
        "Durable Vector indexing scheduler",
        "Dynamic UI Dashboard client",
        "Bi-weekly staging environment builds"
      ],
      techSpec: "Compile Tool: esbuild CJS. Host Platform: Cloud Run dockerized. SDK: @google/genai.",
      codeSnippet: `// server.ts - Express Middleware Routing
import { GoogleGenAI } from "@google/genai";
import express from "express";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();

app.post("/api/cognition", async (req, res) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.body.prompt,
  });
  res.json({ output: response.text });
});`
    },
    {
      phase: "Phase 03",
      title: "Scale, Secure & Deploy",
      subtitle: "Enterprise Launch & Telemetry",
      description: "We deploy auto-scaling server clusters on Cloud Run behind secure Nginx proxies, verify strict CORS restrictions, set up comprehensive Sentry monitoring, and coordinate final DNS handoff.",
      icon: <Rocket size={20} className="text-fuchsia-400" />,
      duration: "Week 05",
      deliverables: [
        "Production environment handoff",
        "KMS security keys & Environment secrets configured",
        "Sentry & Datadog alerts activated",
        "Post-launch technical audit & documentation"
      ],
      techSpec: "Load Balancing: Global CDN. CDN Ingress: Nginx. SSL Certificate: Fully automated.",
      codeSnippet: `// deploy.sh - Autonomous Dockerized Script
#!/bin/bash
echo "Initiating Production Pipeline build..."
docker build -t gcr.io/neural-project/core:v1 .
docker push gcr.io/neural-project/core:v1
gcloud run deploy core-service --image gcr.io/neural-project/core:v1 \\
  --port 3000 --min-instances 1 --max-instances 10 --allow-unauthenticated`
    }
  ];

  return (
    <section id="workflow" className="relative py-10 md:py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] max-w-full h-[500px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none overflow-hidden" />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-md">
          <Clock size={12} className="text-fuchsia-400" />
          <span className="text-[10px] font-mono tracking-widest text-fuchsia-300 uppercase">Step-By-Step Onboarding</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          How We Work Together
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          A highly structured, completely transparent 3-phase engineering methodology designed to transition ideas into autonomous enterprise software.
        </p>
      </div>

      {/* Vertical Interactive Onboarding Stack */}
      <div className="space-y-6 relative z-10">
        {steps.map((step, idx) => {
          const isOpen = activeStep === idx;
          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
              onClick={() => setActiveStep(idx)}
              className={`rounded-3xl border text-left p-6 md:p-8 cursor-pointer transition-all ${
                isOpen
                  ? "bg-gradient-to-br from-white/[0.04] to-transparent border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.1)]"
                  : "bg-white/[0.01] hover:bg-white/[0.02] border-white/5"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono tracking-widest text-fuchsia-400 font-bold bg-fuchsia-500/10 px-3 py-1 rounded-full">
                    {step.phase}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                      {step.title}
                      {!isOpen && <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{step.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Server size={12} className="text-fuchsia-400" />
                    Timeline: {step.duration}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-full border border-white/10 text-slate-400"
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </div>
              </div>

              {/* Expandable Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 mt-6 border-t border-white/5">
                      
                      {/* Left: Descriptive Text & Deliverables */}
                      <div className="lg:col-span-6 space-y-6">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <CheckCircle2 size={13} />
                            Key Outputs & Deliverables
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.deliverables.map((del, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <span className="text-emerald-400 mt-1 font-mono text-xs">✓</span>
                                <span className="text-xs text-slate-400 leading-normal">{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/40 border border-white/5 rounded-2xl">
                          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Architecture Spec:</span>
                          <span className="text-[11px] font-mono text-slate-300">{step.techSpec}</span>
                        </div>
                      </div>

                      {/* Right: Technical Code Blueprint */}
                      <div className="lg:col-span-6 space-y-2">
                        <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                          <Terminal size={12} className="text-fuchsia-400" />
                          Technical Blueprint File
                        </span>

                        <div className="bg-slate-950 border border-white/5 p-4 rounded-2xl font-mono text-[10px] text-slate-300 overflow-x-auto shadow-inner leading-relaxed">
                          <pre>{step.codeSnippet}</pre>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
