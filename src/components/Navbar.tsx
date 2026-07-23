import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  onBookCallClick: () => void;
}

export function Navbar({ onBookCallClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Capabilities", href: "#features" },
    { label: "Principles", href: "#principles" },
    { label: "Process", href: "#workflow" },
    { label: "Deployments", href: "#deployments" },
    { label: "Estimator", href: "#estimator" },
    { label: "Dev Portal", href: "#auth" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/70 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(217,70,239,0.2)]">
              <Image src="/assets/logo.png" alt="Monolith Logo" fill sizes="32px" className="object-contain" priority />
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white">
              Monolith<span className="text-fuchsia-500">.</span>Studio
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Book Call Button CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onBookCallClick}
              className="px-5 py-2.5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-xs font-mono font-bold text-white tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] flex items-center gap-2"
            >
              Book a Call
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-xl md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col justify-center h-full p-8 space-y-8">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-display font-medium text-slate-300 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookCallClick();
            }}
            className="w-full py-4 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-sm font-mono font-bold text-white tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]"
          >
            Book a Call
          </button>
        </div>
      </div>
    </>
  );
}
