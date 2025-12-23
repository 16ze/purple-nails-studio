import Hero from "@/components/Hero";
import HeroBento from "@/components/HeroBento";
import PhilosophyScatter from "@/components/PhilosophyScatter";
import Services from "@/components/Services";
import BentoGallery from "@/components/BentoGallery";
import Footer from "@/components/Footer";

/**
 * Page d'accueil - Assemblage des composants principaux
 * Enchaînement fluide des sections avec smooth scroll Lenis
 */
export default function Home() {
  return (
    <>
      {/* Section Hero - Image hero.jpeg avec texte */}
      <div id="home" data-bgcolor="#7a6047">
        <Hero />
      </div>

      {/* Div de transition de 500px */}
      <div className="h-[500px] bg-[#7a6047] absolute -mt-32 z-10"></div>

      {/* PhilosophyScatter - Section avec images dispersées et parallaxe */}
      <PhilosophyScatter />

      {/* Section Hero Bento - Grille qui s'explose au scroll avec effet Flip */}
      <div data-bgcolor="#7a6047">
        <HeroBento />
      </div>

      {/* Services - Liste interactive avec image flottante - Fond beige, texte sombre */}
      <div id="services" data-bgcolor="#e8dcca" data-textcolor="#2D0036">
        <Services />
      </div>

      {/* Gallery - Galerie Bento avec effet Flip GSAP */}
      <div id="gallery" data-bgcolor="#7a6047">
        <BentoGallery />
      </div>

      {/* Footer - Pied de page massif avec informations de contact - Fond beige, texte sombre */}
      <div id="contact" data-bgcolor="#e8dcca" data-textcolor="#2D0036">
        <Footer />
      </div>
    </>
  );
}
