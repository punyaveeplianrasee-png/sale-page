import type { MetadataRoute } from "next";

const baseUrl = "https://tradethefutureclub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/explore`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/news-analysis`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/open-account`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
