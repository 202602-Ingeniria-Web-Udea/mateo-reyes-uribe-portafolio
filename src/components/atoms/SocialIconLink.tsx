import type { IconType } from "react-icons";
import {
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import type { SocialIconName } from "@/types";

/**
 * Único punto del proyecto donde se usan iconos de marca. Al tiparlo como
 * `Record<SocialIconName, IconType>`, TypeScript obliga a que cada marca
 * declarada en `src/types` tenga aquí su logo.
 */
const BRAND_ICONS: Record<SocialIconName, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  dribbble: FaDribbble,
};

export interface SocialIconLinkProps {
  icon: SocialIconName;
  url: string;
  /** Nombre de la red. Se usa como etiqueta accesible del enlace. */
  name: string;
  /** Lado del círculo en píxeles. */
  size?: number;
  className?: string;
}

/**
 * Enlace circular a una red social.
 *
 * En reposo lleva un tinte accent diluido, para que no se funda con las
 * columnas laterales. Al pasar el cursor se llena del degradado neón, el logo
 * pasa a blanco, brilla y el círculo crece un 10 %. Abre en una pestaña nueva
 * con `rel="noopener noreferrer"`, que evita que la página destino pueda
 * manipular la nuestra a través de `window.opener`.
 */
export function SocialIconLink({
  icon,
  url,
  name,
  size = 40,
  className,
}: SocialIconLinkProps) {
  const Icon = BRAND_ICONS[icon];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      title={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        "border border-accent/20 bg-accent-soft text-accent shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-accent-deep hover:to-violet-deep hover:text-white hover:shadow-glow",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.45)} aria-hidden="true" />
    </a>
  );
}
