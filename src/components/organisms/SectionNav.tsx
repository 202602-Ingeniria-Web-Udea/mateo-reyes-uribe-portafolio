"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, LayoutGrid, Send, Sparkles, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Los ids coinciden con los `id` por defecto de cada sección de `page.tsx`.
const ITEMS: NavItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "expertise", label: "Expertise", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Work", icon: LayoutGrid },
  { id: "contact", label: "Contact", icon: Send },
];

export interface SectionNavProps {
  className?: string;
}

/**
 * Menú flotante con la sección activa marcada.
 *
 * La sección activa la decide un `IntersectionObserver` con una franja
 * estrecha en el centro de la ventana: la que la cruza es la que se está
 * leyendo. El fondo del enlace activo comparte `layoutId`, así que Framer
 * Motion lo desliza de un enlace al siguiente en vez de hacerlo saltar.
 */
export function SectionNav({ className }: SectionNavProps) {
  const [activeId, setActiveId] = useState(ITEMS[0].id);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const item of ITEMS) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      aria-label="Sections"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-auto rounded-full border border-white/10 bg-surface/70 p-1.5 shadow-lg ring-1 ring-accent/15 backdrop-blur-xl",
        className,
      )}
    >
      <ul className="flex items-center gap-1">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium tracking-snug transition-colors duration-200 sm:px-4",
                  isActive ? "text-white" : "text-ink-mute hover:text-accent-bright",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-nav-active"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-deep to-violet-deep shadow-glow"
                  />
                )}
                <Icon size={16} aria-hidden="true" className="relative" />
                <span className="relative hidden md:inline">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
