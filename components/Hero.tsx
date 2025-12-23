"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";
import TextReveal from "./TextReveal";

/**
 * Composant Hero - Section d'accueil pleine écran avec image hero.jpeg
 * Animation d'entrée avec effet parallaxe au scroll et dégradé vers le bas
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Animation d'intro au chargement de la page
   * Le titre principal utilise le composant TextReveal pour son animation
   * L'image gère son propre parallaxe via le composant ParallaxImage
   */
  useGSAP(() => {
    // L'animation du texte est gérée par le composant TextReveal
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `
          linear-gradient(180deg, transparent 37%, #F2F0EC 66%),
          radial-gradient(circle farthest-corner at 50% 0%, rgba(14, 10, 7, 0.5) 19%, transparent),
          url('/hero.jpeg')
        `,
        color: "#FFFFFF",
        backgroundPosition: "0 0, 0 0, 50% 100%",
        backgroundSize: "auto, auto, cover",
        maxWidth: "100%",
        overflow: "visible",
      }}
    >
      {/* Image de fond avec effet parallaxe cinématique */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/hero.jpeg"
          alt="Purple Nails Studio - Manucure russe et nail art de luxe"
          className="w-full h-full"
          priority={true}
        />
      </div>

      {/* Contenu centré - Texte en blanc */}
      <div ref={contentRef} className="relative z-20 text-center text-white">
        {/* Grand titre principal avec effet de révélation */}
        <TextReveal
          text="La beauté dans chaque détail"
          as="h1"
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-bold px-8"
          style={{ fontFamily: "Bradfordll, Georgia, sans-serif" }}
        />
        
        {/* Bouton Prendre rendez-vous sans bordure */}
        <a
          href="https://www.planity.com/azurra-beaute-anama-25600-sochaux"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 md:mt-12 px-8 py-4 text-white font-lato text-lg uppercase tracking-widest hover:opacity-80 transition-opacity duration-300"
        >
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
}
