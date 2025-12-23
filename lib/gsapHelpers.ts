import { gsap } from "gsap";

/**
 * Interface pour la configuration de horizontalLoop
 */
interface HorizontalLoopConfig {
  repeat?: number;
  reversed?: boolean;
  paddingRight?: number;
  paused?: boolean;
  speed?: number;
  onChange?: (self: any) => void;
}

/**
 * Fonction helper GSAP pour créer une boucle horizontale infinie
 * Version optimisée pour les marquees avec animation fluide
 * 
 * @param items - Éléments HTML à animer (peut être un sélecteur, un tableau, ou une NodeList)
 * @param config - Configuration de la boucle (repeat, paddingRight, speed, etc.)
 * @returns Un objet avec la timeline et des méthodes pour contrôler la boucle
 */
export function horizontalLoop(items: any, config: HorizontalLoopConfig = {}) {
  items = gsap.utils.toArray(items);
  config = {
    repeat: -1,
    paddingRight: 0,
    paused: false,
    reversed: false,
    speed: 100, // pixels par seconde
    ...config,
  };

  // Calcule la largeur totale du contenu
  let totalWidth = 0;
  const widths: number[] = [];
  
  items.forEach((item: HTMLElement) => {
    const width = item.offsetWidth;
    widths.push(width);
    totalWidth += width + (config.paddingRight || 0);
  });

  // Crée une timeline avec animation infinie
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    reversed: config.reversed,
    onUpdate: config.onChange,
  });

  // Animation : déplace tous les éléments vers la gauche
  items.forEach((item: HTMLElement, index: number) => {
    const x = -(totalWidth - (config.paddingRight || 0));
    const duration = Math.abs(x / (config.speed || 100));
    
    tl.to(
      item,
      {
        x: x,
        ease: "none",
        duration: duration,
      },
      0 // Tous les éléments s'animent en même temps
    );
  });

  // Retourne un objet avec les méthodes de contrôle
  const loop = {
    tl,
    timeScale: (value: number) => {
      tl.timeScale(value);
      return loop;
    },
    progress: (value?: number) => {
      if (value !== undefined) {
        tl.progress(value);
        return loop;
      }
      return tl.progress();
    },
  };

  return loop;
}