import type { MetadataRoute } from "next";
import { doctors, posts, specialties } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carebridge.example.com";
  const staticRoutes = ["", "/about", "/services", "/doctors", "/book", "/blog", "/contact", "/careers"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...specialties.map((item) => ({ url: `${baseUrl}/services/${item.slug}`, lastModified: new Date() })),
    ...doctors.map((item) => ({ url: `${baseUrl}/doctors/${item.slug}`, lastModified: new Date() })),
    ...posts.map((item) => ({ url: `${baseUrl}/blog/${item.slug}`, lastModified: new Date(item.date) }))
  ];
}
