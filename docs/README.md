Fleet UI 문서 사이트(Next.js)입니다.

## 개발 환경(Development)

### 1) 환경변수 파일 준비

보안 정책상 레포에 `.env*` 파일을 커밋하지 않고, `docs/env.*.example`을 템플릿으로 사용해요.

- `docs/env.development.example` → `docs/.env.development.local`로 복사
- 또는 `docs/env.example` → `docs/.env.local`로 복사

필수 변수:
- `NEXT_PUBLIC_SITE_URL`: sitemap/metadata base URL
- `NEXT_PUBLIC_PLAYGROUND_BASE_URL`: Playground embed URL

### 2) 개발 서버 실행

```bash
pnpm -C docs dev
```

기본 접속: `http://localhost:3000`

## 프로덕션(Production)

### 1) 환경변수 설정

호스팅 환경(Vercel 등)에서는 아래 값을 “Environment Variables”에 등록해요.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAYGROUND_BASE_URL`

로컬에서 프로덕션 모드로 확인하려면:

- `docs/env.production.example` → `docs/.env.production.local`로 복사

### 2) 빌드/실행

```bash
pnpm -C docs build
pnpm -C docs start
```

## 스크립트 전용 환경변수

`DOCS_CREATE_EN_PLACEHOLDERS`는 `pnpm gen:component-docs`(tsx 스크립트)에서 읽는 값이라,
Next.js의 `.env` 자동 로딩 대상이 아니에요. 필요하면 아래처럼 실행해 주세요.

```bash
DOCS_CREATE_EN_PLACEHOLDERS=1 pnpm -C docs dev
```

## Crawling/Indexing (robots.txt, sitemap, llms.txt)

- `robots.txt`: `/robots.txt`
- `sitemap`: `/sitemap.xml` (robots에도 연결됨)
- `llms.txt`: `/llms.txt`

NOTE: `middleware.ts` 변경(리다이렉트 예외 등)은 개발 서버 재시작이 필요할 수 있어요.
