import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { BottomSheetModalRootProps } from './BottomSheetModal.types';
import { InnerContext } from './BottomSheetModalInnerContext';

export const BottomSheetModalRoot = forwardRef<
	GorhomBottomSheetModal,
	BottomSheetModalRootProps
>(
	(
		{
			visible,
			children,
			bottomInset = 12,
			detached = true,
			size = 'lg',
			shadow = 'md',
			rounded = 'md',
			backdropComponent,
			backgroundComponent,
			style,
			onDismiss,
			...rest
		},
		ref
	) => {
		const { rt } = useUnistyles();
		const bottomSheetModalRef = useRef<GorhomBottomSheetModal>(null);

		useImperativeHandle(ref, () => bottomSheetModalRef.current as GorhomBottomSheetModal);

		styles.useVariants({ rounded, shadow, detached, size });

		const handleDismiss = useCallback(() => {
			onDismiss?.();
			bottomSheetModalRef.current?.dismiss?.();
		}, [onDismiss, bottomSheetModalRef.current]);

		const renderBackdrop = useCallback(
			(props: BottomSheetBackdropProps) => {
				if (backdropComponent) {
					return backdropComponent(props);
				}
				return (
					<BottomSheetBackdrop
						{...props}
						disappearsOnIndex={-1}
						appearsOnIndex={0}
						pressBehavior="close"
					/>
				);
			},
			[backdropComponent]
		);

		const contextValue = useMemo(
			() => ({ close: handleDismiss }),
			[handleDismiss]
		);

		useEffect(() => {
			if (visible) {
				bottomSheetModalRef.current?.present?.();
			} else {
				handleDismiss();
			}
		}, [visible, handleDismiss]);

		return (
			<GorhomBottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={['100%']}
				enableDynamicSizing={false}
				onDismiss={handleDismiss}
				backdropComponent={renderBackdrop}
				backgroundComponent={backgroundComponent}
				bottomInset={detached ? rt.insets.bottom + bottomInset : 0}
				detached={detached}
				style={styles.sheetRoot}
				handleIndicatorStyle={styles.indicator}
				backgroundStyle={{
					backgroundColor: 'transparent',
				}}
				handleStyle={styles.handle}
				accessibilityViewIsModal
				importantForAccessibility="yes"
				{...rest}
			>
				<InnerContext.Provider value={contextValue}>
					<View style={styles.contentWrapper}>
						<View
							style={[
								styles.contentContainer(bottomInset),
								style,
							]}
							accessible
							accessibilityViewIsModal
						>
							{children}
						</View>
					</View>
				</InnerContext.Provider>
			</GorhomBottomSheetModal>
		);
	}
);

BottomSheetModalRoot.displayName = 'BottomSheetModal';

const styles = StyleSheet.create((theme, rt) => ({
	contentContainer: (bottomInset: number) => ({
		alignSelf: 'center',
		width: '100%',
		backgroundColor: theme.colors.neutral.content_1,
		borderCurve: 'continuous',
		variants: {
			rounded: {
				none: { borderRadius: theme.rounded.none ?? 0 },
				xs: { borderRadius: theme.rounded.sm * 1.3 },
				sm: { borderRadius: theme.rounded.md * 1.3 },
				md: { borderRadius: theme.rounded.lg * 1.3 },
				lg: { borderRadius: theme.rounded.xl * 1.5 },
				xl: { borderRadius: theme.rounded._2xl * 1.5 },
			},
			shadow: {
				none: {
					boxShadow: undefined,
				},
				sm: {
					boxShadow: theme.shadows.sm ?? theme.shadows.xs,
				},
				md: {
					boxShadow: theme.shadows.md ?? theme.shadows.sm,
				},
				lg: {
					boxShadow: theme.shadows.lg ?? theme.shadows.md,
				},
				overlay: {
					boxShadow: theme.shadows.overlay ?? theme.shadows.lg,
				},
			},
			size: {
				sm: {
					width: '80%',
				},
				md: {
					width: '90%',
				},
				lg: {
					width: '100%',
				},
			},
			detached: {
				true: {
				},
				false: {
					paddingBottom: rt.insets.bottom + bottomInset,
				},
			},
		},
	}),
	sheetRoot: {
		borderRadius: theme.rounded.xl,
		variants: {
			detached: {
				true: {
					marginHorizontal: theme.spacing[5],
				},
				false: {
					marginHorizontal: 0,
				},
			},
		},
	},
	handle: {
		display: 'none',
	},
	indicator: {
		display: 'none',
	},

	contentWrapper: {
		height: '100%',
		flexDirection: 'column-reverse',
	},
}));
