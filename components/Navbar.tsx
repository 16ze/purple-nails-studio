"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Composant Navbar - Navigation fixe avec animation intelligente au scroll
 * Design premium avec menu mobile overlay et logique GSAP Smart Scroll
 * La navbar se cache quand on descend et réapparaît quand on remonte
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Animation GSAP Smart Scroll : La navbar se cache en descendant, réapparaît en remontant
   * Utilise ScrollTrigger pour détecter la direction du scroll
   */
  useGSAP(
    () => {
      if (!navRef.current) return;

      /**
       * Animation qui fait glisser la navbar vers le haut (yPercent: -100)
       * Par défaut, elle est visible (progress: 1)
       */
      const showAnim = gsap
        .from(navRef.current, {
          yPercent: -100, // Glisse vers le haut (hors de la vue)
          paused: true, // On contrôle l'animation manuellement
          duration: 0.2, // Animation rapide et fluide
        })
        .progress(1); // Position initiale : visible (progress à 1 = visible, 0 = caché)

      /**
       * ScrollTrigger qui surveille le scroll et contrôle l'affichage de la navbar
       */
      ScrollTrigger.create({
        start: "top top", // Commence dès le haut de la page
        end: "max", // Continue jusqu'à la fin du document
        onUpdate: (self) => {
          // self.direction === -1 : on remonte -> Afficher la navbar
          // self.direction === 1 : on descend -> Cacher la navbar
          if (self.direction === -1) {
            showAnim.play(); // Affiche (glisse vers le bas)
          } else {
            showAnim.reverse(); // Cache (glisse vers le haut)
          }

          // Gestion de la classe nav-scrolled pour réduire la hauteur et changer le fond
          if (self.scroll() > 50) {
            navRef.current?.classList.add("nav-scrolled");
          } else {
            navRef.current?.classList.remove("nav-scrolled");
          }
        },
      });
    },
    { scope: navRef }
  );

  /**
   * Animation GSAP pour le menu overlay et les liens
   * Crée une timeline fluide avec animations synchronisées
   */
  useGSAP(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      // Crée une timeline pour animer l'ouverture du menu
      const tl = gsap.timeline();

      // Bloque le scroll du body
      document.body.style.overflow = "hidden";

      // Animation de l'overlay : descend du haut (clip-path)
      // Rendre visible et activer les pointer-events avant l'animation
      overlayRef.current.style.visibility = "visible";
      overlayRef.current.style.pointerEvents = "auto";

      tl.fromTo(
        overlayRef.current,
        {
          clipPath: "inset(0% 0 100% 0)", // Commence fermé (100% en bas = invisible)
        },
        {
          clipPath: "inset(0% 0 0% 0)", // S'ouvre complètement
          duration: 1,
          ease: "power4.inOut",
        }
      );

      // Animation des liens : apparaissent un par un avec stagger
      const linkElements = linksRef.current.children;
      tl.fromTo(
        linkElements,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1, // Délai de 0.1s entre chaque lien
        },
        "-=0.5" // Commence 0.5s avant la fin de l'animation précédente
      );
    } else {
      // Animation de fermeture
      if (!overlayRef.current || !linksRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          // Réinitialise l'état après l'animation
          if (overlayRef.current) {
            overlayRef.current.style.visibility = "hidden";
            overlayRef.current.style.pointerEvents = "none";
          }
          // Réactive le scroll
          document.body.style.overflow = "";
        },
      });

      // Animation des liens : disparaissent
      const linkElements = linksRef.current.children;
      tl.to(linkElements, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
      });

      // Animation de l'overlay : remonte
      tl.to(
        overlayRef.current,
        {
          clipPath: "inset(0% 0 100% 0)",
          duration: 0.6,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
    }
  }, [isOpen]);

  /**
   * Animation GSAP pour le bouton hamburger
   * Les deux lignes pivotent pour former une croix quand ouvert
   */
  useGSAP(() => {
    if (!topLineRef.current || !bottomLineRef.current) return;

    if (isOpen) {
      // État ouvert : forme une croix
      gsap.to(topLineRef.current, {
        rotation: 45,
        y: 6, // Déplace légèrement pour centrer la croix
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(bottomLineRef.current, {
        rotation: -45,
        y: -6, // Déplace légèrement pour centrer la croix
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // État fermé : lignes parallèles
      gsap.to([topLineRef.current, bottomLineRef.current], {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  /**
   * Gère le clic sur le bouton menu
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Gère le clic sur les liens de navigation
   * Ferme le menu et scroll vers la section cible (ou redirige si lien externe)
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean
  ) => {
    if (!isExternal) {
      e.preventDefault();
    }

    setIsOpen(false);

    // Si c'est un lien externe, on laisse le comportement par défaut
    if (isExternal) {
      return;
    }

    // Si c'est une ancre, on navigue d'abord vers la page principale si nécessaire
    if (href.startsWith("#")) {
      // Si on est sur une page de service, on revient d'abord à la page principale
      if (pathname && pathname.startsWith("/services")) {
        // Navigue vers la page principale
        router.push("/");
        // Scroll vers la section après le chargement de la page
        setTimeout(() => {
          const targetId = href.replace("#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 600);
        return;
      }

      // Sinon, on scroll simplement vers la section
      setTimeout(() => {
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    }
  };

  /**
   * Liens de navigation principaux
   */
  const navLinks: Array<{
    label: string;
    href: string;
    external?: boolean;
  }> = [
    { label: "ACCUEIL", href: "#home" },
    { label: "SERVICES", href: "#services" },
    { label: "GALERIE", href: "#gallery" },
    {
      label: "RÉSERVER",
      href: "https://www.planity.com/azurra-beaute-anama-25600-sochaux",
      external: true,
    },
  ];

  return (
    <>
      {/* Header fixe avec effet flou (glassmorphism) et transition de hauteur */}
      {/* Cache le header quand le menu mobile est ouvert pour éviter les conflits visuels */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 h-[50px] flex items-center justify-between px-8 transition-all duration-[400ms] ease-in-out ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: `rgba(122, 96, 71, 0.3)` /* Fond semi-transparent avec couleur #7a6047 pour le glassmorphism */,
        }}
      >
        {/* Bouton Menu Hamburger à gauche */}
        <button
          onClick={toggleMenu}
          className="relative w-12 h-12 flex flex-col items-center justify-center gap-2 group cursor-pointer z-50"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {/* Ligne du haut */}
          <div
            ref={topLineRef}
            className="w-8 h-0.5 transition-colors duration-300 group-hover:bg-gold"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          {/* Ligne du bas */}
          <div
            ref={bottomLineRef}
            className="w-8 h-0.5 transition-colors duration-300 group-hover:bg-gold"
            style={{ backgroundColor: "#FFFFFF" }}
          />
        </button>

        {/* Logo au centre - Font Playfair - Texte en blanc */}
        <div
          className="font-playfair text-xl md:text-2xl font-bold transition-colors duration-300 absolute left-1/2 transform -translate-x-1/2"
          style={{ color: "#FFFFFF" }}
        >
          PURPLE NAILS
        </div>

        {/* Bouton Prendre rendez-vous à droite - Icône sur mobile, texte sur desktop */}
        <a
          href="https://www.planity.com/azurra-beaute-anama-25600-sochaux"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lato text-sm uppercase tracking-widest px-4 md:px-6 py-2 text-white hover:opacity-70 transition-all duration-300 flex items-center justify-center"
          aria-label="Prendre rendez-vous"
        >
          {/* Icône visible uniquement sur mobile */}
          <Calendar className="w-5 h-5 md:hidden" />
          {/* Texte visible uniquement sur desktop */}
          <span className="hidden md:inline">Prendre rendez-vous</span>
        </a>
      </header>

      {/* Overlay du menu mobile - Plein écran */}
      <div
        ref={overlayRef}
        className="fixed inset-0 h-screen w-screen bg-[#1A1A1A] text-[#F2F0EC] z-40 pointer-events-none"
        style={{
          visibility: "hidden",
          clipPath: "inset(0% 0 100% 0)", // Initialement fermé (100% en bas = invisible)
        }}
      >
        <div className="h-full flex flex-col">
          {/* Espace pour le logo et le bouton (pour alignement visuel) */}
          <div className="py-6 px-8 flex items-center justify-between">
            <div className="font-playfair text-xl md:text-2xl font-bold">
              PURPLE NAILS
            </div>
            {/* Bouton de fermeture (le même que le bouton d'ouverture) */}
            <button
              className="relative w-12 h-12 flex flex-col items-center justify-center gap-2 group cursor-pointer"
              aria-label="Fermer le menu"
              onClick={toggleMenu}
            >
              <div
                className="w-8 h-0.5 bg-[#F2F0EC] transition-colors duration-300 group-hover:bg-gold"
                style={{ transform: "translateY(8px) rotate(45deg)" }}
              />
              <div
                className="w-8 h-0.5 bg-[#F2F0EC] transition-colors duration-300 group-hover:bg-gold"
                style={{ transform: "translateY(-8px) rotate(-45deg)" }}
              />
            </button>
          </div>

          {/* Contenu principal : liens de navigation centrés */}
          <div className="flex-1 flex items-center justify-center">
            <div
              ref={linksRef}
              className="flex flex-col items-center justify-center gap-8 md:gap-12"
            >
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.external)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight cursor-pointer transition-colors duration-300 hover:text-gold"
                  style={{ opacity: 0 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bas de page : petits liens */}
          <div className="pb-12 px-8 flex items-center justify-between">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato text-sm uppercase tracking-widest text-[#F2F0EC]/70 hover:text-[#F2F0EC] transition-colors duration-300"
            >
              Instagram
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="font-lato text-sm uppercase tracking-widest text-[#F2F0EC]/70 hover:text-[#F2F0EC] transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
