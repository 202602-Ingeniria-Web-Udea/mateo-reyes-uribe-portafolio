"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { ProfilePanel } from "@/components/organisms/ProfilePanel";
import { profile } from "@/data/profile";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";
import { cn } from "@/lib/utils";

/**
 * Punto de corte en el que la columna izquierda deja de estar colapsada.
 * Es el mismo valor que `lg` en Tailwind; si uno cambia, el otro también.
 */
const DESKTOP_QUERY = "(min-width: 1024px)";

export interface MobileHeaderProps {
  className?: string;
}

/**
 * Cabecera de móvil y tableta con el menú lateral desplegable.
 *
 * Por debajo de 1024 px la ficha personal no cabe como columna, así que se
 * repliega detrás de este botón y se abre como panel lateral. El contenido es
 * el mismo `ProfilePanel` que usa la columna de escritorio: no hay dos
 * versiones de la ficha que mantener en paralelo.
 *
 * El panel se dibuja con `createPortal` sobre `document.body` para que no
 * dependa del apilamiento de la cabecera, que es `sticky`, y reutiliza
 * `useDialogBehavior`: foco atrapado, cierre con `Esc` y bloqueo del scroll
 * de detrás, igual que los modales.
 */
export function MobileHeader({ className }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback(() => setIsOpen(false), []);
  const { panelRef, isMounted } = useDialogBehavior<HTMLDivElement>({
    isOpen,
    onClose: close,
  });

  /**
   * Al pasar a escritorio, la columna fija vuelve a aparecer y el botón que
   * abrió el panel desaparece. Sin esto, el panel se quedaría abierto encima
   * y el bloqueo del scroll seguiría activo sin nada visible que lo explique.
   */
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-bg/70 px-5 py-3.5 backdrop-blur-xl",
          className,
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Avatar src={profile.avatarUrl} alt={profile.name} size={40} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-snug text-ink">
              {profile.name}
            </p>
            <p className="truncate text-xs text-muted">{profile.role}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink-mute shadow-sm transition-all duration-200 ease-out hover:border-accent/50 hover:text-accent-bright hover:shadow-glow"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </header>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div
                  aria-hidden="true"
                  onClick={close}
                  className="absolute inset-0 bg-black/70 backdrop-blur-md"
                />

                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Profile"
                  tabIndex={-1}
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { x: "-100%" }
                  }
                  animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { x: "-100%" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 w-sidebar max-w-drawer overflow-y-auto bg-surface shadow-lg outline-none"
                >
                  <div className="sticky top-0 z-10 flex justify-end bg-surface/80 px-4 pt-4 backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close menu"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-line-soft hover:text-ink"
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>

                  {/*
                    El margen negativo recupera el espacio que ocupa la barra
                    del botón de cierre, para que la foto no quede hundida.
                  */}
                  <ProfilePanel className="-mt-2" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
