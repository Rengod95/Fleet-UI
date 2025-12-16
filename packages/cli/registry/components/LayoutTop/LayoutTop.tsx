import { createContext, useContext, forwardRef } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type {
	LayoutTopProps,
	LayoutTopComponent,
	LayoutTopSize,
	LayoutTopAssetProps,
	LayoutTopTitleTypoProps,
	LayoutTopSubtitleTypoProps,
} from './LayoutTop.types';

// ============================================
// Context
// ============================================

interface LayoutTopContextValue {
	size: LayoutTopSize;
}

const LayoutTopContext = createContext<LayoutTopContextValue | null>(null);

const useLayoutTopContext = () => {
	const context = useContext(LayoutTopContext);
	return context;
};

// ============================================
// Sub Components
// ============================================

/**
 * LayoutTop.Asset - Asset container component
 */
const LayoutTopAsset = ({ children, style }: LayoutTopAssetProps) => {
	return <View style={[styles.assetContainer, style]}>{children}</View>;
};

LayoutTopAsset.displayName = 'LayoutTop.Asset';

/**
 * LayoutTop.TitleTypo - Title Typography component
 * size prop to override the context's size
 */
const LayoutTopTitleTypo = ({
	size: sizeProp,
	children,
	style,
	...restProps
}: LayoutTopTitleTypoProps) => {
	const context = useLayoutTopContext();
	const size = sizeProp ?? context?.size ?? 'md';

	titleStyles.useVariants({ size });

	return (
		<Text style={[titleStyles.text, style]} {...restProps}>
			{children}
		</Text>
	);
};

LayoutTopTitleTypo.displayName = 'LayoutTop.TitleTypo';

/**
 * LayoutTop.SubtitleTypo - Subtitle Typography component
 * size prop to override the context's size
 */
const LayoutTopSubtitleTypo = ({
	size: sizeProp,
	children,
	style,
	...restProps
}: LayoutTopSubtitleTypoProps) => {
	const context = useLayoutTopContext();
	const size = sizeProp ?? context?.size ?? 'md';

	subtitleStyles.useVariants({ size });

	return (
		<Text style={[subtitleStyles.text, style]} {...restProps}>
			{children}
		</Text>
	);
};

LayoutTopSubtitleTypo.displayName = 'LayoutTop.SubtitleTypo';

// ============================================
// Main Component
// ============================================

const LayoutTopBase = forwardRef<View, LayoutTopProps>((props, ref) => {
	const {
		asset,
		subtitleTop,
		title,
		subtitleBottom,
		right,
		rightAlignment = 'center',
		paddingTop = 'none',
		paddingBottom = 'md',
		size = 'md',
		style,
		...restProps
	} = props;

	styles.useVariants({
		paddingTop: typeof paddingTop === 'number' ? 'custom' : paddingTop,
		paddingBottom: typeof paddingBottom === 'number' ? 'custom' : paddingBottom,
		rightAlignment,
	});

	const customPaddingTopValue =
		typeof paddingTop === 'number' ? paddingTop : undefined;
	const customPaddingBottomValue =
		typeof paddingBottom === 'number' ? paddingBottom : undefined;

	const hasTextContent = subtitleTop || title || subtitleBottom;
	const hasRight = !!right;

	return (
		<LayoutTopContext.Provider value={{ size }}>
			<View
				ref={ref}
				style={[
					styles.container,
					customPaddingTopValue !== undefined && {
						paddingTop: customPaddingTopValue,
					},
					customPaddingBottomValue !== undefined && {
						paddingBottom: customPaddingBottomValue,
					},
					style,
				]}
				{...restProps}
			>
				{/* Asset Row */}
				{asset && <View style={styles.assetRow}>{asset}</View>}

				{/* Content Row */}
				{(hasTextContent || hasRight) && (
					<View style={styles.contentRow}>
						{/* Text Column */}
						{hasTextContent && (
							<View style={styles.textColumn}>
								{subtitleTop}
								{title}
								{subtitleBottom}
							</View>
						)}

						{/* Right Column */}
						{hasRight && <View style={styles.rightColumn}>{right}</View>}
					</View>
				)}
			</View>
		</LayoutTopContext.Provider>
	);
});

LayoutTopBase.displayName = 'LayoutTop';

// ============================================
// Compound Component Assembly
// ============================================

export const LayoutTop: LayoutTopComponent = Object.assign(LayoutTopBase, {
	Asset: LayoutTopAsset,
	TitleTypo: LayoutTopTitleTypo,
	SubtitleTypo: LayoutTopSubtitleTypo	,
});

// ============================================
// Styles - Container
// ============================================

const styles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: 'column',
		gap: theme.spacing[3],
		variants: {
			paddingTop: {
				none: { paddingTop: theme.spacing[0] },
				sm: { paddingTop: theme.spacing[5] },
				md: { paddingTop: theme.spacing[7] },
				lg: { paddingTop: theme.spacing[10] },
				custom: {},
			},
			paddingBottom: {
				none: { paddingBottom: theme.spacing[0] },
				sm: { paddingBottom: theme.spacing[5] },
				md: { paddingBottom: theme.spacing[7] },
				lg: { paddingBottom: theme.spacing[10] },
				custom: {},
			},
			rightAlignment: {
				start: {},
				center: {},
				end: {},
			},
		},
	},
	assetRow: {
		flexDirection: 'row',
		marginBottom: theme.spacing[2],
	},
	assetContainer: {},
	contentRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	textColumn: {
		flex: 1,
		flexDirection: 'column',
		gap: theme.spacing[3],
	},
	rightColumn: {
		height: '100%',
		maxHeight: '100%',
		marginLeft: theme.spacing[4],
		variants: {
			rightAlignment: {
				start: { justifyContent: 'flex-start' },
				center: { justifyContent: 'center' },	
				end: { justifyContent: 'flex-end' },
			},
		},
	},
}));

// ============================================
// Styles - Title Typography
// ============================================

const titleStyles = StyleSheet.create((theme) => ({
	text: {
		color: theme.colors.neutral.text_1,
		variants: {
			size: {
				sm: {
					...theme.typography.h3,
				},
				md: {
					...theme.typography.h2,
				},
				lg: {
					...theme.typography.h1,
				},
			},
		},
	},
}));

// ============================================
// Styles - Subtitle Typography
// ============================================

const subtitleStyles = StyleSheet.create((theme) => ({
	text: {
		paddingHorizontal: theme.spacing[1],
		color: theme.colors.neutral.text_3,
		variants: {
			size: {
				sm: {
					...theme.typography.body2,
					fontWeight: 400,
				},
				md: {
					...theme.typography.body1,
					fontWeight: 400,
				},
				lg: {
					...theme.typography.h6,
					fontWeight: 400,
				},
			},
		},
	},
}));
