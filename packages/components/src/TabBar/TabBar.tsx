import { useCallback, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import Animated, {
	interpolate,
	scrollTo,
	useAnimatedReaction,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { runOnJS, runOnUI } from 'react-native-worklets';
import type {
	TabBarIndicatorPadding,
	TabBarProps,
} from './TabBar.types';
import { TabBarItem } from './TabBarItem';

// ========================================================================
// Constants
// ========================================================================

const OFFSCREEN_ITEM_WIDTH = 20;

const INDICATOR_PADDING_HORIZONTAL: Record<TabBarIndicatorPadding, number> = {
	none: 0,
	sm: 2,
	md: 4,
	lg: 8,
};

// ========================================================================
// Component
// ========================================================================

export function TabBar({
	selectedPage,
	items,
	onSelect,
	colorScheme = 'primary',
	variant = 'filled',
	size = 'md',
	rounded = 'md',
	shadow = 'none',
	indicatorShadow = 'none',
	indicatorPadding = 'md',
	getItemAccessibilityLabel,
	accessibilityLabels,
	hitSlop,
	disabledIndices,
	isItemDisabled,
	style,
	...rootViewProps
}: TabBarProps) {
	styles.useVariants({
		variant,
		rounded,
		size,
		shadow,
		indicatorShadow,
		colorScheme,
		indicatorPadding,
	});

	// prorgress is matched with the index of the item
	const dragProgress = useSharedValue(selectedPage);
	// state of the drag gesture
	const dragState = useSharedValue<'idle' | 'dragging' | 'settling'>('idle');
	// ref to the scroll view
	const scrollElRef = useAnimatedRef<ScrollView>();
	// state of the sync between the scroll view and the pager
	const syncScrollState = useSharedValue<'synced' | 'unsynced' | 'needs-sync'>(
		'unsynced'
	);

	const didInitialScroll = useSharedValue(false);
	const contentSize = useSharedValue(0);
	const containerSize = useSharedValue(0);
	const scrollX = useSharedValue(0);
	// layouts of the items
	const layouts = useSharedValue<{ x: number; width: number }[]>([]);
	// layouts of the text of the items
	const textLayouts = useSharedValue<{ width: number }[]>([]);

	const itemsLength = items.length;
	// last internal select ref to prevent immediate sync after internal select
	const lastInternalSelectRef = useRef<{ index: number; at: number } | null>(
		null
	);

	const scrollToOffsetJS = useCallback(
		(x: number) => {
			scrollElRef.current?.scrollTo({
				x,
				y: 0,
				animated: true,
			});
		},
		[scrollElRef]
	);

	// convert the index of the item to the offset of the scroll view
	const indexToOffset = useCallback(
		(index: number) => {
			'worklet';
			const layout = layouts.value[index];
			const availableSize =
				containerSize.value -
				2 * INDICATOR_PADDING_HORIZONTAL[indicatorPadding];

			if (!layout) {
				const offsetPerPage = contentSize.value - availableSize;
				return (index / (itemsLength - 1)) * offsetPerPage;
			}

			const freeSpace = availableSize - layout.width;

			const accumulatingOffset = interpolate(
				index,
				[0, itemsLength - 1],
				[0, freeSpace],
				'clamp'
			);

			return layout.x - accumulatingOffset;
		},
		[indicatorPadding, itemsLength, contentSize, containerSize, layouts]
	);

	const progressToOffset = useCallback(
		(progress: number) => {
			'worklet';
			return interpolate(
				progress,
				[Math.floor(progress), Math.ceil(progress)],
				[
					indexToOffset(Math.floor(progress)),
					indexToOffset(Math.ceil(progress)),
				],
				'clamp'
			);
		},
		[indexToOffset]
	);

	// ============================================================================
	//  Controlled sync: selectedPage -> dragProgress
	// ========================================================================

	// - external changes are reflected immediately
	// - internal changes due to tab click are skipped once to maintain spring animation
	const syncToSelectedPage = useCallback(
		(page: number) => {
			// clamp the page to the range of the items
			const clampedIndex = itemsLength > 0 ? Math.min(Math.max(page, 0), itemsLength - 1) : 0;

			// update the drag progress
			dragProgress.value = clampedIndex;

			// sync the scroll view to the selected page (after layout calculation)
			if (
				layouts.value.length === itemsLength &&
				containerSize.value > 0 &&
				contentSize.value > 0
			) {
				const offset = progressToOffset(clampedIndex);
				scrollToOffsetJS(offset);
				syncScrollState.value = 'synced';
			}
		},
		[
			containerSize,
			contentSize,
			itemsLength,
			progressToOffset,
			scrollElRef,
		]
	);

	useEffect(() => {
		const lastInternal = lastInternalSelectRef.current;

		if (
			lastInternal &&
			lastInternal.index === selectedPage &&
			Date.now() - lastInternal.at < 800
		) {
			// 내부 탭 클릭에 의해 부모가 selectedPage를 업데이트한 케이스:
			// 이미 UI thread에서 spring 애니메이션이 진행 중이므로 즉시 동기화로 덮어쓰지 않습니다.
			lastInternalSelectRef.current = null;
			return;
		}

		lastInternalSelectRef.current = null;
		syncToSelectedPage(selectedPage);
	}, [selectedPage, syncToSelectedPage]);

	// ============================================================================
	// useAnimatedReactions - automatic sync logic
	// ============================================================================

	useAnimatedReaction(
		() => layouts.value.length,
		(nextLayoutsLength, prevLayoutsLength) => {
			if (nextLayoutsLength !== prevLayoutsLength) {
				if (
					nextLayoutsLength === itemsLength &&
					didInitialScroll.value === false
				) {
					didInitialScroll.value = true;
					const progress = dragProgress.value;
					const offset = progressToOffset(progress);
					runOnJS(scrollToOffsetJS)(offset);
				}
			}
		}
	);

	useAnimatedReaction(
		() => dragProgress.value,
		(nextProgress, prevProgress) => {
			if (
				nextProgress !== prevProgress &&
				dragState.value !== 'idle' &&
				syncScrollState.value === 'synced'
			) {
				const offset = progressToOffset(nextProgress);
				scrollTo(scrollElRef, offset, 0, false);
			}
		}
	);

	useAnimatedReaction(
		() => dragState.value,
		(nextDragState, prevDragState) => {
			if (
				nextDragState !== prevDragState &&
				nextDragState === 'idle' &&
				(syncScrollState.value === 'unsynced' ||
					syncScrollState.value === 'needs-sync')
			) {
				const progress = dragProgress.value;
				const offset = progressToOffset(progress);
				scrollTo(scrollElRef, offset, 0, true);
				syncScrollState.value = 'synced';
			}
		}
	);

	useAnimatedReaction(
		() => dragProgress.value,
		(nextProgress, prevProgress) => {
			if (nextProgress !== prevProgress) {
				dragState.value = 'idle';
			}
		}
	);

	// handle tab click

	const onPressUIThread = useCallback(
		(index: number) => {
			'worklet';

			dragProgress.value = withSpring(index);

			const itemLayout = layouts.value[index];
			if (!itemLayout) {
				return;
			}

			const leftEdge = itemLayout.x - OFFSCREEN_ITEM_WIDTH;
			const rightEdge = itemLayout.x + itemLayout.width + OFFSCREEN_ITEM_WIDTH;
			const scrollLeft = scrollX.value;
			const scrollRight = scrollLeft + containerSize.value;
			const scrollIntoView = leftEdge < scrollLeft || rightEdge > scrollRight;

			if (
				syncScrollState.value === 'synced' ||
				syncScrollState.value === 'needs-sync' ||
				scrollIntoView
			) {
				const offset = progressToOffset(index);
				scrollTo(scrollElRef, offset, 0, true);
				syncScrollState.value = 'synced';
			} else {
				syncScrollState.value = 'needs-sync';
			}
		},
		[
			syncScrollState,
			scrollElRef,
			scrollX,
			progressToOffset,
			containerSize,
			layouts,
		]
	);

	const onItemLayout = useCallback(
		(i: number, layout: { x: number; width: number }) => {
			'worklet';
			const currentLayouts = layouts.value;
			currentLayouts[i] = layout;
			layouts.value = [...currentLayouts];
		},
		[layouts]
	);

	const onTextLayout = useCallback(
		(i: number, layout: { width: number }) => {
			'worklet';
			const currentLayouts = textLayouts.value;
			currentLayouts[i] = layout;
			textLayouts.value = [...currentLayouts];
		},
		[textLayouts]
	);

	// ============================================================================
	// Calculate the indicator style
	// ============================================================================

	const indicatorStyle = useAnimatedStyle(() => {
		const layoutsValue = layouts.value;
		const textLayoutsValue = textLayouts.value;

		if (
			layoutsValue.length !== itemsLength ||
			textLayoutsValue.length !== itemsLength
		) {
			return { opacity: 0 };
		}

		function getScaleX(index: number) {
			const textWidth = textLayoutsValue[index].width;
			const itemWidth = layoutsValue[index].width;
			const minIndicatorWidth = 45;
			const indicatorWidth = Math.min(
				itemWidth,
				Math.max(minIndicatorWidth, textWidth)
			);
			return indicatorWidth / contentSize.value;
		}

		if (variant === 'underlined') {
			// 기존 로직 (scaleX 사용)
			if (textLayoutsValue.length === 1) {
				return {
					opacity: 1,
					transform: [
						{
							scaleX: getScaleX(0),
						},
					],
				};
			}

			return {
				opacity: 1,
				transform: [
					{
						translateX: interpolate(
							dragProgress.value,
							layoutsValue.map((l, i) => i),
							layoutsValue.map((l) => l.x + l.width / 2 - contentSize.value / 2)
						),
					},
					{
						scaleX: interpolate(
							dragProgress.value,
							textLayoutsValue.map((l, i) => i),
							textLayoutsValue.map((l, i) => getScaleX(i))
						),
					},
				],
			};
		} else {
			// filled/faded/flat: calculate left + width directly
			return {
				opacity: 1,
				left: interpolate(
					dragProgress.value,
					layoutsValue.map((_, i) => i),
					layoutsValue.map((l) => l.x)
				),
				width: interpolate(
					dragProgress.value,
					layoutsValue.map((_, i) => i),
					layoutsValue.map((l) => l.width)
				),
			};
		}
	});

	// ============================================================================
	// Handle the event on the JS thread
	// ============================================================================

	const onPressItem = useCallback(
		(index: number) => {
			if (onSelect) {
				lastInternalSelectRef.current = { index, at: Date.now() };
			}
			runOnUI(onPressUIThread)(index);
			onSelect?.(index);
		},
		[onSelect, onPressUIThread]
	);

	// ============================================================================
	// Render the component
	// ============================================================================

	return (
		<Animated.View style={[styles.rootContainer, style]} {...rootViewProps}>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				ref={scrollElRef}
				contentContainerStyle={styles.contentContainer}
				onLayout={(e) => {
					containerSize.value = e.nativeEvent.layout.width;
				}}
				onScrollBeginDrag={() => {
					syncScrollState.value = 'unsynced';
				}}
				onScroll={(e) => {
					scrollX.value = Math.round(e.nativeEvent.contentOffset.x);
				}}
			>
				<Animated.View
					onLayout={(e) => {
						contentSize.value = e.nativeEvent.layout.width;
					}}
					style={{ flexDirection: 'row', flexGrow: 1 }}
				>
					<Animated.View style={[styles.indicator, indicatorStyle]} />
					{items.map((item, i) => {
						const isSelected = selectedPage === i;
						const accessibilityLabelForItem =
							accessibilityLabels?.[i] ??
							getItemAccessibilityLabel?.(item, i) ??
							(typeof item === 'string' ? item : undefined);

						const disabled = Boolean(
							disabledIndices?.includes(i) || isItemDisabled?.(item, i)
						);

						return (
							<TabBarItem
								key={i}
								index={i}
								dragProgress={dragProgress}
								item={item}
								size={size}
								variant={variant}
								colorScheme={colorScheme}
								isSelected={isSelected}
								accessibilityLabel={accessibilityLabelForItem}
								disabled={disabled}
								hitSlop={hitSlop}
								onPressItem={onPressItem}
								onItemLayout={onItemLayout}
								onTextLayout={onTextLayout}
							/>
						);
					})}
				</Animated.View>
			</ScrollView>

			<Animated.View style={styles.outerBottomBorder} />
		</Animated.View>
	);
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => {
	return {
		rootContainer: {
			position: 'relative',
			flexDirection: 'row',
			borderCurve: 'continuous',
			flex: 1,

			variants: {
				variant: {
					underlined: {
						backgroundColor: 'transparent',
					},
					filled: {
						backgroundColor: theme.colors.neutral.content_2,
					},
					faded: {
						backgroundColor: theme.colors.neutral.content_2,
						borderColor: theme.colors.neutral.border_subtle,
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_2,
					},
					ghost: {
						backgroundColor: 'transparent',
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: { borderRadius: theme.rounded.xs },
					sm: { borderRadius: theme.rounded.sm },
					md: { borderRadius: theme.rounded.md },
					lg: { borderRadius: theme.rounded.lg },
					full: { borderRadius: theme.rounded.full },
				},
				size: {
					xs: { minHeight: 36 },
					sm: { minHeight: 40 },
					md: { minHeight: 44 },
					lg: { minHeight: 48 },
					xl: { minHeight: 52 },
				},
				shadow: {
					none: {},
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.inner },
				},
			},
			compoundVariants: [],
		},

		contentContainer: {
			flexGrow: 1,
			backgroundColor: 'transparent',
			variants: {
				indicatorPadding: {
					none: {
						paddingHorizontal: 0,
					},
					sm: {
						paddingHorizontal: theme.spacing[1],
					},
					md: {
						paddingHorizontal: theme.spacing[2],
					},
					lg: {
						paddingHorizontal: theme.spacing[3],
					},
				},
			},
		},

		indicator: {
			zIndex: 0,
			position: 'absolute',
			left: 0,
			bottom: 0,
			right: 0,
			borderCurve: 'continuous',
			variants: {
				variant: {
					underlined: {
						borderBottomWidth: 2,
					},
					filled: {},
					faded: {
						backgroundColor: theme.colors.neutral.content_3,
					},
					flat: {
						backgroundColor: theme.colors.neutral.content_1,
					},
					ghost: {
						backgroundColor: 'transparent',
					},
				},
				colorScheme: {
					primary: {
						borderColor: theme.colors.primary.solid,
					},
					neutral: {
						borderColor: theme.colors.neutral.border_default,
					},
					error: {
						borderColor: theme.colors.error.solid,
					},
					warning: {
						borderColor: theme.colors.warning.solid,
					},
					success: {
						borderColor: theme.colors.success.solid,
					},
					info: {
						borderColor: theme.colors.info.solid,
					},
				},
				rounded: {
					none: { borderRadius: 0 },
					xs: {
						borderRadius: theme.rounded._2xs * 1.25,
						borderTopLeftRadius: theme.rounded._2xs * 1.25,
						borderTopRightRadius: theme.rounded._2xs * 1.25,
					},
					sm: {
						borderRadius: theme.rounded.xs * 1.25,
						borderTopLeftRadius: theme.rounded.xs * 1.25,
						borderTopRightRadius: theme.rounded.xs * 1.25,
					},
					md: {
						borderRadius: theme.rounded.sm * 1.25,
						borderTopLeftRadius: theme.rounded.sm * 1.25,
						borderTopRightRadius: theme.rounded.sm * 1.25,
					},
					lg: {
						borderRadius: theme.rounded.md * 1.1,
						borderTopLeftRadius: theme.rounded.md * 1.1,
						borderTopRightRadius: theme.rounded.md * 1.1,
					},
					full: {
						borderRadius: theme.rounded.full,
						borderTopLeftRadius: theme.rounded.full,
						borderTopRightRadius: theme.rounded.full,
					},
				},
				shadow: {
					none: {},
					sm: theme.shadows?.sm || {},
					md: theme.shadows?.md || {},
					lg: theme.shadows?.lg || {},
				},
				indicatorShadow: {
					none: {},
					sm: { boxShadow: theme.shadows.sm },
					md: { boxShadow: theme.shadows.md },
					lg: { boxShadow: theme.shadows.lg },
				},
				// indicatorPadding: visual padding between indicator and container
				indicatorPadding: {
					none: {
						top: 0,
						height: '100%',
					},
					sm: {
						top: '3.5%',
						height: '93%',
					},
					md: {
						top: '10%',
						height: '80%',
					},
					lg: {
						top: '12.5%',
						height: '75%',
					},
				},
			},
			compoundVariants: [
				{
					variant: 'filled',
					colorScheme: 'primary',
					styles: {
						backgroundColor: theme.colors.primary.solid,
					},
				},
				{
					variant: 'filled',
					colorScheme: 'neutral',
					styles: {
						backgroundColor: theme.colors.neutral.content_inversed,
					},
				},
				{
					variant: 'filled',
					colorScheme: 'error',
					styles: {
						backgroundColor: theme.colors.error.solid,
					},
				},
				{
					variant: 'filled',
					colorScheme: 'warning',
					styles: {
						backgroundColor: theme.colors.warning.solid,
					},
				},
				{
					variant: 'filled',
					colorScheme: 'success',
					styles: {
						backgroundColor: theme.colors.success.solid,
					},
				},
				{
					variant: 'filled',
					colorScheme: 'info',
					styles: {
						backgroundColor: theme.colors.info.content_4,
					},
				},
			],
		},

		outerBottomBorder: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: '100%',
			borderBottomWidth: 0,
			borderBottomColor: theme.colors.neutral.border_default,
		},
	};
});
