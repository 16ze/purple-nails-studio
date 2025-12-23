"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Images pour l'effet scatter (photos du studio)
 * Images locales du dossier public
 */
const scatterImages = [
  "/lime-nails.jpeg",
  "/Aesthetic.jpeg",
  "/ombre-nails.jpeg",
  "/pinceaux-nails.jpeg",
  "/white-nail.jpeg",
  "/look-nails.jpeg",
];

/**
 * Positions et vitesses de parallaxe pour chaque image
 * Chaque image a une position absolue différente et une vitesse de mouvement différente
 * Images mieux disposées et légèrement plus grandes pour une meilleure visibilité
 */
const imageConfigs = [
  {
    position: "top-[8%] left-[3%] w-[28vw] h-[35vw]",
    yPercent: -100, // Monte vite
  },
  {
    position: "top-[12%] right-[3%] w-[32vw] h-[40vw]",
    yPercent: -50, // Monte modérément
  },
  {
    position: "top-[42%] left-[-3%] w-[36vw] h-[45vw]",
    yPercent: -200, // Monte très vite
  },
  {
    position: "top-[48%] right-[2%] w-[30vw] h-[38vw]",
    yPercent: 80, // Descend modérément
  },
  {
    position: "bottom-[8%] left-[15%] w-[28vw] h-[35vw]",
    yPercent: 50, // Descend lentement
  },
  {
    position: "bottom-[5%] right-[-3%] w-[40vw] h-[48vw]",
    yPercent: 150, // Descend vite
  },
];

/**
 * Composant PhilosophyScatter - Section avec images dispersées et parallaxe
 * Inspiré du style Ever.co.id avec un effet de profondeur 3D créé par des vitesses de parallaxe différentes
 */
export default function PhilosophyScatter() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Animation GSAP avec parallaxe pour créer un effet de profondeur 3D
   * Le texte bouge lentement, les images bougent à des vitesses différentes selon leur position
   */
  useGSAP(
    () => {
      if (!container.current) return;

      // Animation d'entrée du titre avec scale, y et opacity
      if (h2Ref.current && h3Ref.current) {
        // Définir les valeurs initiales immédiatement
        gsap.set([h2Ref.current, h3Ref.current], {
          scale: 0.8,
          y: 30,
          opacity: 0,
        });

        // Animation pour h2 "L'ÉLÉGANCE"
        const h2Animation = gsap.to(h2Ref.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          delay: 0,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        });

        // Animation pour h3 "DE LA SIMPLICITÉ"
        const h3Animation = gsap.to(h3Ref.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animation du titre central - mouvement très lent pour rester lisible (parallaxe)
      let titleAnimation: gsap.core.Tween | null = null;
      if (titleRef.current) {
        titleAnimation = gsap.to(titleRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Animation liée au scroll
          },
        });
      }

      // Animation de chaque image avec des vitesses de parallaxe différentes
      const imageAnimations = imageRefs.current.map((imageRef, index) => {
        if (!imageRef) return null;

        const config = imageConfigs[index];
        if (!config) return null;

        return gsap.to(imageRef, {
          yPercent: config.yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Animation liée au scroll
          },
        });
      });

      /**
       * Cleanup : Nettoie les animations et les ScrollTriggers lors du démontage
       */
      return () => {
        if (titleAnimation) {
          titleAnimation.kill();
        }
        imageAnimations.forEach((anim) => {
          if (anim) {
            anim.kill();
          }
        });
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === container.current) {
            trigger.kill();
          }
        });
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full h-[200vh] bg-[#F2F0EC] overflow-hidden flex items-center justify-center"
    >
      {/* Titre central avec structure similaire à l'exemple */}
      <div className="relative z-10 text-center px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef}>
            <h2
              ref={h2Ref}
              className="font-playfair text-[#8C7C6D] text-3xl md:text-5xl"
            >
              L'ÉLÉGANCE
            </h2>
            <h3
              ref={h3Ref}
              className="font-playfair text-[#5D4E6D] text-5xl md:text-8xl mt-2"
            >
              DE LA SIMPLICITÉ
            </h3>
          </div>
        </div>
      </div>

      {/* Images dispersées avec positions absolues */}
      {scatterImages.map((src, index) => {
        const config = imageConfigs[index];
        if (!config) return null;

        return (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className={`absolute ${config.position} overflow-hidden shadow-lg`}
          >
            <img
              src={src}
              alt={`Manucure et nail art - Purple Nails Studio - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );
      })}
    </section>
  );
}
