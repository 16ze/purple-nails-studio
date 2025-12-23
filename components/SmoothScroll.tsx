"use client";

import { useLayoutEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Enregistre le plugin ScrollTrigger de GSAP
 * Nécessaire pour synchroniser Lenis avec GSAP ScrollTrigger
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Composant SmoothScroll - Gestion du défilement fluide avec Lenis
 * Synchronise parfaitement Lenis avec GSAP ScrollTrigger pour des animations fluides
 * 
 * @param children - Contenu à envelopper avec le smooth scroll
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    /**
     * Initialise Lenis avec des paramètres optimisés pour un effet "Luxe"
     * - duration: 1.5s pour un défilement doux et élégant
     * - easing personnalisé : fonction exponentielle out pour une décélération progressive
     */
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    /**
     * Synchronise le raf de Lenis avec le ticker de GSAP
     * Cette approche garantit que Lenis et ScrollTrigger sont parfaitement synchronisés
     * time * 1000 convertit les secondes en millisecondes pour Lenis
     */
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);

    /**
     * Désactive le lag smoothing de GSAP pour une synchronisation précise
     * Permet d'éviter les décalages entre Lenis et ScrollTrigger
     */
    gsap.ticker.lagSmoothing(0);

    /**
     * Met à jour ScrollTrigger à chaque scroll de Lenis
     * Nécessaire pour que ScrollTrigger reste synchronisé avec le scroll de Lenis
     */
    lenis.on("scroll", ScrollTrigger.update);

    /**
     * Cleanup : Nettoie les ressources lors du démontage du composant
     * Supprime Lenis et les callbacks du ticker GSAP pour éviter les fuites mémoire
     */
    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

