"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import TextReveal from "./TextReveal";

/**
 * Composant Philosophy - Section présentant la philosophie du studio
 * Grille avec image et texte, animations ScrollTrigger pour l'apparition
 */
export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  /**
   * Animation ScrollTrigger pour l'image (parallaxe léger)
   * L'image bouge moins vite que le scroll pour créer un effet de profondeur
   */
  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: -20, // Déplacement vertical négatif (vers le haut) au scroll
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true, // Animation liée au scroll
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  /**
   * Animation ScrollTrigger pour le texte (fade in + slide up)
   * Le texte apparaît quand la section arrive à 20% de l'écran
   */
  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Démarre quand le haut de la section atteint 80% de l'écran (20% visible)
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-32 md:py-40 px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Colonne gauche - Image format portrait avec angles droits */}
        <div className="relative overflow-hidden">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop"
            alt="Luxe nail studio"
            className="w-full aspect-[3/4] object-cover rounded-none"
          />
        </div>

        {/* Colonne droite - Texte avec titre et paragraphes dans une carte blanche */}
        <div ref={textRef} className="opacity-0">
          {/* Carte blanche avec padding pour le contenu */}
          <div className="bg-white p-8 md:p-12 shadow-lg">
            {/* Titre avec effet de révélation */}
            <div style={{ color: "#7a6047" }}>
              <TextReveal
                text="L'EXCELLENCE SUR MESURE"
                as="h2"
                className="font-playfair text-3xl md:text-4xl mb-8"
              />
            </div>

            <div
              className="font-lato text-lg leading-relaxed space-y-6"
              style={{ color: "#7a6047" }}
            >
              <p>
                Chez Purple Nails Studio, nous croyons que chaque main mérite un
                traitement d&apos;exception. Notre approche allie savoir-faire
                artisanal et produits premium pour créer des ongles qui
                reflètent votre personnalité unique.
              </p>
              <p>
                Spécialisés en manucure russe, nous utilisons exclusivement des
                produits de luxe et des techniques innovantes. Chaque
                rendez-vous est une expérience sur mesure, où le détail fait la
                différence et où l&apos;excellence n&apos;est pas un objectif,
                mais un standard.
              </p>
            </div>

            {/* Bouton discret avec soulignement */}
            <a
              href="#services"
              className="inline-block mt-8 font-lato underline underline-offset-4 hover:opacity-70 transition-opacity duration-300"
              style={{ color: "#7a6047" }}
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
