import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/test"],
    },
    sitemap: "https://magantakreasi.com/sitemap.xml",
    host: "https://magantakreasi.com",
  };
}
