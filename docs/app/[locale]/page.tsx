import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { buildAlternates } from '@/lib/seo';
import { isLocale, type Locale } from '@/lib/i18n';
import { LandingPage } from '@/components/landing';
import { Header } from '@/components/Header';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';

  const title = locale === 'ko' ? 'Fleet UI' : 'Fleet UI';
  const description =
    locale === 'ko'
      ? 'Fleet UI 디자인 시스템 문서와 컴포넌트를 빠르게 시작해요.'
      : 'Start with Fleet UI docs and components.';

  return {
    title,
    description,
    alternates: buildAlternates('/', locale),
  };
}

export default async function LocaleIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) redirect('/en');

  return (
    <main>
      <Header />
      <LandingPage />
    </main>
  );
}

