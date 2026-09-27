import type {
  ExtraSkill,
  LanguageSkill,
  ProgrammingSkill,
  Profile,
  SocialLink,
} from "@/types";


export const profile: Profile = {
  name: "Mateo Reyes Uribe",
  role: "Backend Developer",
  // Palabra del rol que va en accent en el Hero. Tiene que estar dentro de `role`.
  roleHighlight: "Backend",
  // "available" pinta el badge en verde (--color-success); "busy" lo atenúa.
  status: "available",
  email: "mateoreyes0723@gmail.com",
 
  phone: "+57 310 641 9162",
  residence: "Medellín, Colombia",
  studies: "Systems Engineering",
  availability: "Internship 2027-1",
  avatarUrl: "/images/avatar.png",
  heroDescription:
    "Systems Engineering student at Universidad de Antioquia, building backend services with Java, Spring Boot and PostgreSQL. I care about APIs that stay readable as they grow, data that keeps its integrity, and deployments that don't need babysitting.",
  bioLong:
    "I'm a Systems Engineering student at Universidad de Antioquia, currently in my eighth semester and looking for a professional internship for the first half of 2027. Most of my hands-on work is backend: REST APIs in Java and Spring Boot, relational modelling in PostgreSQL, and containerised environments with Docker.\n\nAt the university I work as a School Factory Monitor: I support the development teams with Scrum ceremonies and backlog management, and I work across backend, databases, quality assurance, requirements and project follow-up. I also maintain the Systems Engineering department portal end to end, with at least two clean deployments a month and environments orchestrated with Docker.\n\nOn my own time I build projects that force me to get the fundamentals right: a point-of-sale system, a banking backend with JWT authentication and anomaly detection, and a voice tutor that pairs speech recognition with an LLM. I work comfortably with Scrum and Kanban, and I'm looking for a hybrid role where I can keep shipping.",
};

/**
 * Idiomas. `level` es un porcentaje de 0 a 100 usado por las barras de
 * progreso; B2 corresponde a un nivel intermedio-alto, de ahí el 70.
 */
export const languages: LanguageSkill[] = [
  { name: "Spanish (native)", level: 100 },
  { name: "English (B2)", level: 70 },
];

/**
 * Stack técnico, enfocado en backend y DevOps. `level` es un porcentaje de 0
 * a 100.
 *
 * TODO: los porcentajes son una estimación a partir del peso que cada
 * tecnología tiene en tu hoja de vida. Ajústalos: es el único dato de este
 * archivo que no sale literal del currículum.
 */
export const programmingSkills: ProgrammingSkill[] = [
  { name: "Java", level: 90 },
  { name: "SQL", level: 85 },
  { name: "Docker", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "JavaScript", level: 75 },
  { name: "Python", level: 65 },
];

/**
 * Habilidades blandas. `icon` es un nombre de icono de lucide-react:
 * el editor autocompleta los válidos y TypeScript rechaza los inexistentes.
 */
export const extraSkills: ExtraSkill[] = [
  { label: "Problem solving", icon: "Lightbulb" },
  { label: "Agile teamwork", icon: "Users" },
  { label: "Fast learner", icon: "Sparkles" },
  { label: "Clear communication", icon: "MessageSquare" },
];

/**
 * Enlaces sociales. `icon` identifica la marca; se renderizan con react-icons.
 */
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/mateor32", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mateo-reyes-uribe",
    icon: "linkedin",
  },
];
