import { redirect } from 'next/navigation';

import { isLocale } from '@/lib/i18n';

export default async function LocaleIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isLocale(locale)) {
    redirect(`/${locale}/introduce`);
  }
  redirect('/en/introduce');
}

