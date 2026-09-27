import type { PortfolioItem } from "@/types";

/**
 * Proyectos del portafolio.
 *
 * `repoUrl` y `liveUrl` son opcionales: omite el que no aplique y la card
 * simplemente no mostrará ese enlace. `comingSoon` marca los proyectos que
 * todavía no tienen despliegue público.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "pos-system",
    title: "POS — Point of Sale",
    shortDescription:
      "Sales, product and inventory management with automatic low-stock alerts.",
    longDescription:
      "A complete point-of-sale system that cut sales entry time by roughly 60% compared to the manual flow it replaced. The REST API follows a layered architecture — controller, service, repository — which held zero referential integrity errors across tests with more than 500 records. It also ships automatic low-stock alerts that removed inventory gaps in every test scenario.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    imageUrl: "/images/portfolio/pos-system.png",
    liveUrl: "https://pos-system-chi-beryl.vercel.app",
    repoUrl: "https://github.com/mateor32/pos-system",
  },
  {
    id: "fraud-detection",
    title: "Banking Backend — Fraud Detection",
    shortDescription:
      "Transaction processing with JWT authentication and anomaly detection.",
    longDescription:
      "A banking backend covering 100% of the critical flows: registration, login, transfers and history. On top of that sits an anomaly detection module that flags unusual transactions — atypical amounts, unusual frequency — and reduced false negatives across simulated tests. Security follows OWASP practices: bcrypt for password hashing and error handling that never exposes a stack trace.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
    imageUrl: "/images/portfolio/fraud-detection.png",
    repoUrl: "https://github.com/mateor32/fraude-detection",
    comingSoon: true,
  },
  {
    id: "ai-voice-tutor",
    title: "AI Voice Chat — English Tutor",
    shortDescription:
      "Speech recognition and an LLM combined into a real-time conversation tutor.",
    longDescription:
      "An academic project that pairs speech-to-text with a large language model to hold real-time conversations in English, with average latency under two seconds. The hardest part was the audio pipeline: designing it to cope with accent variation and background noise, which noticeably improved recognition accuracy in controlled environments.",
    stack: ["TypeScript", "Python", "Speech-to-Text", "LLM API", "Docker"],
    imageUrl: "/images/portfolio/ai-voice-tutor.png",
    liveUrl: "https://ai-english-chat-rosy.vercel.app",
  },
  {
    id: "sezzle-calculator",
    title: "Sezzle Calculator",
    shortDescription:
      "A calculator backed by a Go REST API, with a React interface and three themes.",
    longDescription:
      "A full-stack calculator where every operation is resolved by a REST API written in Go, while the React interface stays a thin client. It supports chained operations, full keyboard shortcuts and three switchable themes, and the backend runs in a Docker container so the same image works locally and in deployment.",
    stack: ["Go", "React", "TypeScript", "Tailwind CSS", "Docker"],
    imageUrl: "/images/portfolio/sezzle-calculator.png",
    liveUrl: "https://sezzle-calculator-theta.vercel.app",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    shortDescription:
      "This site: a typed, static résumé built with Next.js and deployed on Vercel.",
    longDescription:
      "The portfolio you are looking at. A 100% static Next.js site where every piece of content lives in typed data files, components are organised with Atomic Design, and the design system is a single indigo accent over a long neutral ramp. Every text pair meets WCAG AA contrast, dialogs trap focus, and all animation respects reduced-motion preferences.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    imageUrl: "/images/portfolio/portfolio.png",
    liveUrl: "https://mateo-reyes-uribe-portafolio.vercel.app",
  },
];
