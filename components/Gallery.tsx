"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParallaxImage from "./ParallaxImage";

/**
 * Liste des images de la galerie
 * Mélange de formats portrait et paysage pour créer un effet Masonry naturel
 */
const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    alt: "Nail art design",
  },
  {
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2127&auto=format&fit=crop",
    alt: "Luxe manicure",
  },
  {
    url: "https://images.unsplash.com/photo-1519017715179-c6f2f6ee7a27?q=80&w=2670&auto=format&fit=crop",
    alt: "Professional nail service",
  },
  {
    url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    alt: "Nail studio",
  },
  {
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    alt: "Artistic nails",
  },
  {
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2127&auto=format&fit=crop",
    alt: "Premium nail care",
  },
  {
    url: "https://images.unsplash.com/photo-1519017715179-c6f2f6ee7a27?q=80&w=2670&auto=format&fit=crop",
    alt: "Nail art showcase",
  },
  {
    url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    alt: "Luxury nail design",
  },
  {
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    alt: "Elegant manicure",
  },
];

/**
 * Composant Gallery - Galerie Masonry style Pinterest
 * Images déstructurées avec animations d'apparition au scroll
 */
export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Animation d'apparition des conteneurs d'images avec effet stagger
   * Utilise useGSAP pour une intégration optimale avec React
   * Les conteneurs apparaissent une par une avec une légère montée et fade-in
   * Les images gèrent leur propre parallaxe via le composant ParallaxImage
   */
  useGSAP(() => {
    if (!sectionRef.current || imageContainersRef.current.length === 0) return;

    // Filtre les références nulles
    const validContainers = imageContainersRef.current.filter(
      (container): container is HTMLDivElement => container !== null
    );

    /**
     * Animation avec ScrollTrigger
     * Quand la galerie arrive dans la vue, les conteneurs apparaissent une par une
     * Effet : opacité 0 -> 1 et légère montée (y: 50 -> y: 0)
     */
    const animation = gsap.fromTo(
      validContainers,
      {
        y: 50, // Commence 50px plus bas
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1, // Délai de 0.1s entre chaque conteneur
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    /**
     * Cleanup : Nettoie l'animation et le ScrollTrigger lors du démontage
     */
    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream px-8">
      <div className="max-w-7xl mx-auto py-20 md:py-32">
        {/* Titre de section */}
        <h2 className="font-playfair text-4xl text-center py-8 text-purple-dark">
          Selected Works
        </h2>

        {/* Grille Masonry avec colonnes CSS */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imageContainersRef.current[index] = el;
              }}
              className="break-inside-avoid opacity-0"
            >
              <ParallaxImage
                src={image.url}
                alt={image.alt}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

