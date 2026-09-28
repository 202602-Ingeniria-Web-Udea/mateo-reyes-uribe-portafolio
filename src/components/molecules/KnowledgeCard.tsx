"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconBadge } from "@/components/atoms/IconBadge";
import {
  ENTRANCE_TRANSITION,
  VIEWPORT_ONCE,
  entranceTransition,
  fadeInUp,
  noMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export interface KnowledgeCardProps {
  /** Título del área de conocimiento. */
  title: string;
  description: string;
  /** Nombre del icono registrado en `src/lib/icons.ts`. */
  icon: LucideIconName;
  /**
   * Posición dentro de la rejilla. Solo se usa para escalonar la entrada, de
   * manera que las cards aparezcan una tras otra en vez de todas a la vez.
   * Se ignora si `staggered` está activo.
   */
  index?: number;
  /**
   * Actívalo cuando la card viva dentro de un contenedor con
   * `staggerChildren`: entonces el padre dirige la entrada y la card solo
   * declara sus variantes. Si además declarase `initial` y `whileInView`
   * dejaría de escuchar al padre y el escalonado no ocurriría.
   */
  staggered?: boolean;
  className?: string;
}

/**
 * Card de la rejilla de conocimientos.
 *
 * Entra con `fadeInUp` la primera vez que asoma en pantalla. Al pasar el
 * cursor sube un píxel, gana sombra y el borde se tiñe del accent, siguiendo
 * la regla del sistema: `shadow-sm` en reposo, `shadow-md` en hover, siempre
 * con transición.
 *
 * Lleva además un filete superior que aparece solo en hover. Es el detalle
 * que distingue la card de un rectángulo con borde: el accent entra por
 * arriba, marca la pieza señalada y desaparece al salir.
 *
 * La elevación se hace con `translate` de CSS y no con Framer Motion para no
 * pelearse con la transformación de la animación de entrada.
 */
export function KnowledgeCard({
  title,
  description,
  icon,
  index = 0,
  staggered = false,
  className,
}: KnowledgeCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Sin `staggered`, la card se anima sola al entrar en pantalla y usa su
  // posición para retrasarse. Con `staggered`, el reloj lo lleva el padre.
  const selfAnimation = staggered
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT_ONCE };

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <motion.article
      {...selfAnimation}
      variants={shouldReduceMotion ? noMotion : fadeInUp}
      transition={staggered ? ENTRANCE_TRANSITION : entranceTransition(index)}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-sm",
        "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-glow",
        className,
      )}
    >
      {/*
        Borde giratorio: un barrido cónico enorme gira detrás y una capa
        del color de la card, dos píxeles más pequeña, lo tapa salvo en el filo.
      */}
      <span
        aria-hidden="true"
        className="ring-conic pointer-events-none absolute -inset-[60%] animate-spin-slow opacity-0 transition-opacity duration-300 [animation-duration:4s] group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] rounded-[10px] bg-surface"
      />
      <span
        aria-hidden="true"
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Filete de accent que entra por el borde superior en hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-gradient-to-r from-accent-deep via-violet to-accent-bright transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <IconBadge
        icon={icon}
        shape="square"
        size={48}
        className="relative transition-all duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:from-accent-deep group-hover:to-violet-deep group-hover:text-white group-hover:shadow-glow"
      />

      <h3 className="relative mt-5 text-lg font-semibold tracking-snug text-ink transition-colors duration-300 group-hover:text-accent-bright">
        {title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
        {description}
      </p>
    </motion.article>
  );
}
