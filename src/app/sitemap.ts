import type { MetadataRoute } from "next";
import { restaurant } from "@/config/restaurant";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = restaurant.siteUrl;
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
