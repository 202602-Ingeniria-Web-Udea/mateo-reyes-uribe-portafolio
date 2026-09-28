"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  /** Fracción del desplazamiento del cursor que sigue el elemento. */
  strength?: number;
  className?: string;
}

/**
 * Envoltorio que atrae su contenido hacia el cursor mientras está encima y
 * lo suelta con un muelle al salir.
 *
 * Solo reacciona a ratón: con el dedo no hay "encima" y el botón se quedaría
 * desplazado tras el toque. Con `prefers-reduced-motion` no se mueve.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.4 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
