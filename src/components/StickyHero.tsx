import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

interface StickyHeroProps {
  heroContent?: React.ReactNode;
  children?: React.ReactNode;
}

export function StickyHero({ heroContent, children }: StickyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // True "Squishy" Mac-OS Genie Effect
  // We squish it vertically much harder than horizontally to create that flattening effect
  const scaleX = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]); 
  const scaleY = useTransform(scrollYProgress, [0, 0.8], [1, 0.05]); // Extreme vertical squish!
  const y = useTransform(scrollYProgress, [0, 0.8], ["0vh", "50vh"]); // Suck down to the bottom dock
  const containerOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]); 
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ["0px", "300px"]); // Extreme pill shape
  const blurValue = useTransform(scrollYProgress, [0, 0.8], [0, 30]);
  const blurStr = useTransform(blurValue, v => `blur(${v}px)`);

  // Hero text fades out smoothly
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <div ref={containerRef} className="relative w-full h-[120vh] md:h-[150vh]">
        
        {/* Sticky container stays pinned to viewport for the first scroll */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-start">
          
          {/* The Animated Squishy Box */}
          <motion.div 
            className="relative h-full w-full origin-bottom overflow-hidden bg-[#030014] shadow-[0_0_50px_rgba(217,70,239,0.2)]"
            style={{ 
              scaleX,
              scaleY, 
              y,
              opacity: containerOpacity,
              borderRadius,
              filter: blurStr
            }}
          >
            {/* Background Image (Mobile: < 768px) */}
            <Image 
              src="/assets/hero-bg1.jpeg" 
              alt="Hero Background Mobile" 
              fill
              sizes="100vw"
              priority={false}
              loading="lazy"
              className="object-cover object-center block md:hidden"
            />
            {/* Background Image (Desktop: >= 768px) */}
            <Image 
              src="/assets/hero-bg.jpeg" 
              alt="Hero Background Desktop" 
              fill
              sizes="100vw"
              priority
              className="object-cover object-center hidden md:block"
            />

            {/* Hero Content */}
            {heroContent && (
              <motion.div 
                className="absolute inset-0 flex flex-col items-center pt-10 md:pt-32"
                style={{ opacity: heroOpacity }}
              >
                {heroContent}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* The rest of the application starts exactly after the squish finishes */}
      <div className="relative z-10 w-full -mt-10">
        <div className="relative min-h-[100dvh] w-full">
          {children}
        </div>
      </div>
    </>
  );
}
