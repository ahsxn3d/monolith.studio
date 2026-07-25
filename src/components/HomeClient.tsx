"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { TrustBar } from "@/components/TrustBar";
import { DashboardDemo } from "@/components/DashboardDemo";
import { BentoGrid } from "@/components/BentoGrid";
import { Workflow } from "@/components/Workflow";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { StickyHero } from "@/components/StickyHero";
import { EngineeringPrinciples } from "@/components/EngineeringPrinciples";
import { ProjectEstimator } from "@/components/ProjectEstimator";
import { DirectConsultationModal } from "@/components/DirectConsultationModal";
import { AuthPage } from "@/components/AuthPage";
import { FixedBottomBar } from "@/components/FixedBottomBar";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function HomeClient({ productsSection }: { productsSection: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"portfolio" | "auth">("portfolio");

  // Track hash for seamless client-side routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#auth") {
        setCurrentView("auth");
      } else {
        setCurrentView("portfolio");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run initial check

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateToPortfolio = () => {
    window.location.hash = "";
    setCurrentView("portfolio");
  };

  // Buttery-smooth transitions configuration with ZERO spring physics as requested (glide up y:30 to 0)
  const fadeUpTransition = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // luxurious cubic-bezier easing
  };

  if (currentView === "auth") {
    return (
      <>
        <AuthPage onBackToPortfolio={navigateToPortfolio} />
      </>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#030014] text-[#f1f1f1] font-sans antialiased relative pb-32 sm:pb-24 select-none">

      {/* -------------------- THE ATMOSPHERIC GLOWS -------------------- */}
      {/* Massive blurred radial gradients floating behind the UI */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] aspect-square bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0,transparent_60%)] blur-[120px] rounded-full pointer-events-none z-0 overflow-hidden" />
      <div className="absolute top-[400px] left-[10%] w-full max-w-[500px] aspect-square bg-fuchsia-600/10 blur-[130px] rounded-full pointer-events-none z-0 overflow-hidden" />
      <div className="absolute top-[1200px] right-[5%] w-full max-w-[600px] aspect-square bg-fuchsia-600/5 blur-[150px] rounded-full pointer-events-none z-0 overflow-hidden" />
      <div className="absolute bottom-[400px] left-[15%] w-full max-w-[500px] aspect-square bg-fuchsia-600/5 blur-[150px] rounded-full pointer-events-none z-0 overflow-hidden" />

      {/* Decorative Grid Line System */}
      <div className="absolute inset-0 bg-grid-white bg-grid-glow pointer-events-none opacity-[0.25] z-0" />

      {/* Sticky Premium Navbar */}
      <Navbar onBookCallClick={() => setIsBookingOpen(true)} />

      {/* -------------------- HERO SECTION -------------------- */}
      <StickyHero
        heroContent={
          <section className="relative px-4 overflow-hidden z-10 min-h-[100dvh] w-full pt-8 md:pt-12">
            <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Subtle Label pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.1)]"
          >
            <Sparkles size={13} className="text-fuchsia-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-fuchsia-300 uppercase">
              Exclusive AI Systems Engineering Studio
            </span>
          </motion.div>

          {/* Massive Display Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter break-words"
          >
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Future-Noir</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D946EF] to-[#c026d3] drop-shadow-[0_0_40px_rgba(217,70,239,0.3)]">Performance Spec.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light break-words"
          >
            We engineer high-fidelity, unified web systems that feel like premium software. No templates. No latency. Just pure atmospheric code.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full"
          >
            <button 
              onClick={() => setIsConsultationOpen(true)}
              className="group relative w-full sm:w-auto px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white rounded-full font-mono text-sm tracking-widest uppercase font-bold transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] overflow-hidden flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book a consultation <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-mono text-sm tracking-widest uppercase transition-all backdrop-blur-md flex items-center justify-center"
            >
              Initialize Booking
            </button>
          </motion.div>

        </div>
      </section>
        }
      >

      {/* -------------------- HERO DASHBOARD MOCKUP -------------------- */}
      {/* Positioned directly below the CTA */}
      <section id="dashboard-demo" className="relative pb-8 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto z-10 pt-8 md:pt-16">
        <motion.div
          {...fadeUpTransition}
          className="w-full rounded-2xl md:rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden flex flex-col"
        >
          {/* Simulated window header bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 bg-slate-950/60 backdrop-blur-md text-xs z-10 relative overflow-hidden min-w-0 w-full">
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500/40" />
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500/40" />
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest truncate px-2 md:px-4 flex-1 text-center min-w-0">AETHER_INTELLIGENCE_CENTER // V2.5</span>
            <div className="w-8 md:w-12 shrink-0" />
          </div>

          <DashboardDemo />
        </motion.div>
      </section>

      {/* -------------------- TRUST MARQUEE BAR -------------------- */}
      <section className="relative z-10">
        <TrustBar />
      </section>

      {/* -------------------- CORE ENGINEERING PRINCIPLES -------------------- */}
      <motion.div {...fadeUpTransition}>
        <EngineeringPrinciples />
      </motion.div>

      {/* -------------------- DEPLOYMENTS / PRODUCTS SHOWCASE -------------------- */}
      <motion.div {...fadeUpTransition}>
        {productsSection}
      </motion.div>

      {/* -------------------- THE FEATURE BENTO GRID -------------------- */}
      <motion.div {...fadeUpTransition}>
        <BentoGrid />
      </motion.div>

      {/* -------------------- WORKFLOW TIMELINE SECTION -------------------- */}
      <motion.div {...fadeUpTransition}>
        <Workflow />
      </motion.div>

      {/* -------------------- INTERACTIVE PROJECT ESTIMATOR -------------------- */}
      <motion.div {...fadeUpTransition}>
        <ProjectEstimator onOpenConsultation={() => setIsConsultationOpen(true)} />
      </motion.div>

      {/* -------------------- FOOTER -------------------- */}
      <Footer />

      {/* -------------------- FIXED STATUS & TRUST TRAY BAR -------------------- */}
      <FixedBottomBar onOpenConsultation={() => setIsConsultationOpen(true)} />

      </StickyHero>

      {/* -------------------- BOOKING MODAL INTERACTION -------------------- */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* -------------------- DIRECT CONSULTATION PAYLOAD MODAL -------------------- */}
      <DirectConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </div>
  );
}
