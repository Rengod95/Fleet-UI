/**
 * Unified logger for Fleet UI CLI.
 * Provides consistent, visually clear output across all commands.
 */

const COLORS = {
	reset: '\x1b[0m',
	bold: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	gray: '\x1b[90m',
} as const;

const ICONS = {
	success: '✓',
	error: '✗',
	warning: '⚠',
	info: '→',
	skip: '○',
	pending: '◌',
	check: '●',
	arrow: '›',
	box: '□',
	boxChecked: '■',
} as const;

function colorize(text: string, color: keyof typeof COLORS): string {
	// Check if colors are supported (NO_COLOR env, CI, etc.)
	if (process.env.NO_COLOR || !process.stdout.isTTY) {
		return text;
	}
	return `${COLORS[color]}${text}${COLORS.reset}`;
}

function formatPrefix(): string {
	return colorize('fleet-ui', 'cyan');
}

export const logger = {
	/**
	 * Standard info message
	 */
	info(message: string): void {
		console.log(`${formatPrefix()} ${colorize(ICONS.info, 'blue')} ${message}`);
	},

	/**
	 * Success message
	 */
	success(message: string): void {
		console.log(`${formatPrefix()} ${colorize(ICONS.success, 'green')} ${message}`);
	},

	/**
	 * Warning message
	 */
	warn(message: string): void {
		console.warn(`${formatPrefix()} ${colorize(ICONS.warning, 'yellow')} ${message}`);
	},

	/**
	 * Error message
	 */
	error(message: string): void {
		console.error(`${formatPrefix()} ${colorize(ICONS.error, 'red')} ${message}`);
	},

	/**
	 * Skipped action message
	 */
	skip(message: string): void {
		console.log(`${formatPrefix()} ${colorize(ICONS.skip, 'gray')} ${colorize(message, 'dim')}`);
	},

	/**
	 * Step header (for multi-step operations)
	 */
	step(stepNum: number, total: number, message: string): void {
		const counter = colorize(`[${stepNum}/${total}]`, 'dim');
		console.log(`${formatPrefix()} ${counter} ${message}`);
	},

	/**
	 * Sub-step detail (indented)
	 */
	detail(message: string): void {
		console.log(`         ${colorize(ICONS.arrow, 'gray')} ${message}`);
	},

	/**
	 * Section header with visual separator
	 */
	section(title: string): void {
		console.log('');
		console.log(`${formatPrefix()} ${colorize('━━━', 'dim')} ${colorize(title, 'bold')} ${colorize('━━━', 'dim')}`);
	},

	/**
	 * Summary block for operation results
	 */
	summary(results: Array<{ label: string; status: 'success' | 'failed' | 'skipped'; detail?: string }>): void {
		console.log('');
		console.log(`${formatPrefix()} ${colorize('Summary', 'bold')}`);
		for (const r of results) {
			const icon =
				r.status === 'success'
					? colorize(ICONS.success, 'green')
					: r.status === 'failed'
						? colorize(ICONS.error, 'red')
						: colorize(ICONS.skip, 'gray');
			const statusText =
				r.status === 'success'
					? colorize('done', 'green')
					: r.status === 'failed'
						? colorize('failed', 'red')
						: colorize('skipped', 'gray');
			const detail = r.detail ? ` ${colorize(`(${r.detail})`, 'dim')}` : '';
			console.log(`         ${icon} ${r.label} ${statusText}${detail}`);
		}
	},

	/**
	 * List of items (for doctor issues, missing deps, etc.)
	 */
	list(items: string[], indent = 9): void {
		const pad = ' '.repeat(indent);
		for (const item of items) {
			console.log(`${pad}${colorize('•', 'dim')} ${item}`);
		}
	},

	/**
	 * Code block or command suggestion
	 */
	command(cmd: string): void {
		console.log(`         ${colorize(cmd, 'cyan')}`);
	},

	/**
	 * Blank line
	 */
	newline(): void {
		console.log('');
	},

	/**
	 * Box message for important notices
	 */
	box(title: string, lines: string[]): void {
		const maxLen = Math.max(title.length, ...lines.map((l) => l.length));
		const border = '─'.repeat(maxLen + 2);
		console.log('');
		console.log(`         ${colorize(`┌${border}┐`, 'dim')}`);
		console.log(`         ${colorize('│', 'dim')} ${colorize(title.padEnd(maxLen), 'bold')} ${colorize('│', 'dim')}`);
		console.log(`         ${colorize(`├${border}┤`, 'dim')}`);
		for (const line of lines) {
			console.log(`         ${colorize('│', 'dim')} ${line.padEnd(maxLen)} ${colorize('│', 'dim')}`);
		}
		console.log(`         ${colorize(`└${border}┘`, 'dim')}`);
	},
};

export { ICONS, COLORS };
