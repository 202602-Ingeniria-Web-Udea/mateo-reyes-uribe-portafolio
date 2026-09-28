"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina en el borde superior que se llena al avanzar por la página.
 * El muelle suaviza los saltos de la rueda del ratón.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent-deep via-violet to-accent-bright shadow-[0_0_12px_rgb(167_139_250/0.8)]"
    />
  );
}
