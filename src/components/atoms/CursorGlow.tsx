"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Mancha de luz indigo que sigue al cursor por detrás del contenido.
 * Permanece invisible hasta que se mueve un ratón: con el dedo no hay
 * cursor que seguir y se quedaría clavada donde fue el último toque.
 */
export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    function handleMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    }

    function handleLeave() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [shouldReduceMotion, x, y, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, opacity }}
      className="pointer-events-none fixed left-0 top-0 z-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(129_140_248/0.16),rgb(124_58_237/0.08)_40%,transparent_70%)] transition-opacity duration-500"
    />
  );
}
