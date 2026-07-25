'use client';

import React, { useState, useMemo } from 'react';
import { Project } from "@prisma/client";

interface ProductsShowcaseClientProps {
  initialProjects: Project[];
}

export function ProductsShowcaseClient({ initialProjects }: ProductsShowcaseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Determine the highest price from the initial projects to set the slider max correctly.
  const highestPrice = useMemo(() => {
    return initialProjects.reduce((max, project) => Math.max(max, project.price || 0), 0);
  }, [initialProjects]);

  const [maxPrice, setMaxPrice] = useState(highestPrice > 0 ? highestPrice : 10000);

  // Filter projects by category and max price
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesPrice = (project.price || 0) <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [initialProjects, selectedCategory, maxPrice]);

  return (
    <>
      {/* Filter Component */}
      <div className="flex flex-col md:flex-row gap-6 p-6 mb-12 bg-slate-950/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full">
        {/* Category Buttons */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Category Filter</span>
          <div className="flex flex-wrap gap-3">
            {["All", "Frontend Templates", "Full-Stack Web Apps"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-xl border ${
                  selectedCategory === category
                    ? "bg-fuchsia-500/10 border-fuchsia-500/50 text-[#D946EF] shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                    : "bg-black/50 border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-black/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col gap-3 md:ml-auto w-full md:w-72">
          <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
            <span className="text-slate-400">Max Budget</span>
            <span className="text-emerald-400 font-bold">${maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={highestPrice > 0 ? highestPrice : 10000}
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 mt-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D946EF] hover:accent-[#c026d3] transition-all outline-none"
          />
        </div>
      </div>

      {/* Grid Display */}
      {filteredProjects.length === 0 ? (
        <div className="w-full max-w-2xl mx-auto bg-slate-950/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 rounded-full border border-slate-500/50 border-t-slate-300 animate-spin mb-6"></div>
          <h3 className="text-white text-xl font-black mb-2">No Deployments Found</h3>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Adjust your filters to discover systems.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-slate-950/30 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden hover:bg-slate-900/40 hover:border-fuchsia-500/50 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] flex flex-col"
            >
              {/* Thumbnail Container 16:9 */}
              <div className="relative w-full aspect-video bg-black/50 overflow-hidden border-b border-white/10 group-hover:border-fuchsia-500/30 transition-colors">
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-500/30 font-mono text-xs uppercase tracking-widest">
                    No Signal
                  </div>
                )}
                
                {/* Status Badge overlay */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-mono tracking-widest text-fuchsia-400 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-8 flex flex-col flex-1">
                <h3 className="text-base md:text-xl font-bold text-white mb-3 tracking-wide">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-6">
                  {project.description || project.purpose}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
                    ${(project.price || 0).toLocaleString()}
                  </span>
                  {project.live_url && (
                    <a 
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-fuchsia-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      Initialize ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
