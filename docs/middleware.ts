import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Locale = 'en' | 'ko';

const DEFAULT_LOCALE: Locale = 'en';
const LOCALE_COOKIE = 'docs-lang';

function isSupportedLocale(v: string | null | undefined): v is Locale {
  return v === 'en' || v === 'ko';
}

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    ua.includes('bot') ||
    ua.includes('crawler') ||
    ua.includes('spider') ||
    ua.includes('slurp') ||
    ua.includes('bingpreview') ||
    ua.includes('facebookexternalhit')
  );
}

function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  // Very small heuristic:
  // - if ko appears anywhere, prefer ko
  // - otherwise fallback to en
  const lower = header.toLowerCase();
  if (lower.includes('ko')) return 'ko';
  return 'en';
}

function shouldIgnorePath(pathname: string) {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/llms.txt') ||
    pathname.startsWith('/sitemap')
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (shouldIgnorePath(pathname)) return NextResponse.next();

  // Already locale-prefixed?
  const firstSeg = pathname.split('/')[1] ?? '';
  const hasLocalePrefix = isSupportedLocale(firstSeg);

  if (hasLocalePrefix) {
    // Keep cookie in sync with URL locale, and pass locale to server components.
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-docs-locale', firstSeg);

    const res = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    res.cookies.set(LOCALE_COOKIE, firstSeg, { path: '/' });
    return res;
  }

  // Decide locale for redirect.
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale = DEFAULT_LOCALE;
  let usedAcceptLanguage = false;

  if (isSupportedLocale(cookieLocale)) {
    locale = cookieLocale;
  } else if (isBot(req.headers.get('user-agent'))) {
    // For crawlers, keep redirect deterministic to avoid unstable indexing.
    locale = DEFAULT_LOCALE;
  } else {
    locale = detectLocaleFromAcceptLanguage(req.headers.get('accept-language'));
    usedAcceptLanguage = true;
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;

  const res = NextResponse.redirect(url, 308);
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/' });
  if (usedAcceptLanguage) {
    res.headers.set('Vary', 'Accept-Language');
  }
  return res;
}

export const config = {
  matcher: ['/((?!api).*)'],
};

