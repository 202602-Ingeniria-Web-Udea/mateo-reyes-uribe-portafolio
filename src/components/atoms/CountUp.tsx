"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export interface CountUpProps {
  /** Valor final. */
  to: number;
  /** Duración en segundos. */
  duration?: number;
  /** Texto pegado tras el número, por ejemplo `"+"`. */
  suffix?: string;
  className?: string;
}

/**
 * Número que cuenta desde cero hasta `to` la primera vez que entra en
 * pantalla.
 *
 * Escribe directamente en el nodo con `textContent` en lugar de pasar por el
 * estado de React: son sesenta actualizaciones por segundo y ninguna necesita
 * re-renderizar el componente. El HTML inicial ya lleva el valor final, así
 * que sin JavaScript, o con `prefers-reduced-motion`, se ve el número correcto.
 */
export function CountUp({ to, duration = 1.6, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView || shouldReduceMotion) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, to, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
