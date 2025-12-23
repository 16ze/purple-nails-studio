"use client";

import { gsap } from "gsap";
import { forwardRef, useImperativeHandle, useRef } from "react";

/**
 * Interface pour les méthodes exposées par CurveOverlay
 */
export interface CurveOverlayHandle {
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
}

/**
 * Composant CurveOverlay - SVG avec animation de courbe pour transition de page
 *
 * État initial : SVG en bas, courbé vers le bas (hors de l'écran)
 * Animation In : Monte, s'aplatit pour couvrir tout l'écran
 * Animation Out : Continue de monter, se courbe vers le haut, sort de l'écran
 */
const CurveOverlay = forwardRef<CurveOverlayHandle>((props, ref) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  /**
   * Tracé initial : Courbe vers le bas (sourire), commence en bas de l'écran
   * Forme un sourire qui sort de l'écran
   */
  const initialPath = "M0,100 Q960,400 1920,100 L1920,1080 L0,1080 Z";

  /**
   * Tracé intermédiaire : Rectangle plat qui couvre tout l'écran
   * Utilisé pendant que le SVG monte
   */
  const flatPath = "M0,0 L1920,0 L1920,1080 L0,1080 Z";

  /**
   * Tracé final : Courbe vers le haut (arche), monte vers le haut
   * Forme une arche qui sort de l'écran par le haut
   */
  const finalPath = "M0,980 Q960,680 1920,980 L1920,0 L0,0 Z";

  useImperativeHandle(ref, () => ({
    /**
     * Animation In : Le SVG monte et s'aplatit pour couvrir l'écran
     */
    animateIn: () => {
      return new Promise<void>((resolve) => {
        if (!pathRef.current || !containerRef.current) {
          resolve();
          return;
        }

        // Position initiale : en bas de l'écran, courbé vers le bas
        gsap.set(containerRef.current, {
          y: "100%", // Commence hors de l'écran en bas
        });
        pathRef.current.setAttribute("d", initialPath);

        // Rendre visible
        containerRef.current.style.visibility = "visible";

        // Bloque le scroll pendant la transition
        document.body.style.overflow = "hidden";

        // Timeline pour l'animation
        const tl = gsap.timeline({
          onComplete: () => resolve(),
        });

        // Animation : monte et s'aplatit
        tl.to(containerRef.current, {
          y: "0%", // Monte jusqu'au centre
          duration: 0.6,
          ease: "power2.inOut",
        }).to(
          pathRef.current,
          {
            attr: { d: flatPath }, // S'aplatit en rectangle
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3" // Commence un peu avant la fin de l'animation précédente
        );
      });
    },

    /**
     * Animation Out : Le SVG continue de monter et se courbe vers le haut
     */
    animateOut: () => {
      return new Promise<void>((resolve) => {
        if (!pathRef.current || !containerRef.current) {
          resolve();
          return;
        }

        // Timeline pour l'animation
        const tl = gsap.timeline({
          onComplete: () => {
            // Cache l'élément après l'animation
            if (containerRef.current) {
              containerRef.current.style.visibility = "hidden";
            }
            // Réactive le scroll après la transition
            document.body.style.overflow = "";
            resolve();
          },
        });

        // S'assure que le path est plat et le container est en position 0 au début de l'animation Out
        pathRef.current.setAttribute("d", flatPath);
        gsap.set(containerRef.current, {
          y: "0%", // Commence depuis la position centrale après l'animation In
        });

        // Animation : se courbe vers le haut et monte
        tl.to(pathRef.current, {
          attr: { d: finalPath }, // Se courbe vers le haut (arche)
          duration: 0.4,
          ease: "power2.in",
        }).to(
          containerRef.current,
          {
            y: "-100%", // Monte hors de l'écran par le haut
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.2" // Commence légèrement avant la fin de la courbure
        );
      });
    },
  }));

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[100] pointer-events-none"
      style={{ visibility: "hidden" }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    >
      <path ref={pathRef} fill="#e8dcca" d={initialPath} />
    </svg>
  );
});

CurveOverlay.displayName = "CurveOverlay";

export default CurveOverlay;
