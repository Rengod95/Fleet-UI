import { DemoFrame } from '../../../../components/DemoFrame';

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <h1 className="mb-2 capitalize">{slug}</h1>
      <p className="mb-6 text-muted-foreground">
        데모는 Playground(Expo Web)를 iframe으로 임베드합니다.
      </p>

      <div className="not-prose">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="text-sm font-medium">Usage</div>
            <div className="mt-2 text-sm text-muted-foreground">
              props 표/MDX 가이드라인은 다음 세션에서 확정합니다.
            </div>
          </div>
          <DemoFrame slug={slug} />
        </div>
      </div>
    </>
  );
}

