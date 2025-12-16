import { ChevronLeft } from 'lucide-react-native';
import { forwardRef, useCallback, useMemo } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type {
	ContextHeaderProps,
	ContextHeaderSize,
} from './ContextHeader.types';

// ============================================
// CONSTANTS
// ============================================
const ICON_SIZE_MAP: Record<ContextHeaderSize, number> = {
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32,
};

// ============================================
// COMPONENT
// ============================================

/**
 * ContextHeader
 *
 * A custom header component for mobile screens that can replace
 * the native navigation stack header. Provides a 3-column layout
 * with left (typically back button), center (title), and right
 * (action buttons) areas.
 *
 * @example
 * ```tsx
 * // Basic usage with back button
 * <ContextHeader
 *   title="Page Title"
 *   onBackPress={() => navigation.goBack()}
 * />
 *
 * // Without back button (title aligns left)
 * <ContextHeader
 *   title="Home"
 *   showBackButton={false}
 *   right={<SettingsIcon />}
 * />
 *
 * // Custom left content
 * <ContextHeader
 *   title="Profile"
 *   left={<CloseButton />}
 *   right={<EditButton />}
 * />
 * ```
 */
export const ContextHeader = forwardRef<View, ContextHeaderProps>(
	(props, ref) => {
		const {
			title,
			left,
			right,
			showBackButton = true,
			onBackPress,
			includeSafeAreaTop = false,
			fixed = false,
			size = 'md',
			paddingHorizontal = 'none',
			shadow = 'none',
			titleAlign: titleAlignProp,
			style,
			titleStyle,
			testID,
		} = props;

		const { theme } = useUnistyles();

		// Determine if there's left content
		const hasLeftContent = left !== undefined || showBackButton;
		// Auto-determine title alignment
		// If no left content exists, default to 'left' alignment
		// Otherwise use provided alignment or default to 'center'
		const titleAlign = useMemo(() => {
			if (titleAlignProp) return titleAlignProp;
			return hasLeftContent ? 'center' : 'left';
		}, [titleAlignProp, hasLeftContent]);

		const isCentered = useMemo(() => titleAlign === 'center', [titleAlign]);
		const iconSize = useMemo(() => ICON_SIZE_MAP[size], [size]);

		styles.useVariants({ size, shadow, titleAlign, paddingHorizontal, includeSafeAreaTop, fixed });


		// Handle back button press
		const handleBackPress = useCallback(
			(event: GestureResponderEvent) => {
				onBackPress?.();
			},
			[onBackPress]
		);

		// Render default back button
		const renderBackButton = useCallback(() => (
			<Pressable
				// style={styles.backButton}
				onPress={handleBackPress}
				hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
				accessibilityRole="button"
				accessibilityLabel="뒤로 가기"
				testID={testID ? `${testID}-back-button` : undefined}
			>
				<ChevronLeft
					size={iconSize}
					// width={24}
					// height={24}
					color={theme.colors.neutral.text_1}
					strokeWidth={1.5}
				/>
			</Pressable>
		), [handleBackPress, iconSize, theme.colors.neutral.text_1]);

		// Render left area content
		const renderLeft = () => {
			if (left !== undefined) {
				return <View style={styles.actionContainer}>{left}</View>;
			}

			if (showBackButton) {
				return (
					<View style={[styles.actionContainer, { alignItems: 'flex-start' }]}>
						{renderBackButton()}
					</View>
				);
			}

			return null;
		};

		// Render right area content
		const renderRight = () => {
			if (!right) return null;

			return <View style={styles.actionContainer}>{right}</View>;
		};

		// Render title
		const renderTitle = () => {
			if (!title) return null;

			if (isCentered) {
				// Centered title uses absolute positioning
				return (
					<View style={styles.titleContainerCentered} pointerEvents="none">
						<Text
							style={[styles.title, titleStyle]}
							numberOfLines={1}
							ellipsizeMode="tail"
							accessibilityRole="header"
						>
							{title}
						</Text>
					</View>
				);
			}

			// Left-aligned title flows in flex layout
			return (
				<View style={styles.titleContainerLeft}>
					<Text
						style={[styles.title, titleStyle]}
						numberOfLines={1}
						ellipsizeMode="tail"
						accessibilityRole="header"
					>
						{title}
					</Text>
				</View>
			);
		};

		return (
			<View
				ref={ref}
				style={[
					styles.container,
					// backgroundColor ? { backgroundColor } : undefined,
					style,
				]}
				testID={testID}
			>

				<View style={styles.containerInner}>
					{isCentered ? (
						<>
							{/* Centered layout: absolute title with flex left/right */}
							{renderTitle()}
							{renderLeft()}
							<View style={styles.spacer} />
							{renderRight()}
						</>
					) : (
						<>
							{/* Left-aligned layout: sequential flex */}
							{renderLeft()}
							{renderTitle()}
							<View style={styles.spacer} />
							{renderRight()}
						</>
					)}
				</View>

				
			</View>
		);
	}
);

