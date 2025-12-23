"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Interface pour les props du composant Magnetic
 */
interface MagneticProps {
  children: ReactNode;
  strength?: number; // Force de l'attraction magnétique (par défaut: 0.3)
}

/**
 * Composant Magnetic - Wrapper qui rend n'importe quel élément "magnétique"
 * 
 * Quand la souris approche de l'élément, il est attiré vers le curseur avec un effet élastique.
 * Quand la souris quitte, l'élément revient à sa position initiale avec une animation élastique.
 * 
 * @param children - Contenu à rendre magnétique
 * @param strength - Force de l'attraction (0 à 1). Par défaut: 0.3
 */
export default function Magnetic({
  children,
  strength = 0.3,
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialise la position de l'élément
   */
  useGSAP(() => {
    if (!containerRef.current) return;

    // Position initiale : centré (sera ajusté par les animations)
    gsap.set(containerRef.current, {
      x: 0,
      y: 0,
    });
  }, []);

  /**
   * Gère le mouvement de la souris pour déplacer l'élément vers le curseur
   */
  useGSAP(() => {
    if (!containerRef.current) return;

    /**
     * Fonction de gestion du mouvement de la souris sur l'élément
     * Calcule la distance entre la souris et le centre de l'élément
     * Déplace l'élément vers la souris avec une résistance (multiplié par strength)
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcule la distance entre la souris et le centre de l'élément
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Déplace l'élément vers la souris avec la résistance appliquée
      gsap.to(containerRef.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    /**
     * Fonction pour remettre l'élément à sa position initiale quand la souris quitte
     * Utilise une animation élastique pour un effet organique
     */
    const handleMouseLeave = () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const element = containerRef.current;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup : Supprime les event listeners
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}

