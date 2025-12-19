import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Fleet UI Docs',
	description: 'Fleet UI documentation',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className="min-h-dvh bg-background text-foreground antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
