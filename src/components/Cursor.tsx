import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Track raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Elite, lightweight tech performance spring physics as requested
  const springConfig = { stiffness: 400, damping: 28, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices to maintain standard touch interactions
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Offset by 2px to align the sharp (2, 2) SVG point precisely with the mouse coordinate
      mouseX.set(e.clientX - 2);
      mouseY.set(e.clientY - 2);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or its ancestor is interactive or has pointer cursor
      const isInteractive = 
        target.closest('a, button, input, select, textarea, [role="button"]') || 
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999999] hidden md:block"
    >
      {/* Precision Cyber-Arrow and Reticle SVG */}
      <motion.div
        animate={{
          scale: isClicked ? 0.85 : 1,
          rotate: isHovering ? 360 : 0,
          filter: isClicked 
            ? "drop-shadow(0 0 12px rgba(217,70,239,1))" 
            : "drop-shadow(0 0 8px rgba(217,70,239,0.7))",
        }}
        transition={{
          rotate: isHovering 
            ? { repeat: Infinity, duration: 2, ease: "linear" } 
            : { duration: 0.3, ease: "easeOut" },
          scale: { duration: 0.1, ease: [0.16, 1, 0.3, 1] as const },
          filter: { duration: 0.1, ease: [0.16, 1, 0.3, 1] as const }
        }}
        className="w-full h-full select-none origin-center"
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-fuchsia-500"
        >
          {/* Main sleek aerospace pointer arrow */}
          <path
            d="M2 2L14 30L19 19L30 14L2 2Z"
            fill="rgba(217, 70, 239, 0.12)"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="miter"
          />
          {/* Tactical crosshair elements */}
          <circle
            cx="19"
            cy="19"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          {/* Vertical indicator notches */}
          <line x1="19" y1="11" x2="19" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="19" y1="24.5" x2="19" y2="27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* Horizontal indicator notches */}
          <line x1="11" y1="19" x2="13.5" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="24.5" y1="19" x2="27" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

