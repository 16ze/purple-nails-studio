import { notFound } from "next/navigation";
import { SERVICES, getServiceById } from "@/lib/data";
import ParallaxImage from "@/components/ParallaxImage";
import Magnetic from "@/components/Magnetic";

/**
 * Génère les paramètres statiques pour tous les services
 */
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

/**
 * Interface pour les paramètres de la page
 */
interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Page de détail d'un service
 * Layout : Galerie à gauche (scrollable), Infos à droite (sticky)
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);

  // Si le service n'existe pas, affiche une page 404
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F0EC]">
      {/* Layout Desktop : Flex horizontal */}
      <div className="lg:flex">
        {/* Colonne Gauche - Galerie d'images (scrollable) */}
        <div className="w-full lg:w-[60%] px-4 md:px-8 lg:px-16 py-16 lg:py-24">
          {/* Sur mobile : Affiche le texte avant les images */}
          <div className="lg:hidden mb-12">
            {/* Durée */}
            <div className="mb-4">
              <p className="font-lato text-sm uppercase tracking-widest opacity-60 text-[#2D0036]">
                DURÉE : {service.duration}
              </p>
            </div>

            {/* Titre */}
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#2D0036]">
              {service.title}
            </h1>

            {/* Description */}
            <div className="mb-8">
              <p className="font-lato text-lg leading-relaxed text-[#2D0036]">
                {service.description}
              </p>
            </div>

            {/* Bouton CTA - Réserver sur Planity */}
            <Magnetic>
              <a
                href={service.planityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-12 py-4 border border-[#2D0036] text-[#2D0036] font-lato text-lg uppercase tracking-widest transition-all duration-300 hover:bg-[#2D0036] hover:text-[#F2F0EC] text-center"
              >
                RÉSERVER SUR PLANITY
              </a>
            </Magnetic>
          </div>

          {/* Liste des images de la galerie */}
          {service.gallery && service.gallery.length > 0 ? (
            <div className="space-y-10">
              {service.gallery.map((imageUrl, index) => (
                <div key={index} className="w-full">
                  <ParallaxImage
                    src={imageUrl}
                    alt={`${service.title} - Galerie Purple Nails Studio - Image ${index + 1}`}
                    className="w-full h-[60vh] md:h-[70vh]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#2D0036]">Aucune image disponible</p>
          )}
        </div>

        {/* Colonne Droite - Infos (Sticky sur desktop) */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen">
          <div className="h-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-16 lg:py-24">
            <div className="max-w-xl">
              {/* Durée */}
              <div className="mb-6">
                <p className="font-lato text-sm uppercase tracking-widest opacity-60 text-[#2D0036]">
                  DURÉE : {service.duration}
                </p>
              </div>

              {/* Titre - Énorme */}
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-[#2D0036] leading-tight">
                {service.title}
              </h1>

              {/* Description */}
              <div className="mb-12">
                <p className="font-lato text-lg md:text-xl leading-relaxed text-[#2D0036]">
                  {service.description}
                </p>
              </div>

              {/* Bouton CTA - Réserver sur Planity */}
              <Magnetic>
                <a
                  href={service.planityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full md:w-auto px-12 py-4 border border-[#2D0036] text-[#2D0036] font-lato text-lg uppercase tracking-widest transition-all duration-300 hover:bg-[#2D0036] hover:text-[#F2F0EC] text-center"
                >
                  RÉSERVER SUR PLANITY
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
