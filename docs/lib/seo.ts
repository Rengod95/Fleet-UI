import type { Metadata } from 'next';

import type { Locale } from './i18n';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, withLocale } from './i18n';

type Alternates = NonNullable<Metadata['alternates']>;

/**
 * canonical(로케일 없는) path를 받아서
 * - canonical: 현재 로케일 URL (self-canonical)
 * - alternates.languages: en/ko URL
 */
export function buildAlternates(canonicalPath: string, locale: Locale): Alternates {
  const canonical = withLocale(canonicalPath, locale);

  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [l, withLocale(canonicalPath, l)]),
  ) as Record<Locale, string>;

  return {
    canonical,
    languages,
  };
}

