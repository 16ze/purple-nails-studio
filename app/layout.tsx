import ColorChanger from "@/components/ColorChanger";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { PageTransitionProvider } from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

/**
 * Configuration de la police Playfair Display pour les titres
 * Aspect luxe/serif, utilisée pour créer une identité visuelle premium
 */
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

/**
 * Configuration de la police Lato pour le corps de texte
 * Aspect clean/sans-serif, optimisée pour la lisibilité
 */
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Purple Nails Studio | Manucure Russe & Nail Art d'Exception",
    template: "%s | Purple Nails Studio",
  },
  description:
    "Studio de manucure haute couture spécialisé en manucure russe, nail art artistique et soin des mains. Une expérience de beauté sur-mesure.",
  keywords: [
    "Manucure Russe",
    "Nail Art",
    "Onglerie Luxe",
    "Salon Manucure",
    "Purple Nails",
    "Soin des mains",
  ],
  authors: [{ name: "Purple Nails Studio" }],
  creator: "Purple Nails Studio",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://purple-nails-studio.vercel.app",
    title: "Purple Nails Studio | L'Art de la Manucure",
    description:
      "Découvrez l'excellence de la manucure russe et du nail art dans un cadre minimaliste et luxueux.",
    siteName: "Purple Nails Studio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Purple Nails Studio Preview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

/**
 * Layout racine de l'application
 * Applique les polices personnalisées via variables CSS sur le body
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfairDisplay.variable} ${lato.variable} antialiased`}
      >
        <JsonLd />
        <PageTransitionProvider>
          <ColorChanger />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
          {/* Overlay de grain pour effet texture premium */}
          <div className="noise-overlay" />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
