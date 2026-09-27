import type { ExperienceItem } from "@/types";

/**
 * Línea de tiempo profesional y académica, de más reciente a más antigua.
 * El orden del array es el orden en que se renderiza.
 *
 * Trabajo y formación comparten lista a propósito: ambos se describen con los
 * mismos campos y, en una hoja de vida de estudiante, separarlos en dos
 * bloques deja dos listas de una sola entrada.
 */
export const experienceItems: ExperienceItem[] = [
  {
    id: "udea-school-factory-monitor",
    institution: "Universidad de Antioquia",
    title: "School Factory Monitor",
    role: "Part-time",
    description:
      "Support for the Scrum ceremonies and backlog management of the school factory's development teams, with hands-on involvement across backend development, databases, quality assurance, requirements gathering and overall project follow-up.",
  },
  {
    id: "udea-systems-engineering",
    institution: "Universidad de Antioquia",
    title: "Systems Engineering",
    role: "8th semester",
    period: "2022 — Present",
    description:
      "Algorithms, data structures, databases and software engineering, alongside hands-on work with agile methodologies. Currently looking for a professional internship for the first half of 2027.",
  },
];
