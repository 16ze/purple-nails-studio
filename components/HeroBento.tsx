"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParallaxImage from "./ParallaxImage";

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Composant HeroBento - Section avec image principale bento.jpeg
 * Affichage de l'image avec effet parallaxe au scroll
 */
export default function HeroBento() {
  const container = useRef<HTMLDivElement>(null);

  /**
   * Animation GSAP pour l'image
   * L'image gère son propre parallaxe via le composant ParallaxImage
   */
  useGSAP(() => {
    // L'animation parallaxe est gérée par le composant ParallaxImage
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full h-screen overflow-hidden">
      {/* Image principale avec effet parallaxe cinématique */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/bento.jpeg"
          alt="Bento image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}