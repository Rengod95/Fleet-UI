import type { Locale } from './i18n';

export type NavItem = {
  title: string;
  /**
   * canonical path (locale prefix 없는 경로)
   * e.g. `/introduce`, `/components`
   */
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV_EN: NavSection[] = [
  { title: 'Introduce', items: [{ title: 'Overview', href: '/introduce' }] },
  {
    title: 'Fundamental',
    items: [
      { title: 'Design System', href: '/fundamental' },
      { title: 'Theming System', href: '/fundamental/theming' },
      { title: 'Token Architecture', href: '/fundamental/token-architecture' },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start', href: '/getting-started/quick-start' },
      { title: 'Install', href: '/getting-started/install' },
    ],
  },
  { title: 'Components', items: [{ title: 'Components Index', href: '/components' }] },
  { title: 'Others', items: [{ title: 'FAQ', href: '/others/faq' }] },
] as const;

const NAV_KO: NavSection[] = [
  { title: '소개', items: [{ title: '개요', href: '/introduce' }] },
  {
    title: '기본',
    items: [
      { title: '디자인 시스템', href: '/fundamental' },
      { title: '테마 시스템', href: '/fundamental/theming' },
      { title: '토큰 아키텍처', href: '/fundamental/token-architecture' },
    ],
  },
  {
    title: '시작하기',
    items: [
      { title: '빠른 시작', href: '/getting-started/quick-start' },
      { title: '설치', href: '/getting-started/install' },
    ],
  },
  { title: '컴포넌트', items: [{ title: '컴포넌트 목록', href: '/components' }] },
  { title: '기타', items: [{ title: 'FAQ', href: '/others/faq' }] },
] as const;

export function getNav(locale: Locale): NavSection[] {
  return locale === 'ko' ? NAV_KO : NAV_EN;
}


