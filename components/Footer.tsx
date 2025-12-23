"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Interface pour les questions FAQ
 */
interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Liste des questions fréquemment posées adaptées au salon de beauté
 */
const faqItems: FAQItem[] = [
  {
    question: "QUELS TYPES DE PAIEMENT SONT ACCEPTÉS ?",
    answer:
      "Nous acceptons les paiements en espèces, par carte bancaire uniquement sur Planity et par virement bancaire. Les paiements par chèque ne sont pas acceptés.",
  },
  {
    question: "OÙ EST SITUÉ LE SALON ? QUELS SONT LES HORAIRES D'OUVERTURE ?",
    answer:
      "Notre salon est situé au 3 avenue du Général Leclerc, 25600 Sochaux. Nous sommes ouverts du mardi au samedi de 9h à 19h. Le lundi est notre jour de fermeture.",
  },
  {
    question:
      "POURQUOI CERTAINS DISENT QUE LES PRESTATIONS SONT PLUS CHÈRES ICI ?",
    answer:
      "Nous utilisons exclusivement des produits de qualité professionnelle et des techniques avancées. Chaque prestation est réalisée avec un soin méticuleux et une attention particulière aux détails, ce qui justifie notre tarification premium.",
  },
  {
    question: "C'EST MA PREMIÈRE VISITE, QUE DOIS-JE SAVOIR ?",
    answer:
      "Pour votre première visite, nous vous recommandons d'arriver 10 minutes en avance. Veuillez venir avec des ongles propres, sans vernis.",
  },
  {
    question: "COMMENT PUIS-JE RÉDUIRE LE TEMPS DE TRAITEMENT ?",
    answer:
      "Pour réduire le temps de traitement, nous vous recommandons de prendre rendez-vous en ligne à l'avance, d'arriver à l'heure, et de venir avec une idée précise du design souhaité. Les clients réguliers bénéficient également de séances plus rapides.",
  },
  {
    question: "QU'EST-CE QUI DÉTERMINE LA DURÉE DU TRAITEMENT ?",
    answer:
      "La durée dépend du type de prestation (manucure classique, pose de vernis semi-permanent, nail art complexe), de l'état de vos ongles, et de la complexité du design choisi. Une manucure classique prend environ 1 heure 30, tandis qu'une pose avec nail art peut prendre plusj de 2 heures.",
  },
];

/**
 * Composant FAQ - Section de questions fréquemment posées avec accordéon
 */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * Gère l'ouverture/fermeture des questions FAQ
   * @param index - Index de la question à ouvrir/fermer
   */
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Colonne gauche : Introduction FAQ */}
        <div>
          <h2 className="font-playfair text-4xl md:text-5xl mb-6">
            Questions Fréquemment Posées
          </h2>
          <p className="font-lato text-lg leading-relaxed mb-8">
            Vous ne trouvez pas la réponse à votre question ? Contactez-nous par
            chat. Nous serons ravis de vous répondre !
          </p>
          <a
            href="tel:+33783389817"
            className="inline-block font-lato text-lg px-8 py-3 bg-[#7a6047] text-white rounded-md hover:bg-[#6a5037] transition-colors duration-300 uppercase tracking-wider"
          >
            Contact
          </a>
        </div>

        {/* Colonne droite : Liste des questions */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-[#2D0036]/20 pb-4">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between text-left font-lato text-lg uppercase tracking-wide hover:text-[#7a6047] transition-colors duration-300"
              >
                <span className="pr-4">{item.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 font-lato text-base leading-relaxed opacity-80">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Composant Footer - Pied de page massif avec effet de découverte
 * Design luxe avec titre gigantesque, informations de contact et section FAQ
 */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);

  /**
   * Animation ScrollTrigger pour le titre gigantesque
   * Fade in du texte quand on arrive en bas de la page
   */
  useEffect(() => {
    if (!titleRef.current || !footerRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  /**
   * Animation pour le contenu (adresse, contact, réseaux)
   * Apparition progressive avec fade in
   */
  useEffect(() => {
    if (!contentRef.current || !footerRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  /**
   * Animation pour la section FAQ
   * Apparition progressive avec fade in
   */
  useEffect(() => {
    if (!faqRef.current || !footerRef.current) return;

    gsap.fromTo(
      faqRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 60%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  /**
   * Animation de parallaxe pour l'image de fond
   * Effet léger de parallaxe au scroll
   */
  useGSAP(() => {
    if (!backgroundImageRef.current || !footerRef.current) return;

    /**
     * Animation de parallaxe légère
     * L'image se déplace légèrement au scroll pour créer un effet de profondeur
     */
    const animation = gsap.fromTo(
      backgroundImageRef.current,
      { y: "-10%" }, // Position de départ : légèrement décalée vers le haut
      {
        y: "10%", // Position finale : légèrement décalée vers le bas
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", // Démarre quand le footer entre en bas du viewport
          end: "bottom top", // Finit quand le bas du footer sort en haut du viewport
          scrub: true, // L'animation colle au scroll
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
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-purple-dark min-h-[80vh] relative overflow-hidden"
      style={{ color: "#2D0036" }}
    >
      {/* Image de fond avec parallaxe légère */}
      <div ref={backgroundImageRef} className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/footer-image.jpeg"
          alt="Footer background"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Overlay pour assurer la lisibilité du contenu */}
      <div className="absolute inset-0 z-0 bg-[#e8dcca]/40" />

      {/* Contenu du footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        {/* Section FAQ */}
        <div ref={faqRef} className="opacity-0 mb-20">
          <FAQ />
        </div>

        {/* Grille avec informations (Adresse, Contact, Réseaux) */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
        >
          {/* Adresse */}
          <div>
            <h3 className="font-playfair text-2xl mb-4">Adresse</h3>
            <p className="font-lato text-lg leading-relaxed">
              3 avenue du Général Leclerc
              <br />
              25600 Sochaux, France
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-2xl mb-4">Contact</h3>
            <p className="font-lato text-lg leading-relaxed">
              Tél: +33 7 83 38 98 17
              <br />
              Email: roseboegli@gmail.com
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="font-playfair text-2xl mb-4">Réseaux Sociaux</h3>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/__purplenails__?igsh=cDNzN3JvbjVtYmU5"
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato text-lg underline underline-offset-4 hover:text-[#7a6047] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@purplenails_studio?_r=1&_t=ZN-92TDnvlQx9y"
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato text-lg underline underline-offset-4 hover:text-[#7a6047] transition-colors duration-300"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Titre gigantesque centré */}
        <div className="text-center">
          <h2
            ref={titleRef}
            className="font-playfair text-[15vw] md:text-[12vw] leading-none font-bold opacity-0"
          >
            PURPLE NAILS
          </h2>
        </div>
      </div>
    </footer>
  );
}
