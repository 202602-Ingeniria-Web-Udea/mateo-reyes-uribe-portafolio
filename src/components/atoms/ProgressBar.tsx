"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  /** Porcentaje de 0 a 100. Los valores fuera de rango se recortan. */
  level: number;
  /**
   * Etiqueta accesible. La barra no dibuja texto: quien la use decide cómo
   * mostrar el nombre y el porcentaje alrededor.
   */
  ariaLabel?: string;
  /** Duración de la animación en segundos. */
  duration?: number;
  /** Grosor de la barra en píxeles. */
  thickness?: number;
  className?: string;
}

/**
 * Barra de progreso para niveles de idioma o de stack técnico.
 *
 * Es deliberadamente fina: una columna con ocho barras gruesas se convierte
 * en un muro de rectángulos de color. Con 5 px, la pista casi desaparece y lo
 * que se lee es el nombre, que es el dato que importa.
 *
 * El relleno crece de 0 hasta `level` la primera vez que la barra entra en
 * pantalla (`whileInView` con `once: true`), de modo que la animación se ve
 * al hacer scroll y no se repite al volver a pasar.
 */
export function ProgressBar({
  level,
  ariaLabel,
  duration = 1.1,
  thickness = 5,
  className,
}: ProgressBarProps) {
  const value = Math.round(Math.min(100, Math.max(0, level)));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn(
        "w-full overflow-hidden rounded-full bg-line-soft",
        className,
      )}
      style={{ height: thickness }}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-deep via-violet-deep to-accent shadow-[0_0_12px_rgb(129_140_248/0.7)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
