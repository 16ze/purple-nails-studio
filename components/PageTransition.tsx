"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import CurveOverlay, { CurveOverlayHandle } from "./CurveOverlay";

/**
 * Context pour partager la référence du CurveOverlay
 */
interface PageTransitionContextType {
  triggerTransition: (callback: () => void) => Promise<void>;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

/**
 * Hook pour utiliser le contexte de transition de page
 */
export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider"
    );
  }
  return context;
}

/**
 * Props pour PageTransitionProvider
 */
interface PageTransitionProviderProps {
  children: ReactNode;
}

/**
 * Provider de transition de page
 * Expose une fonction pour déclencher l'animation de transition
 */
export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const curveOverlayRef = useRef<CurveOverlayHandle>(null);

  /**
   * Déclenche l'animation de transition
   * @param callback - Fonction à exécuter après l'animation In (généralement la navigation)
   */
  const triggerTransition = async (callback: () => void) => {
    if (!curveOverlayRef.current) {
      // Si pas d'overlay, exécute juste le callback
      callback();
      return;
    }

    try {
      // Animation In : Couvre l'écran
      await curveOverlayRef.current.animateIn();

      // Exécute le callback (navigation)
      callback();

      // Petit délai pour laisser le temps à la navigation de s'effectuer
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Animation Out : Révèle la nouvelle page
      await curveOverlayRef.current.animateOut();
    } catch (error) {
      // En cas d'erreur, s'assure que le scroll est réactivé
      document.body.style.overflow = "";
      console.error("Erreur lors de la transition:", error);
    }
  };

  return (
    <PageTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <CurveOverlay ref={curveOverlayRef} />
    </PageTransitionContext.Provider>
  );
}

