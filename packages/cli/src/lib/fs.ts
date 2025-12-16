import fs from 'node:fs';
import path from 'node:path';

export function exists(p: string) {
	try {
		fs.accessSync(p);
		return true;
	} catch {
		return false;
	}
}

export function ensureDir(dir: string) {
	fs.mkdirSync(dir, { recursive: true });
}

export function readText(p: string) {
	return fs.readFileSync(p, 'utf8');
}

export function writeText(p: string, contents: string) {
	ensureDir(path.dirname(p));
	fs.writeFileSync(p, contents, 'utf8');
}

export function readJson<T>(p: string): T {
	return JSON.parse(readText(p)) as T;
}

export function writeJson(p: string, data: unknown) {
	writeText(p, `${JSON.stringify(data, null, 2)}\n`);
}

export function copyDir(src: string, dst: string) {
	ensureDir(dst);
	fs.cpSync(src, dst, { recursive: true });
}

