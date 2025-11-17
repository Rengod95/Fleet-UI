import { rawColors } from '../raw/colors';

export const primitiveColors = {
	neutral: rawColors.neutral,
	warning: rawColors.warning,
	success: rawColors.success,
	info: rawColors.info,
	accent: rawColors.accent,
	error: rawColors.error,
	white: rawColors.white,
	black: rawColors.black,
	transparent: rawColors.transparent,
} as const;

export type PrimitiveColors = typeof primitiveColors;
