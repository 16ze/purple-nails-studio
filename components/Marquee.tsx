"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "@/lib/gsapHelpers";

// Enregistrement du plugin Observer
gsap.registerPlugin(Observer);

/**
 * Texte répété pour créer un effet de boucle infini
 * Liste des services proposés par le studio
 */
const marqueeText = "MANUCURE • MANUCURE RUSSE • PÉDICURE • NAIL ART • DÉPOSE • RÉPARATION D'ONGLE • ENTRETIENS • ";

/**
 * Composant Marquee - Bande de texte défilant en boucle infinie avec accélération au scroll
 * Utilise le helper horizontalLoop et le plugin Observer pour réagir au scroll
 * Design premium avec fond sombre et texte clair
 */
export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);

  /**
   * Initialise la boucle horizontale et l'observer pour l'accélération au scroll
   * La boucle se déplace infiniment, et accélère/décélère selon la direction du scroll
   */
  useGSAP(() => {
    if (!containerRef.current) return;

    // Sélectionne tous les éléments texte (spans contenant le texte répété)
    const texts = containerRef.current.querySelectorAll("span");
    
    if (texts.length === 0) return;

    // Crée la boucle horizontale avec le helper
    const loop = horizontalLoop(texts, {
      repeat: -1, // Répétition infinie
      paddingRight: 30, // Espacement entre les répétitions
    });

    // Stocke la référence de la boucle pour pouvoir la contrôler depuis l'observer
    loopRef.current = loop;

    /**
     * Observer qui détecte les mouvements de scroll et accélère/décélère la boucle
     * Quand on scroll vers le bas, la boucle accélère vers la droite
     * Quand on scroll vers le haut, la boucle accélère vers la gauche (inverse)
     */
    Observer.create({
      onChangeY(self) {
        if (!loopRef.current?.tl) return;

        let factor = 2.5; // Vitesse d'accélération de base
        if (self.deltaY < 0) factor *= -1; // Inverse le sens si on remonte

        // Accélère temporairement puis revient à la normale
        // Crée une timeline pour gérer la transition fluide de vitesse
        gsap.timeline({ defaults: { ease: "none" } })
          .to(loopRef.current.tl, {
            timeScale: factor * 2.5, // Accélération rapide
            duration: 0.2,
            overwrite: true,
          })
          .to(
            loopRef.current.tl,
            {
              timeScale: factor > 0 ? 1 : -1, // Retour à la vitesse normale (ou inverse si on remonte)
              duration: 1,
            },
            "+=0.3" // Commence 0.3s après la fin de l'accélération
          );
      },
    });

    // Cleanup : détruit l'observer et arrête la boucle quand le composant est démonté
    return () => {
      Observer.getAll().forEach((obs) => obs.kill());
      if (loopRef.current?.tl) {
        loopRef.current.tl.kill();
      }
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-transparent py-12"
    >
      <div className="inline-flex whitespace-nowrap">
        {/* Répète le texte plusieurs fois pour remplir l'écran */}
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className="font-playfair font-bold text-4xl md:text-6xl italic px-8 inline-block"
            style={{ color: "var(--text-color)" }}
          >
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
}