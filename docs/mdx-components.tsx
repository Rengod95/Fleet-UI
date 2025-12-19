type MDXComponents = Record<string, unknown>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
	};
}

