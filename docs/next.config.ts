import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
	extension: /\.mdx?$/,
	// NOTE: Next(Turbopack) requires MDX loader options to be serializable.
	// Keep this config minimal; we can re-add remark/rehype in a later iteration
	// using supported patterns.
});

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
