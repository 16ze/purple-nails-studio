"use client";

import { ReactNode, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { usePageTransition } from "./PageTransition";

/**
 * Props pour CurveLink
 */
interface CurveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Composant CurveLink - Lien avec transition de page "Curve Swipe"
 * 
 * Au clic :
 * 1. Empêche la navigation par défaut
 * 2. Lance l'animation In du CurveOverlay
 * 3. Navigue vers la nouvelle page
 * 4. Lance l'animation Out du CurveOverlay
 */
export default function CurveLink({
  href,
  children,
  className = "",
}: CurveLinkProps) {
  const router = useRouter();
  const { triggerTransition } = usePageTransition();

  /**
   * Gère le clic sur le lien
   */
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      // Si c'est une ancre (commence par #), on ne fait pas de transition
      // On laisse le comportement par défaut (scroll vers la section)
      if (href.startsWith("#")) {
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        return;
      }

      // Si c'est la page principale (/), on vérifie si on est déjà sur cette page
      const currentPath = window.location.pathname;
      if (href === "/" && currentPath === "/") {
        // Si on est déjà sur la page principale, on scroll en haut
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Pour les autres routes, on utilise la transition
      await triggerTransition(() => {
        router.push(href);
        // Force le scroll en haut de la page après navigation
        window.scrollTo(0, 0);
      });
    } catch (error) {
      // En cas d'erreur, réactive quand même le scroll
      document.body.style.overflow = "";
      console.error("Erreur lors de la transition:", error);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

