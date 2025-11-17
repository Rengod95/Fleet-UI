export const primitiveAnimation = {
	duration: {
		fastest: 100,
		fast: 150,
		normal: 200,
		slow: 300,
		slowest: 500,
	},
	easing: {
		linear: 'linear',
		easeIn: 'ease-in',
		easeOut: 'ease-out',
		easeInOut: 'ease-in-out',
	},
	timing: {
		fast: { duration: 150 },
		normal: { duration: 200 },
		slow: { duration: 300 },
	},
	spring: {
		gentle: { damping: 15, stiffness: 150 },
		bouncy: { damping: 10, stiffness: 100 },
		stiff: { damping: 20, stiffness: 300 },
	},
} as const;

export type PrimitiveAnimation = typeof primitiveAnimation;
