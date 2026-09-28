import { portfolioItems } from "@/data/portfolio";
import { programmingSkills } from "@/data/profile";
import { cn } from "@/lib/utils";

// Descriptores de proyecto que viven en `stack` pero no son tecnologías.
const NOT_TECH = new Set(["Full-stack"]);

export const TECH = Array.from(
  new Set([
    ...programmingSkills.map((skill) => skill.name),
    ...portfolioItems.flatMap((item) => item.stack),
  ]),
).filter((name) => !NOT_TECH.has(name));

// La segunda fila recorre la lista desde la mitad, para que las dos cintas
// no enseñen la misma tecnología una encima de otra.
const HALF = Math.ceil(TECH.length / 2);
const ROWS = [TECH, [...TECH.slice(HALF), ...TECH.slice(0, HALF)]];

export interface TechMarqueeProps {
  className?: string;
}

/**
 * Dos cintas infinitas con el stack, en sentidos opuestos. Cada lista va
 * duplicada y la animación desplaza exactamente la mitad, así el salto al
 * reiniciar es invisible.
 *
 * Solo la primera copia de la primera fila se anuncia a lectores de
 * pantalla: el resto son repeticiones visuales de la misma lista.
 */
export function TechMarquee({ className }: TechMarqueeProps) {
  return (
    <div className={cn("group mask-fade-x relative space-y-3 overflow-hidden py-2", className)}>
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            "flex w-max gap-3 group-hover:[animation-play-state:paused]",
            rowIndex === 0 ? "animate-marquee" : "animate-marquee-reverse",
          )}
        >
          {[0, 1].map((copy) => {
            const isAnnounced = rowIndex === 0 && copy === 0;
            return (
              <ul
                key={copy}
                aria-hidden={isAnnounced ? undefined : true}
                aria-label={isAnnounced ? "Tech stack" : undefined}
                className="flex shrink-0 gap-3"
              >
                {row.map((name) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium tracking-snug text-ink-soft shadow-sm backdrop-blur transition-colors duration-200 hover:border-accent/50 hover:text-accent-bright"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-bright to-violet-deep shadow-[0_0_8px_rgb(129_140_248/0.9)]"
                    />
                    {name}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      ))}
    </div>
  );
}
