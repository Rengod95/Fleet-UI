import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const llmsPath = path.join(process.cwd(), 'public/llms.txt');

  // Check if static file exists
  if (fs.existsSync(llmsPath)) {
    const content = fs.readFileSync(llmsPath, 'utf8');
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  }

  // Fallback if file doesn't exist
  const fallback = [
    '# Fleet UI',
    '',
    '> React Native UI SDK with theming + animation + components',
    '',
    'llms.txt is being generated. Please run `pnpm gen:llms` or `pnpm build`.',
    '',
  ].join('\n');

  return new Response(fallback, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
