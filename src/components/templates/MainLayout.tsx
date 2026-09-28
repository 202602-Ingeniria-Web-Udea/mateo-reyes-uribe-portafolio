import type { ReactNode } from "react";
import { AuroraBackground } from "@/components/atoms/AuroraBackground";
import { CursorGlow } from "@/components/atoms/CursorGlow";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { SectionNav } from "@/components/organisms/SectionNav";
import { LeftSidebar } from "@/components/organisms/LeftSidebar";
import { MobileHeader } from "@/components/organisms/MobileHeader";
import { RightSidebar } from "@/components/organisms/RightSidebar";
import { cn } from "@/lib/utils";

export interface MainLayoutProps {
  /**
   * Contenido de la columna central. Incluye su propio `<main>` y el pie:
   * la plantilla solo decide dónde caen, no qué son, para que el `<footer>`
   * quede fuera de `<main>` y cuente como landmark de pie de página.
   */
  children: ReactNode;
  className?: string;
}

/**
 * Plantilla de la página: ficha fija a la izquierda, contenido en el centro y
 * redes a la derecha.
 *
 * En escritorio son tres columnas de rejilla (`300px | resto | 90px`). Al ser
 * columnas reales y no elementos flotantes, las barras laterales no pueden
 * solaparse con el centro: cada una ocupa su propia pista. La central usa
 * `minmax(0, 1fr)` en lugar de `1fr` porque, por defecto, una pista de
 * rejilla no encoge por debajo del contenido que lleva dentro, y el carrusel
 * de portafolio la ensancharía hasta empujar la columna derecha fuera de la
 * pantalla.
 *
 * Por debajo de 1024 px no hay rejilla: la ficha se repliega en el menú de
 * `MobileHeader` y los enlaces a redes quedan cubiertos por la fila que ya
 * dibuja el pie, así que la columna derecha simplemente no se muestra en vez
 * de repetir los mismos iconos por tercera vez.
 *
 * El scroll es el de la página. Las barras son `sticky`, de modo que se
 * quedan quietas mientras el centro se desplaza, y la izquierda tiene además
 * su propio `overflow-y-auto` para cuando la ficha es más alta que la
 * ventana.
 */
export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <AuroraBackground />
      <ScrollProgress />
      <CursorGlow />
      <MobileHeader className="lg:hidden" />

      <div className="relative z-10 lg:grid lg:grid-cols-shell">
        <LeftSidebar className="hidden lg:block" />

        {/*
          `relative` para que el halo se posicione contra esta columna y no
          contra la ventana: así el degradado queda centrado sobre el
          contenido, no sobre la página entera con las barras incluidas.
        */}
        {/*
          `overflow-x-clip` recorta lo que sobresalga por los lados, como el
          halo difuso que rodea el retrato del Hero: sin esto, ese halo añade
          unos píxeles de scroll horizontal en tabletas. Se usa `clip` y no
          `hidden` porque `hidden` convertiría la columna en un contenedor de
          desplazamiento y podría anular el `sticky` de cualquier elemento que
          se meta aquí dentro más adelante.
        */}
        <div className="relative min-w-0 overflow-x-clip px-5 sm:px-8 lg:px-6">
          {/*
            Halo del accent detrás de la cabecera. Es decorativo y no
            intercepta el ratón, de modo que no tapa nada de lo que hay
            debajo.
          */}
          <span
            aria-hidden="true"
            className="accent-glow pointer-events-none absolute inset-x-0 top-0 h-[40rem]"
          />

          {/*
            El menú flota en una franja `sticky` de alto cero, así no empuja
            el Hero hacia abajo. Por debajo de `lg` se coloca bajo la
            cabecera móvil, que también es `sticky`.
          */}
          {/* `items-start`: con el estirado por defecto el menú mediría cero. */}
          <div className="pointer-events-none sticky top-[84px] z-40 flex h-0 items-start justify-center lg:top-5">
            <SectionNav />
          </div>

          <div className="relative mx-auto w-full max-w-content pt-10">
            {children}
          </div>
        </div>

        <RightSidebar className="hidden lg:flex" />
      </div>
    </div>
  );
}
