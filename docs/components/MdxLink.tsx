import Link from 'next/link';
import { cookies } from 'next/headers';

import { withLocale } from '@/lib/i18n';

import type { AnchorHTMLAttributes } from 'react';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
}

export async function MdxLink({ href, children, ...rest }: AnchorProps) {
  const raw = href?.toString() ?? '';
  if (!raw) return <a {...rest}>{children}</a>;

  if (!raw.startsWith('/') || isExternalHref(raw) || raw.startsWith('#')) {
    return (
      <a href={raw} {...rest}>
        {children}
      </a>
    );
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get('docs-lang')?.value === 'ko' ? 'ko' : 'en';
  const nextHref = withLocale(raw, locale);

  return (
    <Link href={nextHref} {...rest}>
      {children}
    </Link>
  );
}

