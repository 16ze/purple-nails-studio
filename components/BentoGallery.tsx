"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// Enregistrement des plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

/**
 * Liste des images pour la galerie Bento
 * Photos du studio Purple Nails
 */
const images = [
  "/IMG_9308.jpg",
  "/EC73DAE7-AE61-4FD3-B310-4A26BF34CB83.JPG",
  "/IMG_5913_SnapseedCopy.jpg", // Image centrale du bento
  "/IMG_6317.jpg",
  "/C912AB6A-2F11-4C51-82E6-EC01974A56A0.JPG",
  "/IMG_7582.jpg",
  "/IMG_6250.jpg",
  "/D50688F3-F5A0-416E-8130-35AB55B69656.JPG",
];

/**
 * Composant BentoGallery - Galerie Bento avec effet Flip GSAP
 * Grille compacte qui s'explose en plein écran au scroll
 */
export default function BentoGallery() {
  const container = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);

  /**
   * Animation GSAP Flip pour l'effet d'explosion de la grille
   * Utilise useGSAP pour une intégration optimale avec React
   */
  useGSAP(() => {
    const galleryEl = gallery.current;
    if (!galleryEl || !container.current) return;

    const items = gsap.utils.toArray(
      ".gallery__item",
      galleryEl
    ) as Element[];

    // 1. CAPTURER L'ÉTAT INITIAL (Le Bento compact)
    const state = Flip.getState(items);

    // 2. APPLIQUER L'ÉTAT FINAL (On ajoute la classe qui agrandit tout)
    // On laisse cette classe active, car c'est la destination visuelle du scroll
    galleryEl.classList.add("gallery--final");

    // 3. CRÉER L'ANIMATION FLIP
    // Flip va calculer la différence entre l'état initial (sauvegardé) et l'état actuel (final)
    const flipAnim = Flip.from(state, {
      scale: true,
      simple: true,
      ease: "none", // Le scroll contrôle la vitesse, donc "none"
    });

    // 4. CONNECTER AU SCROLL
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top", // Commence quand le haut touche le haut de l'écran
      end: "+=150%", // Durée du scroll (150% de la hauteur d'écran)
      scrub: 1, // Fluidité
      pin: true, // Bloque l'écran pendant l'effet
      animation: flipAnim,
    });

    /**
     * Cleanup : Nettoie les ScrollTriggers lors du démontage
     */
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: container });

  return (
    <div ref={container} className="gallery-wrap">
      {/* Titre décoratif */}
      <div className="absolute top-10 left-0 w-full text-center z-20 pointer-events-none mix-blend-difference text-white opacity-80">
        <h2 className="font-playfair text-xl tracking-widest uppercase">
          Selected Works
        </h2>
      </div>

      <div ref={gallery} className="gallery">
        {images.map((src, idx) => (
          <div key={idx} className="gallery__item group">
            <img
              src={src}
              alt={`Galerie nail art Purple Nails Studio - Réalisation ${idx + 1}`}
              loading="lazy"
            />
            {/* Overlay sombre qui s'enlève au survol */}
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

