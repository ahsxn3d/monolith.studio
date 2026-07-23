import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AtmosphericContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      e.preventDefault();
      setIsOpen(true);
      // Ensure menu stays within bounds
      const x = Math.min(e.clientX, window.innerWidth - 220);
      const y = Math.min(e.clientY, window.innerHeight - 250);
      setPosition({ x, y });
    };

    const handleClick = () => {
      if (isOpen) setIsOpen(false);
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    }

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Unified global component, CSS-isolated with explicit tailwind config inline mappings
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed z-[100000] min-w-[220px] overflow-hidden rounded-2xl bg-slate-950/80 p-2 backdrop-blur-[15px] border border-slate-800/60 pointer-events-auto"
          style={{ 
            top: position.y, 
            left: position.x,
            boxShadow: '0 10px 30px -5px rgba(192,38,211,0.5)' 
          }}
        >
          <div className="flex flex-col text-sm font-medium text-slate-300">
            <button className="flex w-full cursor-none items-center rounded-xl px-4 py-2.5 text-left hover:bg-[#D946EF]/20 hover:text-white transition-colors duration-200">
              <span className="mr-3 text-[#D946EF]">⎋</span> Inspect Interface
            </button>
            <button className="flex w-full cursor-none items-center rounded-xl px-4 py-2.5 text-left hover:bg-[#D946EF]/20 hover:text-white transition-colors duration-200">
              <span className="mr-3 text-[#D946EF]">⌘</span> Copy Deep Link
            </button>
            <button className="flex w-full cursor-none items-center rounded-xl px-4 py-2.5 text-left hover:bg-[#D946EF]/20 hover:text-white transition-colors duration-200">
              <span className="mr-3 text-[#D946EF]">⚡</span> System Diagnostics
            </button>
            
            <div className="my-1.5 h-px w-full bg-slate-800/60" />
            
            <div className="flex w-full cursor-none items-center justify-between rounded-xl px-4 py-2 text-[#D946EF] opacity-80">
              <span className="text-xs uppercase tracking-wider font-semibold">Atmospheric OS</span>
              <span className="text-[10px] bg-[#D946EF]/20 px-1.5 py-0.5 rounded border border-[#D946EF]/30">v1.2</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
