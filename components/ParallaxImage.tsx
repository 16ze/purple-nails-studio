"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Interface pour les props du composant ParallaxImage
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Composant ParallaxImage - Image avec effet de parallaxe cinématique
 * 
 * Réécrit avec une logique corrigée pour un effet de parallaxe visible
 * L'image doit être plus grande que le conteneur pour que le parallaxe fonctionne
 * 
 * @param src - URL de l'image
 * @param alt - Texte alternatif pour l'accessibilité
 * @param className - Classes CSS supplémentaires pour le conteneur
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  /**
   * Animation GSAP ScrollTrigger pour l'effet de parallaxe
   * Utilise useGSAP pour une intégration optimale avec React
   */
  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    /**
     * Animation de parallaxe au scroll (scrub)
     * L'image se déplace de -20% à +20% pendant le scroll
     * Cette différence de mouvement crée l'effet de parallaxe visible
     */
    const animation = gsap.fromTo(
      imageRef.current,
      { y: "-20%" }, // Position de départ : image décalée vers le haut
      {
        y: "20%", // Position finale : image décalée vers le bas
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Démarre quand le haut du conteneur entre en bas du viewport
          end: "bottom top", // Finit quand le bas du conteneur sort en haut du viewport
          scrub: true, // L'animation colle au scroll
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-[140%] object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}
