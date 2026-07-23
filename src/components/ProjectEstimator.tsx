"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Minus, Plus, Check, Sparkles } from "lucide-react";
import { submitEstimate } from "@/actions/estimator.actions";

interface ProjectEstimatorProps {
  onOpenConsultation?: () => void;
}

const BASE_CATEGORIES = [
  { name: 'Single Landing Page', price: 300 },
  { name: 'Multi-Page Corporate Site', price: 600 },
  { name: 'E-Commerce / SaaS Frontend', price: 1000 },
  { name: 'Immersive 3D Web Experience', price: 1500 }
];

const PAGE_RATE = 50;
const FREE_PAGES = 3;

const ADD_ONS = [
  { name: 'Custom 3D Product Renders', price: 400 },
  { name: 'Advanced UI Animations', price: 200 },
  { name: 'Full Brand Identity', price: 300 },
  { name: 'Advanced SEO Setup', price: 150 },
  { name: 'Priority Delivery', price: 250 }
];

export function ProjectEstimator({ onOpenConsultation }: ProjectEstimatorProps) {
  const [selectedBase, setSelectedBase] = useState(BASE_CATEGORIES[0]);
  const [pageCount, setPageCount] = useState(3);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const calculateTotal = () => {
    const basePrice = selectedBase.price;
    const extraPagesPrice = pageCount > FREE_PAGES ? (pageCount - FREE_PAGES) * PAGE_RATE : 0;
    const addOnsPrice = ADD_ONS.filter(addon => selectedAddOns.includes(addon.name))
                               .reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + extraPagesPrice + addOnsPrice;
  };

  const totalCost = calculateTotal();

  const toggleAddOn = (name: string) => {
    setSelectedAddOns(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      setError("Please provide your name and email.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    const payload = {
      client_name: clientName,
      client_email: clientEmail,
      type: "ESTIMATE",
      selected_features: JSON.stringify({
        base: selectedBase.name,
        pages: pageCount,
        addOns: selectedAddOns
      }),
      total_cost: String(totalCost)
    };

    const res = await submitEstimate(payload);
    if (res.success) {
      setIsSubmitted(true);
    } else {
      setError(res.error || "An error occurred submitting your estimate.");
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSelectedBase(BASE_CATEGORIES[0]);
    setPageCount(3);
    setSelectedAddOns([]);
    setClientName("");
    setClientEmail("");
    setIsSubmitted(false);
  };

  return (
    <div id="estimator" className="w-[95%] md:max-w-4xl mx-auto scroll-mt-32 relative z-10">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="estimator-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20">
                <Sparkles size={14} className="text-fuchsia-400" />
                <span className="text-[10px] font-mono text-fuchsia-400 tracking-[0.2em] uppercase">Interactive Pricing</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight mb-4">Project Estimator</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm">Configure your build requirements to get an instant, transparent cost estimation.</p>
            </div>

            {/* Section 1: Base Build */}
            <section className="space-y-4">
              <h3 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <span className="text-fuchsia-400 font-bold text-lg">01.</span> Base Architecture
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {BASE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedBase(cat)}
                    className={`p-3 md:p-6 rounded-2xl border text-left transition-all ${
                      selectedBase.name === cat.name
                        ? "bg-fuchsia-900/30 border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.15)] ring-1 ring-fuchsia-500/50"
                        : "bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center transition-colors ${
                        selectedBase.name === cat.name ? "border-fuchsia-400 bg-fuchsia-400" : "border-slate-600 bg-transparent"
                      }`}>
                        {selectedBase.name === cat.name && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-fuchsia-300 font-mono text-[10px] md:text-xs font-semibold uppercase tracking-wider">${cat.price}</span>
                    </div>
                    <h4 className="text-white font-medium font-sans text-xs md:text-base">{cat.name}</h4>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 2: Pages */}
            <section className="space-y-4">
              <h3 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <span className="text-fuchsia-400 font-bold text-lg">02.</span> Scope & Scale
              </h3>
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-3 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div>
                  <h4 className="text-white font-medium text-lg mb-1">Total Unique Pages</h4>
                  <p className="text-slate-400 text-sm">First 3 pages are included. +$50 per additional page.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-950/50 p-2 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-2xl font-mono text-white font-bold">{pageCount}</span>
                  <button 
                    onClick={() => setPageCount(pageCount + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 3: Add-ons */}
            <section className="space-y-4">
              <h3 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <span className="text-fuchsia-400 font-bold text-lg">03.</span> Premium Integrations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ADD_ONS.map((addon) => {
                  const isActive = selectedAddOns.includes(addon.name);
                  return (
                    <button
                      key={addon.name}
                      onClick={() => toggleAddOn(addon.name)}
                      className={`flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all ${
                        isActive 
                          ? "bg-fuchsia-600/10 border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.1)]" 
                          : "bg-slate-900/30 border-white/5 hover:border-white/10 hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded border flex items-center justify-center transition-colors ${
                          isActive ? "bg-fuchsia-500 border-fuchsia-500" : "border-slate-600"
                        }`}>
                          {isActive && <Check size={10} className="text-white" />}
                        </div>
                        <span className={`font-sans text-xs md:text-sm ${isActive ? "text-white font-medium" : "text-slate-300"}`}>
                          {addon.name}
                        </span>
                      </div>
                      <span className="text-[10px] md:text-xs font-mono text-slate-400">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Submission Form & Live Total */}
            <section className="mt-8 md:mt-12 bg-purple-950/20 backdrop-blur-md border border-purple-500/30 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-[0_0_50px_rgba(217,70,239,0.05)]">
              <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-8 mb-4 md:mb-8 pb-4 md:pb-8 border-b border-white/10">
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Live Calculation</p>
                  <h3 className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-display">
                    Estimated Investment
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-6xl font-black text-emerald-400 font-mono tracking-tighter">
                    ${totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl border bg-rose-950/40 border-rose-500/30 text-rose-400 text-sm font-sans">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="flex-1 bg-slate-900/60 border border-white/10 p-4 rounded-xl text-white focus:border-[#D946EF] focus:shadow-[0_0_15px_rgba(217,70,239,0.15)] outline-none transition-all font-sans text-base placeholder:text-slate-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="flex-1 bg-slate-900/60 border border-white/10 p-4 rounded-xl text-white focus:border-[#D946EF] focus:shadow-[0_0_15px_rgba(217,70,239,0.15)] outline-none transition-all font-sans text-base placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white rounded-xl font-mono text-sm tracking-widest uppercase font-bold transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? "Processing..." : "Request Estimate"}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-[10px] font-mono text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Secure international payments processed globally via Payoneer (Mastercard/Visa) and SadaPay (Apple Pay/Global Cards). Official invoices are issued post-consultation.
                </p>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="estimator-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 md:py-20 text-center bg-purple-950/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(217,70,239,0.1)]"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 font-display tracking-tight">Estimate Submitted.</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8 font-sans">
              We will review your build requirements ({selectedBase.name}, {pageCount} pages) and contact you at <span className="text-white font-medium">{clientEmail}</span> shortly.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-slate-300 font-mono text-xs uppercase tracking-widest transition-all"
              >
                Build Another
              </button>
              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="px-8 py-3 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all"
                >
                  Book Consultation
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
