"use client";

import React, { useState, useRef } from "react";
import { createBooking } from "@/actions/booking";
import { ArrowLeft, CheckCircle2, CalendarDays, Clock, User, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await createBooking(null, formData);

    setResult(res);
    if (res.success) {
      formRef.current?.reset();
    }
    setIsSubmitting(false);

    setTimeout(() => setResult(null), 8000);
  };

  const inputClasses = "w-full bg-slate-900/60 border border-white/10 p-3.5 rounded-xl text-white focus:border-[#D946EF] focus:shadow-[0_0_15px_rgba(217,70,239,0.15)] outline-none transition-all font-mono text-base placeholder:text-slate-600";

  return (
    <div className="min-h-[100dvh] bg-[url('/assets/hero-bg.jpeg?v=2')] bg-cover bg-center bg-fixed text-white flex items-center justify-center p-4 relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#030014]/70 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Return to Main Terminal
        </Link>

        {/* Success State */}
        {result?.success ? (
          <div className="bg-purple-950/20 backdrop-blur-2xl border border-purple-500/30 rounded-2xl p-6 md:p-12 text-center shadow-[0_0_60px_rgba(217,70,239,0.1)]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3">Booking Confirmed</h2>
            <p className="text-slate-400 font-mono text-sm tracking-wider mb-8">
              System Updated. You will receive a confirmation shortly.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white rounded-full font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)]"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#D946EF]" />
                <span className="text-[10px] font-mono text-[#D946EF] tracking-[0.3em] uppercase">
                  Booking Portal
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-3">
                Schedule a Meeting
              </h1>
              <p className="text-slate-400 text-sm max-w-md">
                Book a call or consultation with our team. Select your preferred date and time below.
              </p>
            </div>

            {/* Error Toast */}
            {result && !result.success && (
              <div className="mb-6 p-4 rounded-xl border bg-rose-950/40 border-rose-500/30 text-rose-400">
                <span className="font-mono text-sm">{result.error}</span>
              </div>
            )}

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-purple-950/20 backdrop-blur-2xl border border-purple-500/30 rounded-2xl p-4 md:p-8 shadow-[0_0_60px_rgba(217,70,239,0.1)] space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </div>

                {/* Meeting Type */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Meeting Type
                  </label>
                  <select
                    required
                    name="type"
                    defaultValue=""
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-500">Select meeting type...</option>
                    <option value="CALL" className="bg-slate-900">Book a Call</option>
                    <option value="CONSULTATION" className="bg-slate-900">Book a Consultation</option>
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <CalendarDays size={12} /> Select Date
                  </label>
                  <input
                    required
                    type="date"
                    name="scheduled_date"
                    className={`${inputClasses} [color-scheme:dark]`}
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Clock size={12} /> Select Time
                  </label>
                  <input
                    required
                    type="time"
                    name="scheduled_time"
                    className={`${inputClasses} [color-scheme:dark]`}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white rounded-full font-mono text-sm tracking-widest uppercase font-bold transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
