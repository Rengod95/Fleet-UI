import { permanentRedirect } from 'next/navigation';

import { isLocale, withLocale } from '@/lib/i18n';

export default async function TokenArchitecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'en';
  permanentRedirect(withLocale('/fundamental/token-architecture', locale));
}

