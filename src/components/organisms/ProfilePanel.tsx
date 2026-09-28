import type { ReactNode } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { ExtraSkillItem } from "@/components/molecules/ExtraSkillItem";
import { InfoRow } from "@/components/molecules/InfoRow";
import { SkillItem } from "@/components/molecules/SkillItem";
import {
  extraSkills,
  languages,
  profile,
  programmingSkills,
} from "@/data/profile";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";

/**
 * Texto de cada estado de disponibilidad. Al tiparlo como `Record`, añadir un
 * estado nuevo en `@/types` obliga a darle aquí su etiqueta en lugar de
 * dejar un hueco vacío en la interfaz.
 */
const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: "Available",
  busy: "Busy",
};

interface PanelSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Bloque con título pequeño en versales y un filete que lo acompaña.
 *
 * No usa el átomo `SectionHeading`, que está calibrado para los títulos de
 * las secciones principales: en una columna de 300 px aplastaría todo lo
 * demás. El filete a la derecha de la etiqueta reproduce, en pequeño, el
 * mismo recurso del `Eyebrow`, de modo que la columna y el centro se leen
 * como parte del mismo sistema.
 */
function PanelSection({ title, children }: PanelSectionProps) {
  return (
    <section className="border-t border-line-soft px-6 py-6">
      <div className="mb-5 flex items-center gap-3">
        <h3 className="shrink-0 text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-mute">
          {title}
        </h3>
        <span aria-hidden="true" className="h-px flex-1 rule-fade" />
      </div>
      {children}
    </section>
  );
}

export interface ProfilePanelProps {
  className?: string;
}

/**
 * Contenido de la ficha personal: foto con el estado, nombre, rol, datos
 * personales, idiomas, lenguajes y habilidades extra.
 *
 * Está separado de su contenedor a propósito. En escritorio lo enmarca
 * `LeftSidebar` como columna fija; por debajo de 1024 px el mismo bloque se
 * dibuja dentro del menú lateral desplegable, sin duplicar ni una línea.
 *
 * Toda la información sale de `src/data/profile.ts`: aquí no hay ni un dato
 * escrito a mano.
 */
export function ProfilePanel({ className }: ProfilePanelProps) {
  const isAvailable = profile.status === "available";
  const statusLabel = STATUS_LABELS[profile.status];

  return (
    <div className={className}>
      {/*
        Cabecera de la ficha: una portada neón con textura de rejilla y la
        foto montada a caballo entre la portada y el cuerpo de la ficha.
      */}
      <div className="relative flex flex-col items-center px-6 pb-7 pt-12 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 overflow-hidden bg-gradient-to-br from-accent-night via-accent-deep to-violet-deep"
        >
          <span className="surface-grid absolute inset-0 opacity-60" />
          <span className="absolute -right-8 -top-10 h-32 w-32 animate-float rounded-full bg-violet/50 blur-2xl" />
          <span className="absolute -bottom-12 -left-6 h-28 w-28 animate-float rounded-full bg-accent/40 blur-2xl [animation-delay:-3s]" />
        </div>
        <Avatar
          src={profile.avatarUrl}
          alt={profile.name}
          size={104}
          className="relative border-4 border-surface shadow-glow"
        />

        <h2 className="mt-5 text-lg font-bold tracking-snug text-ink">
          {profile.name}
        </h2>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {profile.role}
        </p>

        {/*
          El estado como pastilla y no como un punto suelto sobre la foto: así
          se lee de un vistazo y el texto acompaña siempre al color, en lugar
          de depender de que se entienda qué significa un punto verde.
        */}
        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
            // Versales con tracking corto: el de las etiquetas de sección
            // (0.18em) deja la pastilla desproporcionadamente ancha.
            "text-eyebrow font-semibold uppercase tracking-wider",
            isAvailable
              ? "border-success/20 bg-success/5 text-success"
              : "border-line bg-line-soft text-ink-mute",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isAvailable ? "animate-pulse bg-success" : "bg-muted",
            )}
          />
          {statusLabel}
        </span>
      </div>

      <PanelSection title="About">
        <dl className="divide-y divide-line-soft">
          <InfoRow label="Location" value={profile.residence} />
          <InfoRow label="Studies" value={profile.studies} />
          <InfoRow
            label="Phone"
            valueColor="accent"
            value={
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {profile.phone}
              </a>
            }
          />
          <InfoRow
            label="Open to"
            value={profile.availability}
            valueColor={isAvailable ? "success" : "default"}
          />
        </dl>
      </PanelSection>

      <PanelSection title="Languages">
        <div className="space-y-4">
          {languages.map((language) => (
            <SkillItem
              key={language.name}
              name={language.name}
              level={language.level}
            />
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Programming">
        <div className="space-y-4">
          {programmingSkills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Soft skills">
        <div className="space-y-3">
          {extraSkills.map((skill) => (
            <ExtraSkillItem
              key={skill.label}
              label={skill.label}
              icon={skill.icon}
            />
          ))}
        </div>
      </PanelSection>
    </div>
  );
}
