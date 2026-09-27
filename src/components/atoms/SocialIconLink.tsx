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
 * En reposo lleva un tinte accent muy diluido (no blanco liso: sobre las
 * columnas laterales, que también son `bg-surface`, un círculo blanco se
 * fundía con el fondo y quedaba invisible salvo por el borde). Al pasar el
 * cursor se llena de accent sólido, el logo pasa a blanco y el círculo crece
 * un 10 %. Abre en una pestaña nueva con `rel="noopener noreferrer"`, que
 * evita que la página destino pueda manipular la nuestra a través de
 * `window.opener`.
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
        "border border-accent/15 bg-accent-soft text-accent shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-accent hover:to-accent-deep hover:text-white hover:shadow-md",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.45)} aria-hidden="true" />
    </a>
  );
}
