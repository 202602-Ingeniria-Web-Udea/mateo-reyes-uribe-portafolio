"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tag } from "@/components/atoms/Tag";
import {
  VIEWPORT_ONCE,
  entranceTransition,
  noMotion,
  slideInLeft,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ExperienceItemProps {
  /** Organización: empresa o centro de estudios. */
  institution: string;
  /** Rango temporal legible; se muestra dentro de un `Tag`. Opcional. */
  period?: string;
  /** Puesto ocupado o programa cursado. */
  title: string;
  description: string;
  /** Matiz del vínculo: "Part-time", "8th semester"... Opcional. */
  role?: string;
  /** Posición en la lista, solo para escalonar la entrada. */
  index?: number;
  className?: string;
}

/**
 * Entrada de la línea de tiempo profesional y académica.
 *
 * Aparece deslizándose desde la izquierda, en la misma dirección en que se
 * lee la línea de tiempo.
 *
 * El eje vertical y el punto son decorativos y se dibujan con
 * pseudoelementos posicionados, no con un borde: un borde izquierdo recorre
 * el alto completo del bloque y no permite marcar el hito. Con un punto a la
 * altura del título, la lista se lee como una cronología y no como una
 * sucesión de párrafos sangrados.
 */
export function ExperienceItem({
  institution,
  period,
  title,
  description,
  role,
  index = 0,
  className,
}: ExperienceItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={shouldReduceMotion ? noMotion : slideInLeft}
      transition={entranceTransition(index)}
      className={cn("group relative pl-7", className)}
    >
      {/* Eje de la cronología, centrado bajo el punto. */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 h-full w-0.5 rounded-full bg-gradient-to-b from-accent via-violet/30 to-transparent"
      />
      {/* Hito, a la altura del nombre de la institución. */}
      <span aria-hidden="true" className="absolute left-0 top-1 flex h-3 w-3">
        {index === 0 && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-accent-bright to-violet-deep shadow-[0_0_12px_rgb(129_140_248/0.9)] ring-4 ring-accent-soft transition-transform duration-300 ease-out group-hover:scale-125" />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-lg font-semibold tracking-snug text-ink transition-colors duration-300 group-hover:text-accent-bright">
          {institution}
        </h3>
        {period && <Tag icon="Calendar">{period}</Tag>}
      </div>

      <p className="mt-1.5 text-sm font-medium text-ink-soft">
        {title}
        {role && <span className="font-normal text-muted"> · {role}</span>}
      </p>
      <p className="mt-2.5 max-w-measure text-sm leading-relaxed text-muted">
        {description}
      </p>
    </motion.article>
  );
}
