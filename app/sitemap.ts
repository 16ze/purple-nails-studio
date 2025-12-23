import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://purple-nails-studio-1brr5rsw4-16zes-projects.vercel.app";

  // Pages principales
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Pages de services dynamiques
  SERVICES.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}

