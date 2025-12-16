#!/usr/bin/env node

import { runAdd } from './commands/add';
import { runDoctor } from './commands/doctor';
import { runInit } from './commands/init';

type Parsed = {
	command: string | null;
	args: string[];
	options: Record<string, string | boolean>;
};

function parseArgv(argv: string[]): Parsed {
	const [command, ...rest] = argv;
	const options: Record<string, string | boolean> = {};
	const args: string[] = [];

	for (let i = 0; i < rest.length; i++) {
		const token = rest[i] ?? '';
		if (token.startsWith('--')) {
			const key = token.slice(2);
			const next = rest[i + 1];
			if (!next || next.startsWith('--')) {
				options[key] = true;
			} else {
				options[key] = next;
				i++;
			}
		} else {
			args.push(token);
		}
	}

	return { command: command ?? null, args, options };
}

function help() {
	console.log(`fleet-ui (local install track)

Usage:
  fleet-ui init [--cwd <path>] [--core-dir <path>] [--components-dir <path>] [--alias <prefix>]
  fleet-ui add <names...> [--cwd <path>] [--components-dir <path>] [--alias <prefix>]
  fleet-ui doctor [--cwd <path>] [--alias <prefix>]
`);
}

async function main() {
	const parsed = parseArgv(process.argv.slice(2));
	const cmd = parsed.command;
	if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
		help();
		return;
	}

	const opts = parsed.options;
	const common = {
		cwd: typeof opts.cwd === 'string' ? opts.cwd : undefined,
	};

	if (cmd === 'init') {
		await runInit({
			...common,
			coreDir: typeof opts['core-dir'] === 'string' ? (opts['core-dir'] as string) : undefined,
			componentsDir: typeof opts['components-dir'] === 'string' ? (opts['components-dir'] as string) : undefined,
			alias: typeof opts.alias === 'string' ? (opts.alias as string) : undefined,
		});
		return;
	}

	if (cmd === 'add') {
		if (!parsed.args.length) {
			console.error('[fleet-ui] add requires component names');
			process.exitCode = 1;
			return;
		}
		await runAdd(parsed.args, {
			...common,
			componentsDir: typeof opts['components-dir'] === 'string' ? (opts['components-dir'] as string) : undefined,
			alias: typeof opts.alias === 'string' ? (opts.alias as string) : undefined,
		});
		return;
	}

	if (cmd === 'doctor') {
		await runDoctor({
			...common,
			alias: typeof opts.alias === 'string' ? (opts.alias as string) : undefined,
		});
		return;
	}

	console.error(`[fleet-ui] unknown command: ${cmd}`);
	help();
	process.exitCode = 1;
}

main().catch((err) => {
	console.error(err instanceof Error ? err.message : err);
	process.exitCode = 1;
});

