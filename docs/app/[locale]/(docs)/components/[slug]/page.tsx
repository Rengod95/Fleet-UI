import { notFound } from 'next/navigation';

import { ComponentDocLayout } from '../../../../../components/ComponentDocLayout';
import { MissingTranslationBanner } from '../../../../../components/MissingTranslationBanner';
import { componentDocs } from '../../../../../lib/component-docs';
import { components } from '../../../../../lib/generated/components';
import { componentContent as componentContentEn } from '../../../../../lib/generated/component-content.en';
import { componentContent as componentContentKo } from '../../../../../lib/generated/component-content.ko';
import { isLocale, type Locale, SUPPORTED_LOCALES } from '../../../../../lib/i18n';
import { buildAlternates } from '../../../../../lib/seo';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    components.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  return { alternates: buildAlternates(`/components/${slug}`, locale) };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const known = components.find((c) => c.slug === slug);
  const doc = componentDocs[slug] ?? {
    slug,
    name: known?.name ?? slug,
  };

  const primaryMap = locale === 'en' ? componentContentEn : componentContentKo;
  const fallbackMap = componentContentKo;

  const loadPrimary = primaryMap[slug];
  const loadFallback = fallbackMap[slug];

  let missingTranslation = false;
  let MDX: React.ComponentType<any> | null = null;

  if (loadPrimary) {
    MDX = (await loadPrimary()).default;
  } else if (locale !== 'ko' && loadFallback) {
    missingTranslation = true;
    MDX = (await loadFallback()).default;
  }

  return (
    <ComponentDocLayout
      doc={doc}
      content={
        MDX ? (
          <>
            {missingTranslation ? (
              <MissingTranslationBanner requestedLocale={locale} fallbackLocale="ko" />
            ) : null}
            <MDX />
          </>
        ) : undefined
      }
    />
  );
}

