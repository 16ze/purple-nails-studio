"use client";

import { SERVICES } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import CurveLink from "./CurveLink";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Composant ServiceGrid - Grille de services avec cartes interactives
 * Chaque carte est un lien vers la page de détail du service avec transition CurveLink
 */
export default function ServiceGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Animation GSAP ScrollTrigger pour le titre et les cartes
   * Le titre apparaît en premier, puis les cartes apparaissent une par une avec un effet stagger
   */
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animation du titre
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Filtre les références nulles pour les cartes
    const validCards = cardsRef.current.filter(
      (card): card is HTMLDivElement => card !== null
    );

    if (validCards.length === 0) return;

    /**
     * Animation d'entrée avec stagger
     * Les cartes montent depuis y: 100 avec fade in
     */
    gsap.fromTo(
      validCards,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15, // Délai de 0.15s entre chaque carte
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Démarre quand le haut de la section atteint 80% de l'écran
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    /**
     * Cleanup : Nettoie les ScrollTriggers lors du démontage
     */
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Titre de section avec animation */}
      <h2
        ref={titleRef}
        className="font-playfair text-4xl text-center mb-16 opacity-0"
      >
        NOS PRESTATIONS
      </h2>

      {/* Grille de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {SERVICES.map((service, index) => {
          // Utilise l'image spécifique pour certains services, sinon la première image de la galerie
          let imageUrl = service.gallery[0] || "";
          if (service.id === "manucure") {
            imageUrl = "/IMG_7582.jpg";
          } else if (service.id === "nail-art") {
            imageUrl = "/IMG_6007_SnapseedCopy.jpg";
          } else if (service.id === "pedicure") {
            imageUrl = "/pédicure.jpeg";
          }

          return (
            <CurveLink
              key={service.id}
              href={`/services/${service.id}`}
              className="block"
            >
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="h-[500px] md:h-[600px] relative overflow-hidden rounded-lg group cursor-pointer opacity-0"
              >
                {/* Image avec zoom au survol */}
                {imageUrl && (
                  <div className="absolute inset-0">
                    <Image
                      src={imageUrl}
                      alt={`${service.title} - Prestation de soin des ongles par Purple Nails Studio`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Overlay dégradé noir en bas pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Contenu texte en bas à gauche */}
                <div className="absolute bottom-8 left-8 p-4">
                  {/* Titre avec animation au survol */}
                  <h3 className="text-white font-playfair text-3xl md:text-4xl italic mb-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    {service.title}
                  </h3>

                  {/* Sous-texte avec animation au survol */}
                  <p className="text-xs text-white/80 tracking-widest opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                    DÉCOUVRIR LE SOIN
                  </p>
                </div>
              </div>
            </CurveLink>
          );
        })}
      </div>
    </div>
  );
}
