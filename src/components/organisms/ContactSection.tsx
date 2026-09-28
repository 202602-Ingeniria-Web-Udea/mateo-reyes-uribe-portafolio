"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Magnetic } from "@/components/atoms/Magnetic";
import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { profile, socialLinks } from "@/data/profile";
import { VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ContactSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

/**
 * Cierre de la página: un bloque neón indigo → violeta con aurora propia y
 * la llamada a escribir. Es el bloque más saturado del sitio, así que marca
 * el final sin necesidad de otro título. Sin formulario: el portafolio no
 * tiene backend.
 */
export function ContactSection({ id = "contact", className }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent-night via-[#2a1466] to-violet-deep px-8 py-14 text-center shadow-glow-lg sm:px-14 sm:py-20"
      >
        <span
          aria-hidden="true"
          className="surface-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 animate-aurora rounded-full bg-accent/40 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 animate-aurora-slow rounded-full bg-violet/40 blur-3xl"
        />

        <div className="relative">
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-bright">
            05 — Contact
          </p>
          <h2
            id={`${id}-title`}
            className="text-glow mx-auto mt-5 max-w-2xl text-title font-bold leading-heading tracking-tighter text-white"
          >
            Let&apos;s build something that holds up in production.
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-base leading-relaxed text-white/80">
            Currently open to: {profile.availability}. The fastest way to reach
            me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group/cta inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-control font-semibold tracking-snug text-accent-night shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(255_255_255/0.45)]"
              >
                <Mail size={18} aria-hidden="true" />
                Get in touch
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                />
              </a>
            </Magnetic>

            <ul className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <SocialIconLink
                    icon={link.icon}
                    url={link.url}
                    name={link.name}
                    size={48}
                    className="border-white/25 bg-white/10 text-white shadow-none backdrop-blur hover:border-white hover:bg-white hover:bg-none hover:text-accent-night"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
