/**
 * Nombre en PascalCase de un icono de `lucide-react` registrado en
 * `src/lib/icons.ts` (por ejemplo `"Code"` o `"Database"`).
 *
 * El tipo se deriva del registro y no de la librería entera, porque importar
 * lucide-react completo para resolver iconos por nombre impide descartar los
 * que no se usan. Si necesitas uno que todavía no está, añádelo al registro.
 */
import type { LucideIconName } from "@/lib/icons";

export type { LucideIconName };

/**
 * Marcas admitidas en los enlaces sociales. Se renderizan con `react-icons`,
 * que en este proyecto se reserva exclusivamente para logos de marca.
 */
export type SocialIconName =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "youtube"
  | "dribbble";

/** Estado de disponibilidad que se muestra como badge junto al nombre. */
export type AvailabilityStatus = "available" | "busy";

/**
 * Nivel de dominio expresado como porcentaje entre 0 y 100.
 * TypeScript no puede acotar el rango, así que la validación queda aquí
 * como contrato: las barras de progreso asumen esa escala.
 */
export type SkillLevel = number;

export interface Profile {
  name: string;
  role: string;
  /**
   * Palabra del `role` que se pinta en accent en el Hero. Debe aparecer tal
   * cual dentro de `role`; si no coincide, el rol se dibuja entero sin
   * resaltar, sin romper nada.
   */
  roleHighlight?: string;
  status: AvailabilityStatus;
  /** Correo de contacto. Se enlaza con `mailto:`; el portafolio no tiene backend. */
  email: string;
  /** Teléfono de contacto. Se enlaza con `tel:`. */
  phone: string;
  /** Ciudad y país de residencia. */
  residence: string;
  /** Formación en curso, resumida en una línea para la ficha lateral. */
  studies: string;
  /** Qué se está buscando, por ejemplo `"Internship 2027-1"`. */
  availability: string;
  /** Ruta dentro de `public/`, por ejemplo `"/images/avatar.jpg"`. */
  avatarUrl: string;
  /** Texto corto bajo el nombre, en el Hero. */
  heroDescription: string;
  /** Biografía extensa que abre el modal del botón del Hero. */
  bioLong: string;
}

export interface LanguageSkill {
  name: string;
  level: SkillLevel;
}

export interface ProgrammingSkill {
  name: string;
  level: SkillLevel;
}

export interface ExtraSkill {
  label: string;
  icon: LucideIconName;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIconName;
}

/**
 * Entrada de la línea de tiempo: sirve tanto para un puesto de trabajo como
 * para una etapa de formación, porque ambos se describen igual —dónde, qué,
 * cuándo y qué salió de ahí— y comparten la misma presentación.
 */
export interface ExperienceItem {
  id: string;
  /** Organización: empresa o centro de estudios. */
  institution: string;
  /** Puesto ocupado o programa cursado. */
  title: string;
  /** Matiz del vínculo: "Part-time", "8th semester", "Academic project"... */
  role: string;
  /**
   * Rango temporal legible, por ejemplo `"Jun 2025 — Present"`. Opcional:
   * algunas entradas (roles en curso sin fecha de cierre definida) prefieren
   * no mostrar fecha.
   */
  period?: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  /** Resumen de una línea para la card. */
  shortDescription: string;
  /** Detalle que se muestra al abrir el proyecto. */
  longDescription: string;
  /** Stack usado, para mostrarlo como etiquetas en el detalle. */
  stack: string[];
  /** Ruta dentro de `public/images/portfolio/`. */
  imageUrl: string;
  repoUrl?: string;
  liveUrl?: string;
  /** Proyecto aún sin despliegue público: se marca como "Coming soon". */
  comingSoon?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIconName;
}
