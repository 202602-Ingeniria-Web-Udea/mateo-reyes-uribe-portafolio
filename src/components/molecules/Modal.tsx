"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";
import { cn } from "@/lib/utils";

export interface ModalProps {
  /** Controla la visibilidad. El estado vive fuera, en el organismo. */
  isOpen: boolean;
  /** Se llama al cerrar con Esc, con el fondo o con el botón de cierre. */
  onClose: () => void;
  /** Título visible. Además nombra el diálogo para los lectores de pantalla. */
  title?: string;
  /** Nombre accesible alternativo cuando no hay título visible. */
  ariaLabel?: string;
  children: ReactNode;
  /** Clases del panel, por ejemplo para ensancharlo (`max-w-3xl`). */
  className?: string;
  /** Etiqueta accesible del botón de cierre. */
  closeLabel?: string;
}

/**
 * Diálogo genérico y reutilizable.
 *
 * No sabe nada de su contenido: recibe `children`, así que sirve igual para
 * la biografía del Hero que para el detalle de un proyecto del portafolio.
 * Lo único que impone es el marco (fondo, panel, botón de cierre).
 *
 * El comportamiento accesible —foco al abrir, foco devuelto al cerrar,
 * trampa del tabulador, cierre con `Esc` y bloqueo del scroll del fondo— vive
 * en `useDialogBehavior`, compartido con el menú lateral del móvil.
 *
 * Se dibuja con `createPortal` sobre `document.body` y no en el sitio donde
 * se declara: si quedara dentro de una card, cualquier ancestro con
 * `transform` (por ejemplo el `hover:-translate-y-1` de las cards) crearía un
 * nuevo contexto de posicionamiento y el `fixed` del fondo dejaría de cubrir
 * la pantalla.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  className,
  closeLabel = "Close",
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const { panelRef, isMounted } = useDialogBehavior<HTMLDivElement>({
    isOpen,
    onClose,
  });

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Fondo. Es decorativo: el cierre por teclado ya lo cubre Esc. */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : ariaLabel}
            tabIndex={-1}
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 max-h-dialog w-full max-w-lg overflow-y-auto rounded-xl",
              "border border-line bg-surface p-6 shadow-glow-lg outline-none sm:p-9",
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 ease-out hover:rotate-90 hover:bg-line-soft hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {title && (
              <h2
                id={titleId}
                className="pr-10 text-xl font-bold tracking-tighter text-ink sm:text-2xl"
              >
                {title}
              </h2>
            )}

            <div className={cn(title && "mt-5")}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
