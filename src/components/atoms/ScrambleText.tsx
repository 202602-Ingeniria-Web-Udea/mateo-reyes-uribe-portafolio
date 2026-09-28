"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

export interface ScrambleTextProps {
  text: string;
  /** Milisegundos antes de empezar. */
  delay?: number;
  /** Milisegundos que tarda en fijarse cada carácter. */
  speed?: number;
  className?: string;
}

/**
 * Texto que se "descifra" al montarse: cada carácter pasa por símbolos al
 * azar hasta fijarse, de izquierda a derecha, como una terminal.
 *
 * El texto real va en un `sr-only` y el animado se oculta a lectores de
 * pantalla, que si no leerían cada fotograma de símbolos. El primer render
 * (servidor) ya muestra el texto final, así que sin JavaScript se ve bien.
 */
export function ScrambleText({
  text,
  delay = 0,
  speed = 45,
  className,
}: ScrambleTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let frame = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame * 16) / speed);
        setOutput(
          text
            .split("")
            .map((char, index) => {
              if (char === " " || index < settled) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (settled >= text.length) clearInterval(intervalId);
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed, shouldReduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
