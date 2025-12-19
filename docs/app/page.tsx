export default function Home() {
	return (
		<div className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-6 py-16">
			<div className="mb-6 inline-flex h-8 w-56 rounded-full bg-(--fleet-gradient-primary) opacity-90" />
			<h1 className="text-4xl font-semibold tracking-tight">Fleet UI Docs</h1>
			<p className="mt-3 text-lg text-muted-foreground">
				Next.js + MDX 기반 문서 사이트. 컴포넌트 데모는 Playground(Expo Web)를 iframe으로 임베드합니다.
			</p>
			<div className="mt-8 flex gap-3">
				<a
					className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-(--primary-foreground)"
					href="/introduce"
				>
					Start
				</a>
				<a className="rounded-md border border-border px-4 py-2 text-sm" href="/components">
					Components
				</a>
			</div>
		</div>
	);
}
