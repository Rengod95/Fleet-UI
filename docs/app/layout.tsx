import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

function getSiteUrl() {
	return (
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.SITE_URL ||
		// fallback for local dev
		'http://localhost:3000'
	).replace(/\/$/, '');
}

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: 'Fleet UI Docs',
	description: 'Fleet UI documentation',
};

const manrope = Manrope({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-manrope',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headerStore = await headers();
	const cookieStore = await cookies();
	const headerLocale = headerStore.get('x-docs-locale');
	const cookieLocale = cookieStore.get('docs-lang')?.value;
	const lang = headerLocale === 'ko' || cookieLocale === 'ko' ? 'ko' : 'en';
	return (
		<html lang={lang} suppressHydrationWarning className={manrope.variable}>
			<body className={`min-h-dvh bg-background text-foreground antialiased ${manrope.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
