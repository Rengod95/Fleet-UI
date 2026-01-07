export const SUPPORTED_LOCALES = ['en', 'ko'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(v: string | null | undefined): v is Locale {
  return v === 'en' || v === 'ko';
}

export function detectLocaleFromPath(pathname: string): Locale | null {
  const seg = pathname.split('/')[1] ?? '';
  return isLocale(seg) ? seg : null;
}

export function stripLocale(pathname: string): string {
  const locale = detectLocaleFromPath(pathname);
  if (!locale) return pathname;
  const rest = pathname.replace(`/${locale}`, '');
  return rest === '' ? '/' : rest;
}

export function withLocale(path: string, locale: Locale): string {
  if (!path.startsWith('/')) return path;

  // Keep special Next/asset routes intact.
  if (
    path.startsWith('/_next') ||
    path.startsWith('/assets') ||
    path.startsWith('/favicon') ||
    path.startsWith('/robots.txt') ||
    path.startsWith('/llms.txt') ||
    path.startsWith('/sitemap')
  ) {
    return path;
  }

  const seg = path.split('/')[1] ?? '';
  if (isLocale(seg)) return path; // already prefixed
  return `/${locale}${path === '/' ? '' : path}`;
}

export function swapLocale(pathname: string, nextLocale: Locale): string {
  if (!pathname.startsWith('/')) return pathname;
  const base = stripLocale(pathname);
  return withLocale(base, nextLocale);
}

