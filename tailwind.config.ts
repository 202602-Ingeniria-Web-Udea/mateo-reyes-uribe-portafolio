import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Sistema de diseño del portafolio.
 *
 * Los mismos valores viven como variables CSS en `src/app/globals.css`
 * (`--color-*`) para poder usarlos desde CSS plano; aquí se declaran en hex
 * para que Tailwind pueda generar modificadores de opacidad (`bg-accent/10`).
 */

/**
 * Medidas de la estructura de la página.
 *
 * Están aquí y no repartidas en clases arbitrarias (`w-[300px]`) porque las
 * usan varios componentes a la vez: la columna izquierda y el menú móvil
 * comparten ancho, y la rejilla de tres columnas tiene que coincidir con
 * ambas barras. Con un solo origen, cambiar la maqueta es cambiar este
 * objeto.
 */
const LAYOUT = {
  /** Columna izquierda y ancho del menú desplegable. */
  sidebar: "300px",
  /** Columna derecha, solo iconos. */
  social: "90px",
  /** Ancho máximo del contenido central. */
  content: "988px",
  /** Card del carrusel de portafolio, en móvil y en escritorio. */
  card: "280px",
  cardLg: "340px",
} as const;

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
         * Tema oscuro. Los nombres son semánticos y no literales: `ink` sigue
         * siendo "el texto más fuerte" aunque ahora sea casi blanco, así los
         * componentes no tuvieron que renombrar ni una clase al invertir el
         * tema. Contrastes calculados sobre `surface` (#10121C).
         */
        ink: {
          DEFAULT: "#F4F5FB", // titulares — 17:1
          soft: "#D4D7E3", // texto de lectura — 12:1
          mute: "#A6ABBE", // etiquetas y texto terciario — 8.2:1
        },
        muted: "#8D93A8", // texto de apoyo — 5.9:1 (AA)
        line: {
          DEFAULT: "#262A3D", // bordes visibles
          soft: "#1A1D2C", // separadores y pistas de progreso
        },
        surface: {
          DEFAULT: "#10121C", // cards
          raised: "#171A28", // superficies dentro de una card
        },
        bg: "#07080F",
        /*
         * Indigo neón. Sobre fondo oscuro, el indigo clásico (#4F46E5) solo
         * da 3:1 como texto, así que se reparte en dos papeles: `DEFAULT` y
         * `bright` son claros y sirven para texto, iconos y bordes; `deep`
         * es el de siempre y se reserva para rellenos con texto blanco (6.3:1).
         */
        accent: {
          DEFAULT: "#818CF8", // texto e iconos — 6.2:1
          bright: "#A5B4FC",
          deep: "#4F46E5", // rellenos con texto blanco
          night: "#1E1B4B", // bloques oscuros
          soft: "#1A1B3A", // fondos tintados de tags e iconos
        },
        // Segundo acento neón, solo para degradados y brillos junto al indigo.
        violet: {
          DEFAULT: "#A78BFA", // texto — 6.8:1
          deep: "#7C3AED", // rellenos con texto blanco — 5.7:1
        },
        // Estado "disponible". Aclarado para el fondo oscuro — 9.7:1.
        success: "#34D399",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      /**
       * Escala tipográfica del proyecto.
       *
       * Los tamaños grandes usan `clamp()` en lugar de una cadena de
       * variantes (`text-4xl sm:text-5xl lg:text-6xl`): así el titular crece
       * de forma continua con el ancho de la ventana y no da saltos en los
       * puntos de corte.
       *
       * Se declaran como cadenas y no como tupla para que solo fijen
       * `font-size` y sigan respetando el `leading-*` de cada componente.
       */
      fontSize: {
        /** Nombre del Hero. */
        display: "clamp(2.75rem, 6vw, 4.25rem)",
        /** Títulos de sección (`SectionHeading`). */
        title: "clamp(1.875rem, 3.2vw, 2.5rem)",
        /** Entradilla del Hero. */
        lead: "clamp(1.0625rem, 1.4vw, 1.1875rem)",
        /** Etiquetas en versales sobre los títulos. */
        eyebrow: "0.6875rem",
        /** Texto de los controles de tamaño medio (`Button`). */
        control: "0.9375rem",
      },
      /**
       * Interlineados del sistema. Los titulares se aprietan por debajo de 1
       * para que las dos líneas del nombre formen un bloque compacto; el
       * texto largo se abre a 1.75, que es lo que hace cómoda una columna de
       * lectura.
       */
      lineHeight: {
        display: "0.95",
        heading: "1.1",
        reading: "1.75",
      },
      /**
       * Los titulares grandes necesitan tracking negativo: a 68 px, el
       * espaciado por defecto de Inter deja el texto suelto y descuidado.
       */
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        /** Ajuste mínimo para textos de interfaz de 13 a 16 px. */
        snug: "-0.01em",
        eyebrow: "0.18em",
      },
      spacing: {
        sidebar: LAYOUT.sidebar,
        social: LAYOUT.social,
        card: LAYOUT.card,
        "card-lg": LAYOUT.cardLg,
      },
      maxWidth: {
        content: LAYOUT.content,
        /** Tope del menú lateral en pantallas estrechas. */
        drawer: "85vw",
        /** Medida de lectura cómoda para los párrafos largos. */
        measure: "62ch",
      },
      maxHeight: {
        /** Tope de los diálogos, para que siempre quepan en la ventana. */
        dialog: "85vh",
      },
      gridTemplateColumns: {
        /**
         * Estructura de escritorio. La pista central usa `minmax(0, 1fr)` y
         * no `1fr` porque, por defecto, una pista no encoge por debajo de su
         * contenido y el carrusel de portafolio empujaría la columna derecha
         * fuera de la pantalla.
         */
        shell: `${LAYOUT.sidebar} minmax(0, 1fr) ${LAYOUT.social}`,
      },
      aspectRatio: {
        /** Proporción de las capturas en las cards de portafolio. */
        card: "16 / 10",
      },
      /**
       * Elevación del sistema: `shadow-sm` en reposo, `shadow-md` en hover.
       * Sobre fondo oscuro una sombra negra apenas se ve, así que cada nivel
       * suma un filo de luz arriba (`inset`) que es lo que despega la card.
       */
      boxShadow: {
        sm: "inset 0 1px 0 0 rgb(255 255 255 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.5)",
        DEFAULT:
          "inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 4px 12px -2px rgb(0 0 0 / 0.5)",
        md: "inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 16px 40px -12px rgb(0 0 0 / 0.7)",
        lg: "inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 32px 80px -20px rgb(0 0 0 / 0.8)",
        /** Resplandor neón para el botón principal y las cards en hover. */
        glow: "0 0 0 1px rgb(129 140 248 / 0.35), 0 12px 40px -8px rgb(124 58 237 / 0.55), 0 4px 20px -4px rgb(99 102 241 / 0.45)",
        "glow-lg":
          "0 0 0 1px rgb(129 140 248 / 0.45), 0 24px 70px -12px rgb(124 58 237 / 0.6), 0 8px 32px -6px rgb(99 102 241 / 0.5)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(8%, -6%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-6%, 5%, 0) scale(0.92)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        shine: {
          from: { transform: "translateX(-120%) skewX(-20deg)" },
          to: { transform: "translateX(220%) skewX(-20deg)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite reverse",
        blink: "blink 1s step-end infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        shine: "shine 0.9s ease-out",
      },
      ringColor: {
        DEFAULT: "#818CF8",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        /** Salida suave, para que los hovers no se sientan mecánicos. */
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1152px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
