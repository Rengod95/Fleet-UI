import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap',
					properties: {
						className: ['docs-heading-anchor'],
					},
				},
			],
			[
				rehypePrettyCode,
				{
					keepBackground: false,
					theme: {
						light: 'github-light',
						dark: 'github-dark',
					},
					transformers: [
						transformerCopyButton({
							visibility: 'hover',
							feedbackDuration: 1200,
						}),
					],
				},
			],
		],
	},
});

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