ContextHeader.displayName = 'ContextHeader';

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 52,
		position: 'relative',
		backgroundColor: theme.colors.neutral.content_1,

		variants: {
			size: {
				sm: {
					minHeight: 52,
				},
				md: {
					minHeight: 56,
				},
				lg: {
					minHeight: 60,
				},
				xl: {
					minHeight: 64,
				},
			},
			shadow: {
				none: {
					boxShadow: 'none',
					shadowColor: 'transparent',
					shadowOpacity: 0,
					shadowRadius: 0,
					shadowOffset: { width: 0, height: 0 },
					elevation: 0,
				},
				sm: {
					boxShadow: theme.shadows.smooth_sm,
				},
				md: {
					boxShadow: theme.shadows.smooth_md,
				},
				lg: {
					boxShadow: theme.shadows.smooth_lg,
				},
			},
			titleAlign: {
				left: {},
				center: {},
			},
			includeSafeAreaTop: {
				true: {
					paddingTop: rt.insets.top,
				},
				false: {
					paddingTop: 0,
				},
			},
			fixed: {
				true: {
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
				},
				false: {
					position: 'relative',
				},
			},
			paddingHorizontal: {
				none: {
					paddingHorizontal: 0,
				},
				sm: {
					paddingHorizontal: theme.spacing[5],
				},
				md: {
					paddingHorizontal: theme.spacing[6],
				},
				lg: {
					paddingHorizontal: theme.spacing[8],
				},
			},
		},
	},

	containerInner: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'transparent',
	},

	// Common container for left and right action areas
	actionContainer: {
		flexShrink: 0,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,

		variants: {
			size: {
				sm: {
					minHeight: 52,
				},
				md: {
					minHeight: 56,	
				},
				lg: {
					minHeight: 60,
				},
				xl: {
					minHeight: 64,
				},
			},
		},
	},

	// Back button pressable area
	backButton: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},

	spacer: {
		flex: 1,
	},

	// Centered title - absolutely positioned
	titleContainerCentered: {
		position: 'absolute',
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing[16], // Leave space for left/right buttons
		backgroundColor: 'transparent',
		
	},

	// Left-aligned title - flows in flex
	titleContainerLeft: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: theme.spacing[2],
	},

	title: {
		color: theme.colors.neutral.text_1,
		zIndex: theme.zIndex.overlay,

		variants: {
			size: {
				sm: {
					...theme.typography.body2Strong,
					lineHeight: 18,
					fontWeight: theme.text.fontWeight.semibold,
				},
				md: {
					...theme.typography.body1Strong,
					fontWeight: theme.text.fontWeight.semibold,
					lineHeight: 22,
				},
				lg: {
					...theme.typography.body1Strong,
					fontWeight: theme.text.fontWeight.semibold,
					lineHeight: 22,
				},
				xl: {
					...theme.typography.h6Strong,
					fontWeight: theme.text.fontWeight.semibold,
					lineHeight: 24,
				},
			},
			titleAlign: {
				left: {
					textAlign: 'left',
				},
				center: {
					textAlign: 'center',
				},
			},
		},
	},
}));
