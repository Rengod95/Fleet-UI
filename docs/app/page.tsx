import { redirect } from 'next/navigation';

export default function Home() {
	// Locale prefix(`/en/*`, `/ko/*`)를 표준 URL로 사용합니다.
	// middleware가 처리하지만, server component에서도 방어적으로 redirect 합니다.
	redirect('/en/introduce');
}
