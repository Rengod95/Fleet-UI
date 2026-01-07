import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SUPPORTED_LOCALES = ['en', 'ko'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isLocale(v: string): v is Locale {
  return v === 'en' || v === 'ko';
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'en';
  const title = locale === 'ko' ? 'Fleet UI 문서' : 'Fleet UI Docs';
  const description = locale === 'ko' ? 'Fleet UI 문서' : 'Fleet UI documentation';

  return {
    title,
    description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <>{children}</>;
}

