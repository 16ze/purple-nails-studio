"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Composant ColorChanger - Change dynamiquement la classe dark-mode sur le body
 * en fonction de la section visible à l'écran
 * 
 * Utilise GSAP ScrollTrigger pour détecter quand chaque section arrive au centre de l'écran
 * et ajoute/enlève la classe dark-mode sur le body pour changer les couleurs via CSS
 */
export default function ColorChanger() {
  useEffect(() => {
    /**
     * Scanne toutes les sections avec l'attribut data-bgcolor
     * Recherche spécifiquement les sections avec data-textcolor pour identifier les sections sombres
     */
    const sections = document.querySelectorAll<HTMLElement>("[data-bgcolor]");

    if (sections.length === 0) return;

    /**
     * Crée un ScrollTrigger pour chaque section
     * Quand la section arrive au centre de l'écran, ajoute/enlève la classe dark-mode
     */
    sections.forEach((section) => {
      const textColor = section.getAttribute("data-textcolor");

      // Si la section a un data-textcolor, c'est une section sombre (Services, Footer)
      const isDarkSection = textColor !== null;

      ScrollTrigger.create({
        trigger: section,
        start: "top center", // Démarre quand le haut de la section atteint le centre de l'écran
        end: "bottom center", // Finit quand le bas de la section atteint le centre de l'écran
        onEnter: () => {
          /**
           * Ajoute la classe dark-mode si c'est une section sombre, sinon l'enlève
           * Les transitions CSS dans globals.css gèrent l'animation
           */
          if (isDarkSection) {
            document.body.classList.add("dark-mode");
          } else {
            document.body.classList.remove("dark-mode");
          }
        },
        onEnterBack: () => {
          /**
           * Même logique quand on revient en arrière (scroll vers le haut)
           */
          if (isDarkSection) {
            document.body.classList.add("dark-mode");
          } else {
            document.body.classList.remove("dark-mode");
          }
        },
      });
    });

    /**
     * Définit l'état initial : enlève la classe dark-mode au chargement
     * (la première section est Hero avec fond clair)
     */
    document.body.classList.remove("dark-mode");

    /**
     * Cleanup : Nettoie les ScrollTriggers lors du démontage
     */
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger as HTMLElement;
        if (
          triggerElement &&
          triggerElement.hasAttribute?.("data-bgcolor")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return null; // Ce composant n'affiche rien, il gère seulement les classes
}

