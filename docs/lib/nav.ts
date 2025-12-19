export type NavItem = {
  title: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const nav: NavSection[] = [
  {
    title: 'Introduce',
    items: [{ title: 'Overview', href: '/introduce' }],
  },
  {
    title: 'Fundamental',
    items: [{ title: 'Design System', href: '/fundamental' }],
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start', href: '/getting-started/quick-start' },
      { title: 'Install', href: '/getting-started/install' },
      { title: 'Theming System', href: '/getting-started/theming' },
      { title: 'Token Architecture', href: '/getting-started/token-architecture' },
    ],
  },
  {
    title: 'Components',
    items: [{ title: 'Components Index', href: '/components' }],
  },
  {
    title: 'Others',
    items: [{ title: 'FAQ', href: '/others/faq' }],
  },
];

