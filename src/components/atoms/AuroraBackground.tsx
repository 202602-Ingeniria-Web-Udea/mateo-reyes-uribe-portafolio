import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps {
  className?: string;
}

/**
 * Fondo aurora fijo detrás de toda la página: tres manchas de luz indigo y
 * violeta, muy desenfocadas, que derivan despacio.
 *
 * Es CSS puro (sin JavaScript ni Framer Motion) porque se anima durante toda
 * la visita: con `transform` y `will-change` el navegador lo resuelve en la
 * GPU sin tocar el hilo principal. Con `prefers-reduced-motion`, la regla
 * global de `globals.css` congela las manchas en su sitio.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <span className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-accent-deep/25 blur-[120px] will-change-transform" />
      <span className="absolute -right-[15%] top-[10%] h-[55vmax] w-[55vmax] animate-aurora-slow rounded-full bg-violet-deep/20 blur-[130px] will-change-transform" />
      <span className="absolute -bottom-[25%] left-[25%] h-[50vmax] w-[50vmax] animate-aurora rounded-full bg-accent/10 blur-[140px] will-change-transform [animation-delay:-9s]" />
      {/* Rejilla que se desvanece hacia abajo, para dar textura al negro. */}
      <span className="surface-grid mask-fade-down absolute inset-0" />
    </div>
  );
}
