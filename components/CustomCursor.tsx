"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Composant CustomCursor - Curseur personnalisé avec effet de lag
 * 
 * Réécrit avec une logique infaillible pour suivre la souris correctement
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    // Déplace le curseur au centre initialement pour éviter un saut
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.6,
      ease: "power3",
    });

    /**
     * Fonction de gestion du mouvement de la souris
     * Positionne le curseur à la position du curseur réel
     */
    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    /**
     * Détecte les liens et boutons pour agrandir le curseur au survol
     */
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        scale: 3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Sélectionne tous les liens et boutons de la page
    const interactiveElements = document.querySelectorAll("a, button");

    // Ajoute les event listeners pour l'agrandissement
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
    />
  );
}
