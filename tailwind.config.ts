import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind CSS pour Purple Nails Studio
 * Définit les couleurs personnalisées du Design System
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fond principal, couleur beige/brun pour une ambiance chaleureuse
        cream: "#7a6047",
        // Pour les textes forts, couleur beige/ivoire pour l'élégance
        "purple-dark": "#e8dcca",
        // Pour les fonds secondaires, lavande très pâle pour la douceur
        "purple-soft": "#E6E6FA",
        // Pour les petits détails/boutons, accent doré pour le premium
        gold: "#D4AF37",
      },
      fontFamily: {
        // Polices personnalisées définies dans layout.tsx
        playfair: ["var(--font-playfair)", "serif"],
        lato: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

