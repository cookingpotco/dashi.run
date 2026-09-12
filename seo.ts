export const siteOrigin = "https://dashi.run";
export const defaultTitle = "Dashi Web Framework";

export interface Seo {
  title: string;
  description: string;
  index: boolean;
}

export const rootJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Dashi",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Deno",
      "url": siteOrigin,
    },
    {
      "@type": "Organization",
      "name": "Cooking Pot Co.",
      "url": siteOrigin,
      "logo": `${siteOrigin}/static/logo-icon-transp.png`,
    },
    {
      "@type": "WebSite",
      "name": "Dashi",
      "url": siteOrigin,
    },
  ],
});

export function docsBreadcrumbJsonLd(
  { navTitle, slug }: { navTitle: string; slug: string },
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteOrigin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Docs",
        item: `${siteOrigin}/docs/introduction`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: navTitle,
        item: `${siteOrigin}/docs/${slug}`,
      },
    ],
  });
}
