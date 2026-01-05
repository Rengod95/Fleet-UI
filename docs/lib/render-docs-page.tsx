import { notFound } from 'next/navigation';

import { MissingTranslationBanner } from '@/components/MissingTranslationBanner';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';

import type { DocsPageHref } from './pages-content';
import { getPageLoader, pageContentKo } from './pages-content';

export async function renderDocsPage({
  params,
  href,
}: {
  params: Promise<{ locale: string }>;
  href: DocsPageHref;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const loadPrimary = getPageLoader(locale, href);
  const loadFallback = pageContentKo[href];

  let missingTranslation = false;
  let MDX: React.ComponentType<any> | null = null;

  if (loadPrimary) {
    MDX = (await loadPrimary()).default;
  } else if (locale !== 'ko') {
    missingTranslation = true;
    MDX = (await loadFallback()).default;
  } else {
    MDX = (await loadFallback()).default;
  }

  return (
    <>
      {missingTranslation ? (
        <MissingTranslationBanner requestedLocale={locale} fallbackLocale="ko" />
      ) : null}
      <MDX />
    </>
  );
}

