"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Cpu, X } from "lucide-react";
import type { Project } from "@prisma/client";

type DisplayProject = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string | null;
  liveUrl: string;
  techStack: string[];
  status: string;
  metrics: { latency: string; throughput: string };
  category: string;
  totalCost: number;
};

export function DeploymentCatalog({ projects = [] }: { projects?: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Calculate highest price only once when projects load so slider doesn't reset
  const highestPrice = useMemo(() => {
    return projects.reduce((max, p) => Math.max(max, p.total_cost || 0), 0);
  }, [projects]);

  const [maxPrice, setMaxPrice] = useState(highestPrice > 0 ? highestPrice : 10000);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);
  // Map backend projects to the visual model
  const displayProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    tagline: p.category ? p.category.toUpperCase() : (p.purpose?.substring(0, 30).toUpperCase() || "OPERATIONAL MODULE"),
    description: p.description,
    imageUrl: p.thumbnail_url,
    liveUrl: p.live_url,
    techStack: (p.tech_stack && p.tech_stack.length > 0) ? p.tech_stack : ["Next.js", "React", "TypeScript"], 
    status: p.status === "ACTIVE" ? "ACTIVE" : "STABLE",
    metrics: {
      latency: p.latency || "142ms", 
      throughput: p.throughput || "420 req/s"
    },
    category: p.category || "Uncategorized",
    totalCost: p.total_cost || 0,
  }));

  // Pure function filtering logic using useMemo
  const filteredProjects = useMemo(() => {
    return displayProjects.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
      
      const safeProjectCat = (p.category || "Uncategorized").toLowerCase();
      const safeSelectedCat = selectedCategory.toLowerCase();
      const matchesCategory = selectedCategory === "All" || safeProjectCat === safeSelectedCat;
      
      const safePrice = p.totalCost || 0;
      const matchesPrice = safePrice <= maxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [displayProjects, searchQuery, selectedCategory, maxPrice]);

  // Staggered entrance transition configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="deployments" className="relative py-8 md:py-24 px-4 md:px-8 max-w-6xl mx-auto z-10">
      
      {/* Dynamic Background Atmospheric Orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
          <Cpu size={12} className="text-violet-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-violet-300 uppercase font-semibold">
            Product Deployment Archive
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Operational
          </span>{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Deployments
          </span>
        </h2>
        
        <p className="text-slate-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
          Explore sandbox instances and live-deployed software modules representing state-of-the-art computational and agent-driven systems.
        </p>
      </div>

      {/* Unified Filter Control Panel - Ultra-compact Glassmorphism */}
      <div className="flex flex-col gap-4 p-4 md:p-6 mb-12 bg-slate-950/40 backdrop-blur-xl border border-violet-500/20 rounded-2xl w-full relative group overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute -inset-px bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Search Bar - Top Row */}
        <div className="w-full z-10 relative">
          <input
            type="text"
            placeholder="Search deployments by title, description, or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/40 border border-white/5 hover:border-white/10 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300"
          />
        </div>

        {/* Second Row: Categories (Left) & Slider (Right) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full z-10 relative">
          {/* Category Toggles */}
          <div className="flex flex-wrap gap-2">
            {["All", "Frontend Templates", "Full-Stack Web Apps"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-lg border ${
                  selectedCategory === category
                    ? "bg-violet-600/20 border-violet-500/30 text-violet-200 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                    : "bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-300 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Slider */}
          <div className="flex flex-col gap-2 w-full md:w-64 shrink-0">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest px-1">
              <span className="text-slate-500">Max Budget</span>
              <span className="text-violet-300 font-bold">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max={highestPrice > 0 ? highestPrice : 10000}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-900/60 border border-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      >
        {filteredProjects.length === 0 ? (
          <div className="col-span-full w-full bg-slate-950/40 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px] relative group overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-full border border-white/5 border-t-violet-400 animate-spin mb-6 z-10"></div>
            <h3 className="text-white text-xl font-bold mb-2 z-10">No Deployments Found</h3>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest z-10">
              Adjust your filters to discover systems.
            </p>
          </div>
        ) : filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            onClick={() => setSelectedProject(project)}
            className={`cursor-pointer bg-slate-950/40 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-3 md:p-6 relative group overflow-hidden hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] flex flex-col justify-between ${
              index % 4 === 0 || index % 4 === 3 ? 'md:col-span-2' : 'md:col-span-1'
            }`}
          >
            {/* Top Row (Badges) */}
            <div className="flex items-center justify-between z-10 relative mb-4 md:mb-6">
              <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-violet-950/30 border border-violet-500/10 rounded-md text-[7px] md:text-[10px] text-violet-300 font-mono tracking-widest uppercase truncate max-w-[40%]">
                {project.tagline}
              </span>
              <div className="flex items-center gap-1 md:gap-2">
                <div className="flex items-center gap-1 md:gap-1.5 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-[7px] md:text-[10px] font-mono font-bold">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  {project.metrics.latency}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold">
                  {project.metrics.throughput}
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            {project.imageUrl && (
              <div className="relative w-full h-24 md:h-64 mb-4 md:mb-6 rounded-xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors z-10 block shrink-0">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} Preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 bg-violet-950/20 mix-blend-overlay group-hover:opacity-10 transition-opacity" />
                
                {/* Status Overlay */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1 md:gap-1.5 px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md">
                  <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                    project.status === "ACTIVE" 
                      ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" 
                      : project.status === "SYNCING" 
                      ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" 
                      : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  }`} />
                  <span className="text-[7px] md:text-[9px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    {project.status}
                  </span>
                </div>
              </div>
            )}

            {/* Typography */}
            <div className="mt-auto z-10 relative">
              <h3 className="text-sm md:text-2xl font-black tracking-tight text-white mt-2 md:mt-8 group-hover:text-violet-300 transition-colors truncate">
                {project.title}
              </h3>
              <p className="text-[9px] md:text-sm text-slate-400 mt-1 md:mt-2 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Bottom Row (Tech Stack & Visit Button) */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 md:gap-4 mt-3 md:mt-6 z-10 relative">
              <div className="flex flex-wrap gap-1 md:gap-1.5">
                {project.techStack.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-violet-950/30 border border-violet-500/10 rounded-md text-[7px] md:text-[10px] text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 2 && (
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-violet-950/30 border border-violet-500/10 rounded-md text-[7px] md:text-[10px] text-slate-300 font-mono">
                    +{project.techStack.length - 2}
                  </span>
                )}
              </div>
              
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 w-full xl:w-auto px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-violet-500/30 bg-violet-600/20 hover:bg-violet-600 text-[8px] md:text-xs font-mono font-bold text-violet-200 hover:text-white tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 group/btn shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
              >
                <span>Visit Project</span>
                <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/5 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
      {/* Project Details Modal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <>
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full sm:w-[95%] max-w-3xl max-h-[90dvh] overflow-hidden bg-slate-950/60 backdrop-blur-2xl border border-violet-500/20 rounded-t-3xl rounded-b-none sm:rounded-3xl shadow-[0_8px_40px_rgba(124,58,237,0.2)] flex flex-col"
                >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-900/60 backdrop-blur-md hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors z-20"
                >
                  <X size={20} />
                </button>

                <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col relative">
                  {/* Large Thumbnail */}
                  {selectedProject.imageUrl && (
                    <div className="w-full h-48 md:h-72 relative border-b border-violet-500/20 shrink-0">
                      <img
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-violet-950/20 mix-blend-overlay" />
                    </div>
                  )}

                  <div className="p-6 md:p-10 relative z-10 flex flex-col gap-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1.5 bg-violet-950/30 border border-violet-500/20 rounded-lg text-[10px] text-violet-300 font-mono tracking-widest uppercase">
                        {selectedProject.tagline}
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                        {selectedProject.status}
                      </div>
                    </div>

                    {/* Title, Description & Total Cost Header */}
                    <div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                          {selectedProject.title}
                        </h2>
                        {/* Dynamic Total Cost Display */}
                        <div className="shrink-0 flex flex-col items-end gap-1 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <span className="text-[9px] text-emerald-400/70 font-mono uppercase tracking-widest">Total Cost</span>
                          <span className="text-xl md:text-2xl font-black text-emerald-400 font-mono">
                            ${selectedProject.totalCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Metrics & Tech Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Performance Metrics</h4>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                            <span className="text-[9px] text-slate-500 font-mono">LATENCY</span>
                            <span className="text-sm text-emerald-400 font-mono font-bold">{selectedProject.metrics.latency}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                            <span className="text-[9px] text-slate-500 font-mono">THROUGHPUT</span>
                            <span className="text-sm text-emerald-400 font-mono font-bold">{selectedProject.metrics.throughput}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-violet-950/30 border border-violet-500/10 rounded-md text-[10px] text-slate-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-8 border-t border-white/10 mt-2">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto px-6 py-3 inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-600/20 hover:bg-violet-600 text-xs font-mono font-bold text-violet-200 hover:text-white tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] group/btn"
                      >
                        <span>Visit Live Portal</span>
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
