export function replaceCoreImports(opts: {
	contents: string;
	fromPrefix: string; // "@fleet-ui/core"
	toPrefix: string; // "@fleet-ui/local/core"
}) {
	let out = opts.contents;
	// Replace both single and double quoted imports.
	out = out.replaceAll(`'${opts.fromPrefix}`, `'${opts.toPrefix}`);
	out = out.replaceAll(`\"${opts.fromPrefix}`, `\"${opts.toPrefix}`);
	return out;
}

