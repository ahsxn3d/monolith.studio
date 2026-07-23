"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "hover" | "text";

export function TacticalCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Framer Motion non-render-loop motion values for high-performance position tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high-frequency tracking with zero lag
  const springConfig = { damping: 25, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor entirely on touch devices or small screens
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    // Hide default system cursor
    document.body.classList.add("cursor-none");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener to detect hover vs text vs default targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or any of its ancestors are interactive elements
      const interactiveEl = target.closest("a, button, [role='button'], input[type='submit'], button *, a *");
      const textInputEl = target.closest("input[type='text'], input[type='email'], input[type='password'], input[type='search'], input[type='number'], textarea");
      const isTextBody = target.closest("p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code");

      if (interactiveEl) {
        setCursorState("hover");
      } else if (textInputEl || (isTextBody && !target.closest("button, a"))) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 z-[99999999] pointer-events-none select-none will-change-transform"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4">
        
        {/* Hover State: Glowing Outer Tactical Target Bracket */}
        {cursorState === "hover" && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* High-Precision Tactical Crosshair / Corner Brackets */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_0_8px_rgba(217,70,239,0.85)] animate-spin-slow"
            >
              {/* Top-Left Bracket */}
              <path d="M 6 12 L 6 6 L 12 6" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Top-Right Bracket */}
              <path d="M 30 12 L 30 6 L 24 6" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Bottom-Left Bracket */}
              <path d="M 6 24 L 6 30 L 12 30" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Bottom-Right Bracket */}
              <path d="M 30 24 L 30 30 L 24 30" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Precision Dot Guides */}
              <circle cx="18" cy="6" r="1" fill="#D946EF" />
              <circle cx="18" cy="30" r="1" fill="#D946EF" />
              <circle cx="6" cy="18" r="1" fill="#D946EF" />
              <circle cx="30" cy="18" r="1" fill="#D946EF" />
            </svg>
          </motion.div>
        )}

        {/* Tactical Pointer Core Element */}
        <motion.div
          animate={{
            scale: cursorState === "hover" ? 0.9 : cursorState === "text" ? 1.1 : 1,
            rotate: cursorState === "text" ? 90 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative flex items-center justify-center"
        >
          {cursorState === "text" ? (
            /* Text Hover State: High Precision Electronic Caret / Vertical Beam */
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_0_4px_rgba(217,70,239,0.7)]"
            >
              {/* Top Bracket */}
              <path d="M 2 4 H 10" stroke="#D946EF" strokeWidth="1.8" strokeLinecap="round" />
              {/* Vertical Caret Column */}
              <path d="M 6 4 V 20" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" style={{ mixBlendMode: "difference" }} />
              {/* Bottom Bracket */}
              <path d="M 2 20 H 10" stroke="#D946EF" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            /* Default Tactical Arrowhead / Vector Pointer */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]"
            >
              {/* High-Contrast Vector Arrowhead with Solid Matte Black Fill and Thin Pure White Border */}
              <path
                d="M 2 2 L 10 22 L 13.5 13.5 L 22 10 Z"
                fill="#0D0E11"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                style={{ mixBlendMode: "difference" }}
              />
              {/* Core Precision Red Center Point or Crosshairs */}
              <circle cx="8" cy="8" r="1.2" fill="#D946EF" />
            </svg>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
