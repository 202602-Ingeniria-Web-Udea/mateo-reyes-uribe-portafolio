"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Tag } from "@/components/atoms/Tag";
import { Modal } from "@/components/molecules/Modal";
import { PortfolioCard } from "@/components/molecules/PortfolioCard";
import { ProjectImage } from "@/components/molecules/ProjectImage";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";

/** Reserva por si el carrusel se midiera antes de que las cards tengan ancho. */
const FALLBACK_STEP = 320;

export interface PortfolioSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

/**
 * Carrusel horizontal de proyectos con modal de detalle.
 *
 * El desplazamiento es scroll nativo con puntos de anclaje (`snap-x`), no un
 * carrusel a base de transformaciones: así funciona con el dedo, con la rueda
 * del ratón y con el teclado sin escribir nada para cada caso. Las flechas
 * solo empujan ese mismo scroll.
 *
 * La barra de desplazamiento se oculta pero el scroll sigue existiendo, de
 * modo que el contenedor lleva `tabIndex` y una etiqueta: una zona
 * desplazable a la que no se puede llegar con el tabulador deja fuera a quien
 * no usa ratón.
 */
export function PortfolioSection({
  id = "work",
  className,
}: PortfolioSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );

  /**
   * Desplaza el carrusel el ancho de una card.
   *
   * El paso se mide sobre la primera card en lugar de fijarse a un número,
   * porque el ancho cambia entre móvil y escritorio.
   */
  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstCard ? firstCard.offsetWidth + gap : FALLBACK_STEP;

    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Work"
          index="04"
          title="Recent work"
          subtitle="A few things I have built, at work and on my own time."
        />

        {/* En móvil sobran: ahí se arrastra con el dedo. */}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous projects"
            aria-controls={`${id}-carousel`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-mute shadow-sm backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-bright hover:shadow-glow"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next projects"
            aria-controls={`${id}-carousel`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-mute shadow-sm backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-bright hover:shadow-glow"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        id={`${id}-carousel`}
        role="region"
        aria-label="Projects"
        tabIndex={0}
        // `scrollbar-none` es una utilidad propia definida en globals.css:
        // oculta la barra sin desactivar el desplazamiento.
        // El relleno vertical deja sitio a la elevación y al resplandor de las
        // cards en hover, que el scroll horizontal recortaría.
        className="scrollbar-none mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-3"
      >
        {portfolioItems.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            shortDescription={item.shortDescription}
            imageUrl={item.imageUrl}
            liveUrl={item.liveUrl}
            comingSoon={item.comingSoon}
            onOpenDetails={() => setSelectedProject(item)}
            className="w-card shrink-0 snap-start sm:w-card-lg"
          />
        ))}
      </div>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        className="max-w-3xl"
      >
        {selectedProject && (
          <div className="space-y-5">
            <ProjectImage
              src={selectedProject.imageUrl}
              alt={`Preview of ${selectedProject.title}`}
              sizes="(min-width: 768px) 48rem, 100vw"
              className="aspect-video w-full rounded-xl"
            />

            <p className="text-sm leading-reading text-ink-soft">
              {selectedProject.longDescription}
            </p>

            {/* Stack del proyecto, tal y como se declara en src/data. */}
            <ul className="flex flex-wrap gap-2">
              {selectedProject.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>

            {/* Cada enlace solo aparece si el proyecto lo tiene. */}
            {(selectedProject.liveUrl ||
              selectedProject.repoUrl ||
              selectedProject.comingSoon) && (
              <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neon inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold tracking-snug text-white shadow-glow transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-glow-lg"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Visit live site
                  </a>
                )}
                {selectedProject.comingSoon && (
                  <span className="inline-flex h-10 items-center gap-2 rounded-md border border-dashed border-violet/50 bg-accent-soft px-4 text-sm font-semibold tracking-snug text-violet">
                    <Clock size={16} aria-hidden="true" />
                    Live demo coming soon
                  </span>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface-raised px-4 text-sm font-medium tracking-snug text-ink-soft shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-bright hover:shadow-glow"
                  >
                    <GitBranch size={16} aria-hidden="true" />
                    View code
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
