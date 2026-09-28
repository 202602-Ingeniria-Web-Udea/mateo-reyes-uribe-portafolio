import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { socialLinks } from "@/data/profile";
import { cn } from "@/lib/utils";

export interface RightSidebarProps {
  className?: string;
}

/**
 * Columna derecha fija con los enlaces a redes.
 *
 * Es una barra estrecha: solo iconos, sin texto, centrados verticalmente en
 * la pantalla. El nombre de cada red viaja en el `aria-label` del átomo
 * `SocialIconLink`, así que la ausencia de texto visible no deja a nadie sin
 * saber adónde lleva cada enlace.
 *
 * La lista sale entera de `socialLinks` en `src/data/profile.ts`: para
 * añadir o quitar una red se edita ese archivo y nada más. GitHub y LinkedIn
 * son el mínimo que debería quedar siempre.
 *
 * Igual que la columna izquierda, usa `sticky top-0` con `h-screen` y
 * `self-start`, que evita que el estirado por defecto del contenedor flex
 * anule el recorrido del `sticky`.
 */
export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen w-social shrink-0 self-start flex-col items-center justify-center gap-6 border-l border-line bg-surface/75 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      {/* Hilos de luz arriba y abajo: enmarcan los iconos en la columna. */}
      <span
        aria-hidden="true"
        className="h-24 w-px bg-gradient-to-b from-transparent to-accent/60"
      />
      <nav aria-label="Social links">
        <ul className="flex flex-col items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <SocialIconLink
                icon={link.icon}
                url={link.url}
                name={link.name}
              />
            </li>
          ))}
        </ul>
      </nav>
      <span
        aria-hidden="true"
        className="h-24 w-px bg-gradient-to-b from-violet/60 to-transparent"
      />
    </aside>
  );
}
