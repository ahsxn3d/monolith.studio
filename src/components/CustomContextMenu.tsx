"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Copy, Scissors, Clipboard, Code, Check } from "lucide-react";

export function CustomContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      e.preventDefault();
      
      const menuWidth = 220;
      const menuHeight = 220;
      
      const x = Math.min(e.clientX, window.innerWidth - menuWidth - 12);
      const y = Math.min(e.clientY, window.innerHeight - menuHeight - 12);
      
      setCoords({ x, y });
      setIsOpen(true);
      setActionNotice(null);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClose);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleClose, { passive: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  const showFeedback = (message: string) => {
    setActionNotice(message);
    setTimeout(() => {
      setActionNotice(null);
      setIsOpen(false);
    }, 1000);
  };

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.reload();
  };

  const handleCopySelection = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const selection = window.getSelection()?.toString() || "";
    if (selection.trim() !== "") {
      try {
        await navigator.clipboard.writeText(selection);
        showFeedback("Copied Text!");
      } catch (err) {
        console.error("Clipboard failure: ", err);
      }
    } else {
      showFeedback("No text selected");
    }
  };

  const handleCutSelection = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const selection = window.getSelection()?.toString() || "";
    if (selection.trim() !== "") {
      try {
        await navigator.clipboard.writeText(selection);
        window.getSelection()?.removeAllRanges();
        showFeedback("Cut Text!");
      } catch (err) {
        console.error("Clipboard failure: ", err);
      }
    } else {
      showFeedback("No text selected");
    }
  };

  const handlePasteSelection = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        showFeedback("Paste Action Mocked");
      } else {
        showFeedback("Clipboard Empty");
      }
    } catch (err) {
      showFeedback("Mock Paste Activated");
    }
  };

  const handleViewSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    window.open("https://github.com/google-gemini", "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            top: coords.y,
            left: coords.x,
          }}
          className="fixed w-[220px] bg-slate-950/80 backdrop-blur-[15px] border border-fuchsia-500/30 text-slate-300 z-[9999999] shadow-[0_10px_30px_-5px_rgba(192,38,211,0.5)] select-none rounded-2xl py-2 px-1.5"
        >
          {actionNotice && (
            <div className="absolute inset-0 bg-slate-950/95 rounded-2xl flex items-center justify-center gap-2 border border-fuchsia-500/40">
              <Check size={14} className="text-fuchsia-400 animate-pulse" />
              <span className="text-xs font-mono text-fuchsia-300 tracking-wider font-semibold uppercase">
                {actionNotice}
              </span>
            </div>
          )}

          <ul className="flex flex-col gap-0.5">
            <li>
              <button
                onClick={handleReload}
                className="w-full text-left px-3 py-2 text-[12px] font-sans tracking-wide flex items-center gap-3 rounded-xl hover:bg-fuchsia-600/20 hover:text-white hover:translate-x-1 duration-200 transition-all text-slate-300"
              >
                <RefreshCw size={13} className="text-fuchsia-400 stroke-[1.5]" />
                <span>Reload Session</span>
              </button>
            </li>

            <li>
              <button
                onClick={handleCopySelection}
                className="w-full text-left px-3 py-2 text-[12px] font-sans tracking-wide flex items-center gap-3 rounded-xl hover:bg-fuchsia-600/20 hover:text-white hover:translate-x-1 duration-200 transition-all text-slate-300"
              >
                <Copy size={13} className="text-fuchsia-400 stroke-[1.5]" />
                <span>Copy Selection</span>
              </button>
            </li>

            <li>
              <button
                onClick={handleCutSelection}
                className="w-full text-left px-3 py-2 text-[12px] font-sans tracking-wide flex items-center gap-3 rounded-xl hover:bg-fuchsia-600/20 hover:text-white hover:translate-x-1 duration-200 transition-all text-slate-300"
              >
                <Scissors size={13} className="text-fuchsia-400 stroke-[1.5]" />
                <span>Cut Selection</span>
              </button>
            </li>

            <li>
              <button
                onClick={handlePasteSelection}
                className="w-full text-left px-3 py-2 text-[12px] font-sans tracking-wide flex items-center gap-3 rounded-xl hover:bg-fuchsia-600/20 hover:text-white hover:translate-x-1 duration-200 transition-all text-slate-300"
              >
                <Clipboard size={13} className="text-fuchsia-400 stroke-[1.5]" />
                <span>Paste Clipboard</span>
              </button>
            </li>

            <div className="my-1 border-t border-fuchsia-500/10 mx-2" />

            <li>
              <button
                onClick={handleViewSource}
                className="w-full text-left px-3 py-2 text-[12px] font-sans tracking-wide flex items-center gap-3 rounded-xl hover:bg-fuchsia-600/20 hover:text-white hover:translate-x-1 duration-200 transition-all text-slate-300"
              >
                <Code size={13} className="text-fuchsia-400 stroke-[1.5]" />
                <span>View Source</span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
