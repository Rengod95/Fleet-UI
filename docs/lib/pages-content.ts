import type { Locale } from './i18n';

export type DocsPageHref =
  | '/introduce'
  | '/fundamental'
  | '/fundamental/theming'
  | '/fundamental/token-architecture'
  | '/getting-started/quick-start'
  | '/getting-started/install'
  | '/others/faq';

export type LoadMdx = () => Promise<{ default: React.ComponentType<any> }>;

export const pageContentKo: Record<DocsPageHref, LoadMdx> = {
  '/introduce': () => import('../content/ko/pages/introduce.mdx'),
  '/fundamental': () => import('../content/ko/pages/fundamental.mdx'),
  '/fundamental/theming': () => import('../content/ko/pages/fundamental/theming.mdx'),
  '/fundamental/token-architecture': () =>
    import('../content/ko/pages/fundamental/token-architecture.mdx'),
  '/getting-started/quick-start': () =>
    import('../content/ko/pages/getting-started/quick-start.mdx'),
  '/getting-started/install': () => import('../content/ko/pages/getting-started/install.mdx'),
  '/others/faq': () => import('../content/ko/pages/others/faq.mdx'),
} as const;

// en 콘텐츠는 존재하는 페이지만 로드하고, 나머지는 fallback(ko)로 처리한다.
export const pageContentEn: Partial<Record<DocsPageHref, LoadMdx>> = {
  '/introduce': () => import('../content/en/pages/introduce.mdx'),
  '/fundamental': () => import('../content/en/pages/fundamental.mdx'),
  '/fundamental/theming': () => import('../content/en/pages/fundamental/theming.mdx'),
  '/fundamental/token-architecture': () =>
    import('../content/en/pages/fundamental/token-architecture.mdx'),
  '/getting-started/quick-start': () =>
    import('../content/en/pages/getting-started/quick-start.mdx'),
  '/getting-started/install': () => import('../content/en/pages/getting-started/install.mdx'),
  '/others/faq': () => import('../content/en/pages/others/faq.mdx'),
} as const;

export function getPageLoader(locale: Locale, href: DocsPageHref): LoadMdx | null {
  if (locale === 'en') return pageContentEn[href] ?? null;
  return pageContentKo[href] ?? null;
}

