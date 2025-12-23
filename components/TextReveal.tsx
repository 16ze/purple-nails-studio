"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Interface pour les props du composant TextReveal
 */
interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "div" | "span";
  style?: React.CSSProperties;
}

/**
 * Composant TextReveal - Révélation de texte depuis le bas avec effet masque
 * 
 * Le texte est séparé en lignes, chaque ligne étant dans un conteneur avec overflow-hidden.
 * Le texte commence caché en bas (y: 100%) et remonte progressivement (y: 0%) quand l'élément entre dans la vue.
 * 
 * @param text - Texte à révéler (peut contenir plusieurs lignes séparées par \n)
 * @param className - Classes CSS supplémentaires pour le conteneur
 * @param as - Balise HTML à utiliser (h1, h2, h3, div, span). Par défaut: div
 */
export default function TextReveal({
  text,
  className = "",
  as: Component = "div",
  style,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Sépare le texte en lignes (supporte \n pour les retours à la ligne)
   */
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  /**
   * Animation GSAP ScrollTrigger pour révéler le texte
   * Utilise useGSAP pour une intégration optimale avec React
   */
  useGSAP(() => {
    if (!containerRef.current || linesRef.current.length === 0) return;

    // Filtre les références nulles et sélectionne les spans à l'intérieur des conteneurs
    const validSpans = linesRef.current
      .filter((line): line is HTMLDivElement => line !== null)
      .map((line) => line.children[0] as HTMLSpanElement)
      .filter((span) => span !== undefined);

    if (validSpans.length === 0) return;

    /**
     * Animation avec ScrollTrigger
     * Quand l'élément arrive dans la vue (start: 'top 80%')
     * Le texte remonte depuis y: 100% vers y: 0% avec une transition fluide
     */
    const animation = gsap.fromTo(
      validSpans,
      {
        y: "100%", // Commence caché en bas (100% de la hauteur du conteneur)
      },
      {
        y: "0%", // Finit à la position normale
        duration: 1,
        ease: "power4.out",
        stagger: lines.length > 1 ? 0.1 : 0, // Stagger de 0.1s si plusieurs lignes
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Démarre quand le haut du conteneur atteint 80% de l'écran
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    /**
     * Cleanup : Nettoie l'animation et le ScrollTrigger lors du démontage
     */
    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, lines.length]);

  return (
    <Component
      ref={containerRef as any}
      className={className}
      style={style}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          ref={(el) => {
            linesRef.current[index] = el;
          }}
          className="overflow-hidden inline-block"
          style={{
            display: "block", // Assure que chaque ligne est sur une nouvelle ligne
          }}
        >
          <span
            className="inline-block"
            style={{
              transform: "translateY(100%)", // État initial : caché en bas
            }}
          >
            {line}
          </span>
        </div>
      ))}
    </Component>
  );
}

