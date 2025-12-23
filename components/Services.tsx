"use client";

import ServiceGrid from "./ServiceGrid";

/**
 * Composant Services - Wrapper pour ServiceGrid
 * Maintient la structure de section pour le fond beige et les styles
 */
export default function Services() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <ServiceGrid />
      </div>
    </section>
  );
}

