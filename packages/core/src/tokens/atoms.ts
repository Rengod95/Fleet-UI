import { Platform, StyleSheet } from 'react-native';
import { primitiveBorderRadius } from './primitive/borderRadius';
import { primitiveSpacing } from './primitive/spacing';
import {
	primitiveFontSize,
	primitiveFontWeight,
	primitiveLetterSpacing,
} from './primitive/typography';

const borderRadius = primitiveBorderRadius;

const space = {
	_3xs: primitiveSpacing[1],
	_2xs: primitiveSpacing[2],
	xs: primitiveSpacing[3],
	sm: primitiveSpacing[4],
	md: primitiveSpacing[5],
	lg: primitiveSpacing[6],
	xl: primitiveSpacing[7],
	_2xl: primitiveSpacing[8],
	_3xl: primitiveSpacing[9],
	_4xl: primitiveSpacing[10],
	_5xl: primitiveSpacing[11],
} as const;

const fontSize = primitiveFontSize;
const fontWeight = primitiveFontWeight;
const letterSpacing = primitiveLetterSpacing;

export const atoms = {
	debug: {
		borderColor: 'red',
		borderWidth: 1,
	},

	/*
	 * Positioning
	 */
	fixed: {
		position: Platform.select({
			web: 'fixed',
			native: 'absolute',
		}) as 'absolute',
	},
	absolute: {
		position: 'absolute',
	},
	relative: {
		position: 'relative',
	},
	static: {
		position: 'static',
	},

	inset_0: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	top_0: {
		top: 0,
	},
	right_0: {
		right: 0,
	},
	bottom_0: {
		bottom: 0,
	},
	left_0: {
		left: 0,
	},
	z_10: {
		zIndex: 10,
	},
	z_20: {
		zIndex: 20,
	},
	z_30: {
		zIndex: 30,
	},
	z_40: {
		zIndex: 40,
	},
	z_50: {
		zIndex: 50,
	},

	overflow_visible: {
		overflow: 'visible',
	},
	overflow_x_visible: {
		overflowX: 'visible',
	},
	overflow_y_visible: {
		overflowY: 'visible',
	},
	overflow_hidden: {
		overflow: 'hidden',
	},
	overflow_x_hidden: {
		overflowX: 'hidden',
	},
	overflow_y_hidden: {
		overflowY: 'hidden',
	},

	/*
	 * Width & Height
	 */
	w_full: {
		width: '100%',
	},
	h_full: {
		height: '100%',
	},
	max_w_full: {
		maxWidth: '100%',
	},
	max_h_full: {
		maxHeight: '100%',
	},

	/*
	 * Theme-independent bg colors
	 */
	bg_transparent: {
		backgroundColor: 'transparent',
	},

	/*
	 * Border radius
	 */
	rounded_0: {
		borderRadius: 0,
	},
	rounded_2xs: {
		borderRadius: borderRadius._2xs,
	},
	rounded_xs: {
		borderRadius: borderRadius.xs,
	},
	rounded_sm: {
		borderRadius: borderRadius.sm,
	},
	rounded_md: {
		borderRadius: borderRadius.md,
	},
	rounded_lg: {
		borderRadius: borderRadius.lg,
	},
	rounded_full: {
		borderRadius: borderRadius.full,
	},

	/*
	 * Flex
	 */
	gap_0: {
		gap: 0,
	},
	gap_2xs: {
		gap: space._2xs,
	},
	gap_xs: {
		gap: space.xs,
	},
	gap_sm: {
		gap: space.sm,
	},
	gap_md: {
		gap: space.md,
	},
	gap_lg: {
		gap: space.lg,
	},
	gap_xl: {
		gap: space.xl,
	},
	gap_2xl: {
		gap: space._2xl,
	},
	gap_3xl: {
		gap: space._3xl,
	},
	gap_4xl: {
		gap: space._4xl,
	},
	gap_5xl: {
		gap: space._5xl,
	},
	flex: {
		display: 'flex',
	},
	flex_col: {
		flexDirection: 'column',
	},
	flex_row: {
		flexDirection: 'row',
	},
	flex_col_reverse: {
		flexDirection: 'column-reverse',
	},
	flex_row_reverse: {
		flexDirection: 'row-reverse',
	},
	flex_wrap: {
		flexWrap: 'wrap',
	},
	flex_nowrap: {
		flexWrap: 'nowrap',
	},
	flex_0: {
		flex: 0,
	},
	flex_1: {
		flex: 1,
	},
	flex_grow: {
		flexGrow: 1,
	},
	flex_grow_0: {
		flexGrow: 0,
	},
	flex_shrink: {
		flexShrink: 1,
	},
	flex_shrink_0: {
		flexShrink: 0,
	},
	justify_start: {
		justifyContent: 'flex-start',
	},
	justify_center: {
		justifyContent: 'center',
	},
	justify_between: {
		justifyContent: 'space-between',
	},
	justify_end: {
		justifyContent: 'flex-end',
	},
	align_center: {
		alignItems: 'center',
	},
	align_start: {
		alignItems: 'flex-start',
	},
	align_end: {
		alignItems: 'flex-end',
	},
	align_baseline: {
		alignItems: 'baseline',
	},
	align_stretch: {
		alignItems: 'stretch',
	},
	self_auto: {
		alignSelf: 'auto',
	},
	self_start: {
		alignSelf: 'flex-start',
	},
	self_end: {
		alignSelf: 'flex-end',
	},
	self_center: {
		alignSelf: 'center',
	},
	self_stretch: {
		alignSelf: 'stretch',
	},
	self_baseline: {
		alignSelf: 'baseline',
	},

	/*
	 * Text
	 */
	text_left: {
		textAlign: 'left',
	},
	text_center: {
		textAlign: 'center',
	},
	text_right: {
		textAlign: 'right',
	},
	text_2xs: {
		fontSize: fontSize._2xs,
		letterSpacing: letterSpacing.normal,
	},
	text_xs: {
		fontSize: fontSize.xs,
		letterSpacing: letterSpacing.normal,
	},
	text_sm: {
		fontSize: fontSize.sm,
		letterSpacing: letterSpacing.normal,
	},
	text_md: {
		fontSize: fontSize.md,
		letterSpacing: letterSpacing.normal,
	},
	text_lg: {
		fontSize: fontSize.lg,
		letterSpacing: letterSpacing.normal,
	},
	text_xl: {
		fontSize: fontSize.xl,
		letterSpacing: letterSpacing.normal,
	},
	text_2xl: {
		fontSize: fontSize._2xl,
		letterSpacing: letterSpacing.normal,
	},
	text_3xl: {
		fontSize: fontSize._3xl,
		letterSpacing: letterSpacing.normal,
	},
	text_4xl: {
		fontSize: fontSize._4xl,
		letterSpacing: letterSpacing.normal,
	},
	text_5xl: {
		fontSize: fontSize._5xl,
		letterSpacing: letterSpacing.normal,
	},
	leading_tight: {
		lineHeight: 1.15,
	},
	leading_snug: {
		lineHeight: 1.3,
	},
	leading_normal: {
		lineHeight: 1.5,
	},
	tracking_normal: {
		letterSpacing: letterSpacing.normal,
	},
	tracking_wide: {
		letterSpacing: letterSpacing.wide,
	},
	tracking_wider: {
		letterSpacing: letterSpacing.wider,
	},
	tracking_tighter: {
		letterSpacing: letterSpacing.tighter,
	},
	tracking_tight: {
		letterSpacing: letterSpacing.tight,
	},

	font_lighter: {
		fontWeight: fontWeight.lighter,
	},
	font_light: {
		fontWeight: fontWeight.light,
	},
	font_normal: {
		fontWeight: fontWeight.regular,
	},
	font_medium: {
		fontWeight: fontWeight.medium,
	},
	font_semibold: {
		fontWeight: fontWeight.semibold,
	},
	font_bold: {
		fontWeight: fontWeight.bold,
	},
	font_extrabold: {
		fontWeight: fontWeight.extrabold,
	},

	italic: {
		fontStyle: 'italic',
	},

	/*
	 * Border
	 */
	border_0: {
		borderWidth: 0,
	},
	border_t_0: {
		borderTopWidth: 0,
	},
	border_b_0: {
		borderBottomWidth: 0,
	},
	border_l_0: {
		borderLeftWidth: 0,
	},
	border_r_0: {
		borderRightWidth: 0,
	},
	border_x_0: {
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	border_y_0: {
		borderTopWidth: 0,
		borderBottomWidth: 0,
	},
	border: {
		borderWidth: StyleSheet.hairlineWidth,
	},
	border_t: {
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	border_b: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	border_l: {
		borderLeftWidth: StyleSheet.hairlineWidth,
	},
	border_r: {
		borderRightWidth: StyleSheet.hairlineWidth,
	},
	border_x: {
		borderLeftWidth: StyleSheet.hairlineWidth,
		borderRightWidth: StyleSheet.hairlineWidth,
	},
	border_y: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	border_transparent: {
		borderColor: 'transparent',
	},
	curve_circular: {
		borderCurve: 'circular',
	},
	curve_continuous: {
		borderCurve: 'continuous',
	},

	/*
	 * Shadow
	 */
	shadow_xs: {
		boxShadow: '0px 1px 10px 0px rgba(0,0,0,0.08)',
	},
	shadow_sm: {
		boxShadow:
			'-2px -2px 4px 0px rgba(0,0,0,0.06), 2px 2px 2px 0px rgba(0,0,0,0.06)',
	},
	shadow_md: {
		boxShadow:
			'-2px -2px 8px 0px rgba(0,0,0,0.08), 2px 2px 4px 0px rgba(0,0,0,0.08)',
	},
	shadow_lg: {
		boxShadow:
			'-2px -2px 16px 0px rgba(0,0,0,0.10), 2px 2px 8px 0px rgba(0,0,0,0.10)',
	},
	shadow_xl: {
		boxShadow:
			'-2px -2px 24px 0px rgba(0,0,0,0.12), 2px 2px 12px 0px rgba(0,0,0,0.12)',
	},
	shadow_floating: {
		boxShadow:
			'6px -6px 24px 0px rgba(0,0,0,0.08), -6px 6px 24px 0px rgba(0,0,0,0.08)',
	},

	/*
	 * Padding
	 */
	p_0: {
		padding: 0,
	},
	p_2xs: {
		padding: space._2xs,
	},
	p_xs: {
		padding: space.xs,
	},
	p_sm: {
		padding: space.sm,
	},
	p_md: {
		padding: space.md,
	},
	p_lg: {
		padding: space.lg,
	},
	p_xl: {
		padding: space.xl,
	},
	p_2xl: {
		padding: space._2xl,
	},
	p_3xl: {
		padding: space._3xl,
	},
	p_4xl: {
		padding: space._4xl,
	},
	p_5xl: {
		padding: space._5xl,
	},
	px_0: {
		paddingLeft: 0,
		paddingRight: 0,
	},
	px_2xs: {
		paddingLeft: space._2xs,
		paddingRight: space._2xs,
	},
	px_xs: {
		paddingLeft: space.xs,
		paddingRight: space.xs,
	},
	px_sm: {
		paddingLeft: space.sm,
		paddingRight: space.sm,
	},
	px_md: {
		paddingLeft: space.md,
		paddingRight: space.md,
	},
	px_lg: {
		paddingLeft: space.lg,
		paddingRight: space.lg,
	},
	px_xl: {
		paddingLeft: space.xl,
		paddingRight: space.xl,
	},
	px_2xl: {
		paddingLeft: space._2xl,
		paddingRight: space._2xl,
	},
	px_3xl: {
		paddingLeft: space._3xl,
		paddingRight: space._3xl,
	},
	px_4xl: {
		paddingLeft: space._4xl,
		paddingRight: space._4xl,
	},
	px_5xl: {
		paddingLeft: space._5xl,
		paddingRight: space._5xl,
	},
	py_0: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	py_2xs: {
		paddingTop: space._2xs,
		paddingBottom: space._2xs,
	},
	py_xs: {
		paddingTop: space.xs,
		paddingBottom: space.xs,
	},
	py_sm: {
		paddingTop: space.sm,
		paddingBottom: space.sm,
	},
	py_md: {
		paddingTop: space.md,
		paddingBottom: space.md,
	},
	py_lg: {
		paddingTop: space.lg,
		paddingBottom: space.lg,
	},
	py_xl: {
		paddingTop: space.xl,
		paddingBottom: space.xl,
	},
	py_2xl: {
		paddingTop: space._2xl,
		paddingBottom: space._2xl,
	},
	py_3xl: {
		paddingTop: space._3xl,
		paddingBottom: space._3xl,
	},
	py_4xl: {
		paddingTop: space._4xl,
		paddingBottom: space._4xl,
	},
	py_5xl: {
		paddingTop: space._5xl,
		paddingBottom: space._5xl,
	},
	pt_0: {
		paddingTop: 0,
	},
	pt_2xs: {
		paddingTop: space._2xs,
	},
	pt_xs: {
		paddingTop: space.xs,
	},
	pt_sm: {
		paddingTop: space.sm,
	},
	pt_md: {
		paddingTop: space.md,
	},
	pt_lg: {
		paddingTop: space.lg,
	},
	pt_xl: {
		paddingTop: space.xl,
	},
	pt_2xl: {
		paddingTop: space._2xl,
	},
	pt_3xl: {
		paddingTop: space._3xl,
	},
	pt_4xl: {
		paddingTop: space._4xl,
	},
	pt_5xl: {
		paddingTop: space._5xl,
	},
	pb_0: {
		paddingBottom: 0,
	},
	pb_2xs: {
		paddingBottom: space._2xs,
	},
	pb_xs: {
		paddingBottom: space.xs,
	},
	pb_sm: {
		paddingBottom: space.sm,
	},
	pb_md: {
		paddingBottom: space.md,
	},
	pb_lg: {
		paddingBottom: space.lg,
	},
	pb_xl: {
		paddingBottom: space.xl,
	},
	pb_2xl: {
		paddingBottom: space._2xl,
	},
	pb_3xl: {
		paddingBottom: space._3xl,
	},
	pb_4xl: {
		paddingBottom: space._4xl,
	},
	pb_5xl: {
		paddingBottom: space._5xl,
	},
	pl_0: {
		paddingLeft: 0,
	},
	pl_2xs: {
		paddingLeft: space._2xs,
	},
	pl_xs: {
		paddingLeft: space.xs,
	},
	pl_sm: {
		paddingLeft: space.sm,
	},
	pl_md: {
		paddingLeft: space.md,
	},
	pl_lg: {
		paddingLeft: space.lg,
	},
	pl_xl: {
		paddingLeft: space.xl,
	},
	pl_2xl: {
		paddingLeft: space._2xl,
	},
	pl_3xl: {
		paddingLeft: space._3xl,
	},
	pl_4xl: {
		paddingLeft: space._4xl,
	},
	pl_5xl: {
		paddingLeft: space._5xl,
	},
	pr_0: {
		paddingRight: 0,
	},
	pr_2xs: {
		paddingRight: space._2xs,
	},
	pr_xs: {
		paddingRight: space.xs,
	},
	pr_sm: {
		paddingRight: space.sm,
	},
	pr_md: {
		paddingRight: space.md,
	},
	pr_lg: {
		paddingRight: space.lg,
	},
	pr_xl: {
		paddingRight: space.xl,
	},
	pr_2xl: {
		paddingRight: space._2xl,
	},
	pr_3xl: {
		paddingRight: space._3xl,
	},
	pr_4xl: {
		paddingRight: space._4xl,
	},
	pr_5xl: {
		paddingRight: space._5xl,
	},

	/*
	 * Margin
	 */
	m_0: {
		margin: 0,
	},
	m_2xs: {
		margin: space._2xs,
	},
	m_xs: {
		margin: space.xs,
	},
	m_sm: {
		margin: space.sm,
	},
	m_md: {
		margin: space.md,
	},
	m_lg: {
		margin: space.lg,
	},
	m_xl: {
		margin: space.xl,
	},
	m_2xl: {
		margin: space._2xl,
	},
	m_3xl: {
		margin: space._3xl,
	},
	m_4xl: {
		margin: space._4xl,
	},
	m_5xl: {
		margin: space._5xl,
	},
	m_auto: {
		margin: 'auto',
	},
	mx_0: {
		marginLeft: 0,
		marginRight: 0,
	},
	mx_2xs: {
		marginLeft: space._2xs,
		marginRight: space._2xs,
	},
	mx_xs: {
		marginLeft: space.xs,
		marginRight: space.xs,
	},
	mx_sm: {
		marginLeft: space.sm,
		marginRight: space.sm,
	},
	mx_md: {
		marginLeft: space.md,
		marginRight: space.md,
	},
	mx_lg: {
		marginLeft: space.lg,
		marginRight: space.lg,
	},
	mx_xl: {
		marginLeft: space.xl,
		marginRight: space.xl,
	},
	mx_2xl: {
		marginLeft: space._2xl,
		marginRight: space._2xl,
	},
	mx_3xl: {
		marginLeft: space._3xl,
		marginRight: space._3xl,
	},
	mx_4xl: {
		marginLeft: space._4xl,
		marginRight: space._4xl,
	},
	mx_5xl: {
		marginLeft: space._5xl,
		marginRight: space._5xl,
	},
	mx_auto: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	my_0: {
		marginTop: 0,
		marginBottom: 0,
	},
	my_2xs: {
		marginTop: space._2xs,
		marginBottom: space._2xs,
	},
	my_xs: {
		marginTop: space.xs,
		marginBottom: space.xs,
	},
	my_sm: {
		marginTop: space.sm,
		marginBottom: space.sm,
	},
	my_md: {
		marginTop: space.md,
		marginBottom: space.md,
	},
	my_lg: {
		marginTop: space.lg,
		marginBottom: space.lg,
	},
	my_xl: {
		marginTop: space.xl,
		marginBottom: space.xl,
	},
	my_2xl: {
		marginTop: space._2xl,
		marginBottom: space._2xl,
	},
	my_3xl: {
		marginTop: space._3xl,
		marginBottom: space._3xl,
	},
	my_4xl: {
		marginTop: space._4xl,
		marginBottom: space._4xl,
	},
	my_5xl: {
		marginTop: space._5xl,
		marginBottom: space._5xl,
	},
	my_auto: {
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	mt_0: {
		marginTop: 0,
	},
	mt_2xs: {
		marginTop: space._2xs,
	},
	mt_xs: {
		marginTop: space.xs,
	},
	mt_sm: {
		marginTop: space.sm,
	},
	mt_md: {
		marginTop: space.md,
	},
	mt_lg: {
		marginTop: space.lg,
	},
	mt_xl: {
		marginTop: space.xl,
	},
	mt_2xl: {
		marginTop: space._2xl,
	},
	mt_3xl: {
		marginTop: space._3xl,
	},
	mt_4xl: {
		marginTop: space._4xl,
	},
	mt_5xl: {
		marginTop: space._5xl,
	},
	mt_auto: {
		marginTop: 'auto',
	},
	mb_0: {
		marginBottom: 0,
	},
	mb_2xs: {
		marginBottom: space._2xs,
	},
	mb_xs: {
		marginBottom: space.xs,
	},
	mb_sm: {
		marginBottom: space.sm,
	},
	mb_md: {
		marginBottom: space.md,
	},
	mb_lg: {
		marginBottom: space.lg,
	},
	mb_xl: {
		marginBottom: space.xl,
	},
	mb_2xl: {
		marginBottom: space._2xl,
	},
	mb_3xl: {
		marginBottom: space._3xl,
	},
	mb_4xl: {
		marginBottom: space._4xl,
	},
	mb_5xl: {
		marginBottom: space._5xl,
	},
	mb_auto: {
		marginBottom: 'auto',
	},
	ml_0: {
		marginLeft: 0,
	},
	ml_2xs: {
		marginLeft: space._2xs,
	},
	ml_xs: {
		marginLeft: space.xs,
	},
	ml_sm: {
		marginLeft: space.sm,
	},
	ml_md: {
		marginLeft: space.md,
	},
	ml_lg: {
		marginLeft: space.lg,
	},
	ml_xl: {
		marginLeft: space.xl,
	},
	ml_2xl: {
		marginLeft: space._2xl,
	},
	ml_3xl: {
		marginLeft: space._3xl,
	},
	ml_4xl: {
		marginLeft: space._4xl,
	},
	ml_5xl: {
		marginLeft: space._5xl,
	},
	ml_auto: {
		marginLeft: 'auto',
	},
	mr_0: {
		marginRight: 0,
	},
	mr_2xs: {
		marginRight: space._2xs,
	},
	mr_xs: {
		marginRight: space.xs,
	},
	mr_sm: {
		marginRight: space.sm,
	},
	mr_md: {
		marginRight: space.md,
	},
	mr_lg: {
		marginRight: space.lg,
	},
	mr_xl: {
		marginRight: space.xl,
	},
	mr_2xl: {
		marginRight: space._2xl,
	},
	mr_3xl: {
		marginRight: space._3xl,
	},
	mr_4xl: {
		marginRight: space._4xl,
	},
	mr_5xl: {
		marginRight: space._5xl,
	},
	mr_auto: {
		marginRight: 'auto',
	},

	/*
	 * Pointer events & user select
	 */
	pointer_events_none: {
		pointerEvents: 'none',
	},
	pointer_events_auto: {
		pointerEvents: 'auto',
	},
	user_select_none: {
		userSelect: 'none',
	},
	user_select_text: {
		userSelect: 'text',
	},
	user_select_all: {
		userSelect: 'all',
	},
	outline_inset_1: {
		outlineOffset: -1,
	},

	/*
	 * Text decoration
	 */
	underline: {
		textDecorationLine: 'underline',
	},
	strike_through: {
		textDecorationLine: 'line-through',
	},

	/*
	 * Display
	 */
	hidden: {
		display: 'none',
	},
} as const;
