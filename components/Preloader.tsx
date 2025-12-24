"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

/**
 * Composant Preloader - Animation géométrique avec fusion et explosion du texte
 * Les formes géométriques (triangle, carré, cercle) apparaissent, dansent, fusionnent au centre,
 * puis le texte "PURPLE" explose à la place
 */
export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  /**
   * Bloque le scroll au chargement
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  /**
   * Animation GSAP complète : formes géométriques → fusion → texte
   */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Animation de sortie (Rideau vers le haut)
          gsap.to(container.current, {
            yPercent: -100,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              setIsHidden(true);
              document.body.style.overflow = "";
            },
          });
        },
      });

      // Configuration initiale : toutes les formes et le texte sont cachés
      gsap.set("#final-text", { scale: 0, autoAlpha: 0 });
      gsap.set("#triangle, #square, #circle", {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: "center center",
      });

      tl
        // 1. Apparition des formes (Pop avec effet back.out)
        .to("#triangle, #square, #circle", {
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        })

        // 2. Danse / Rotation (Les formes bougent et tournent)
        .to(
          "#triangle",
          { rotation: 360, x: -50, duration: 1.5, ease: "power2.inOut" },
          "dance"
        )
        .to(
          "#square",
          { rotation: -180, duration: 1.5, ease: "power2.inOut" },
          "dance"
        )
        .to("#circle", { x: 50, duration: 1.5, ease: "power2.inOut" }, "dance")

        // 3. Fusion au centre (Tout revient à 0,0 et rétrécit)
        .to(
          "#triangle, #square, #circle",
          {
            x: 0,
            y: 0,
            scale: 0.1, // Rétrécit presque totalement
            rotation: 0,
            duration: 0.6,
            ease: "back.in(2)",
          },
          "merge"
        )

        // 4. Explosion du Texte (Le texte apparaît par-dessus les formes réduites)
        .to(
          "#final-text",
          {
            scale: 1.5,
            autoAlpha: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          },
          "merge+=0.4" // Déclenche un peu après le début de la fusion
        )

        // 5. Les formes disparaissent complètement
        .to(
          "#triangle, #square, #circle",
          { autoAlpha: 0, duration: 0.1 },
          "merge+=0.5"
        )

        // 6. Pause pour lire le nom
        .to({}, { duration: 0.8 });
    },
    { scope: container }
  );

  // Si le preloader est caché, ne rien afficher
  if (isHidden) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[99999] flex items-center justify-center w-screen h-screen overflow-hidden"
      style={{ backgroundColor: "#E8DCCA" }} // Fond Beige demandé
    >
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full max-w-[600px] max-h-[400px] px-4 md:px-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dégradés pour les formes géométriques */}
          <linearGradient id="grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0" stopColor="#2D0036" /> {/* Violet Dark */}
            <stop offset="1" stopColor="#5D4E6D" /> {/* Violet Muted */}
          </linearGradient>

          <linearGradient id="grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0.1" stopColor="#000000" />
            <stop offset="0.8" stopColor="#000000" />
          </linearGradient>

          <radialGradient id="grad-3" cx="50%" cy="50%" r="50%">
            <stop offset="0.3" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" />
          </radialGradient>
        </defs>

        {/* Groupe centré pour les animations */}
        <g transform="translate(400, 200)">
          {/* Les 3 Formes Géométriques */}
          {/* Triangle décalé à gauche */}
          <polygon
            id="triangle"
            fill="url(#grad-1)"
            points="0,-60 50,40 -50,40"
            transform="translate(-100, 0)"
          />

          {/* Carré au centre */}
          <rect
            id="square"
            fill="url(#grad-2)"
            x="-40"
            y="-40"
            width="80"
            height="80"
          />

          {/* Cercle décalé à droite */}
          <circle
            id="circle"
            fill="url(#grad-3)"
            cx="0"
            cy="0"
            r="45"
            transform="translate(100, 0)"
          />

          {/* Le Texte Final qui apparaît au centre */}
          <text
            id="final-text"
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FFFFFF"
            className="font-playfair font-bold tracking-widest"
            style={{
              fontSize: "clamp(32px, 8vw, 60px)",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            PURPLE NAILS.
          </text>
        </g>
      </svg>
    </div>
  );
}
