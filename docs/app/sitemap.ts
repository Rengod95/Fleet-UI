import type { MetadataRoute } from 'next';

import { components } from '@/lib/generated/components';
import type { DocsPageHref } from '@/lib/pages-content';
import { SUPPORTED_LOCALES, withLocale } from '@/lib/i18n';

const DOC_PAGES: DocsPageHref[] = [
  '/introduce',
  '/fundamental',
  '/fundamental/theming',
  '/fundamental/token-architecture',
  '/getting-started/quick-start',
  '/getting-started/install',
  '/others/faq',
];

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    // fallback for local dev
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    // landing (`/{locale}`)
    entries.push({
      url: `${base}${withLocale('/', locale)}`,
      lastModified: now,
    });

    // docs index
    entries.push({
      url: `${base}${withLocale('/components', locale)}`,
      lastModified: now,
    });

    for (const p of DOC_PAGES) {
      entries.push({
        url: `${base}${withLocale(p, locale)}`,
        lastModified: now,
      });
    }

    for (const c of components) {
      entries.push({
        url: `${base}${withLocale(`/components/${c.slug}`, locale)}`,
        lastModified: now,
      });
    }
  }

  return entries;
}

