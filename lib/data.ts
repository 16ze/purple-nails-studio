/**
 * Interface pour les données d'un service
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  gallery: string[]; // Tableau d'URLs d'images pour la galerie
  planityUrl: string;
}

/**
 * Liste des services proposés par le studio
 * Les réservations se font via Planity
 */
export const SERVICES: Service[] = [
  {
    id: "manucure",
    title: "Manucure",
    description:
      "Un soin complet des ongles avec vernis pour des mains parfaitement manucurées. Soin des cuticules, limage et pose de vernis de qualité.",
    duration: "1h",
    gallery: [
      "/IMG_7582.jpg",
      "/D50688F3-F5A0-416E-8130-35AB55B69656.JPG",
      "/IMG_5500.jpg",
    ],
    planityUrl: "https://www.planity.com/azurra-beaute-anama-25600-sochaux",
  },
  {
    id: "manucure-russe",
    title: "Manucure Russe",
    description:
      "Technique de manucure professionnelle d'origine russe, offrant un résultat impeccable et durable. Soin approfondi des cuticules et finition parfaite.",
    duration: "1h30",
    gallery: [
      "/C912AB6A-2F11-4C51-82E6-EC01974A56A0.JPG",
      "/IMG_5386.PNG",
      "/IMG_5639.jpg",
    ],
    planityUrl: "https://www.planity.com/azurra-beaute-anama-25600-sochaux",
  },
  {
    id: "pedicure",
    title: "Pédicure",
    description:
      "Soin complet des pieds pour des pieds doux et des ongles parfaitement soignés. Soin des cuticules, gommage et pose de vernis.",
    duration: "1h",
    gallery: [
      "/IMG_1704.jpg",
      "/pédicure.jpeg",
      "/IMG_6253.jpg",
    ],
    planityUrl: "https://www.planity.com/azurra-beaute-anama-25600-sochaux",
  },
  {
    id: "nail-art",
    title: "Nail Art",
    description:
      "Création artistique sur vos ongles pour un look unique et personnalisé. Design sur mesure selon vos envies et votre style.",
    duration: "2h",
    gallery: [
      "/IMG_6007_SnapseedCopy.jpg",
      "/IMG_6317.jpg",
      "/IMG_9308.jpg",
    ],
    planityUrl: "https://www.planity.com/azurra-beaute-anama-25600-sochaux",
  },
];

/**
 * Fonction utilitaire pour récupérer un service par son ID
 */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

