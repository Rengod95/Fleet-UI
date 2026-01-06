import type { MetadataRoute } from 'next';

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    // fallback for local dev
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Crawl budget 절약용(콘텐츠 색인에는 영향 없음)
        disallow: ['/_next/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

