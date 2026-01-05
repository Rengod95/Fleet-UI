type MDXComponents = Record<string, unknown>;

import { MdxLink } from '@/components/MdxLink';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		a: MdxLink,
		...components,
	};
}

