import { ProfilePanel } from "@/components/organisms/ProfilePanel";
import { cn } from "@/lib/utils";

export interface LeftSidebarProps {
  className?: string;
}

/**
 * Columna izquierda fija con la ficha personal.
 *
 * Aquí solo vive el posicionamiento; el contenido es `ProfilePanel`, que por
 * debajo de 1024 px se dibuja dentro del menú lateral desplegable.
 *
 * Sobre el posicionamiento: `sticky top-0` con `h-screen` mantiene la columna
 * a la vista mientras el contenido central se desplaza, y `overflow-y-auto`
 * le da su propio scroll cuando la ficha es más alta que la pantalla. Lleva
 * `self-start` porque el estirado por defecto de una celda de rejilla
 * (`align-items: stretch`) le daría la altura completa de la fila y dejaría
 * el `sticky` sin recorrido.
 *
 * La ocultación por debajo de `lg` la decide `MainLayout`, que es quien
 * conoce la composición de la página.
 */
export function LeftSidebar({ className }: LeftSidebarProps) {
  return (
    <aside
      aria-label="Profile"
      className={cn(
        "sticky top-0 h-screen w-sidebar shrink-0 self-start overflow-y-auto border-r border-line bg-surface/75 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      <ProfilePanel />
    </aside>
  );
}
