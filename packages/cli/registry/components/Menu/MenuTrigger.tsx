import {
	cloneElement,
	forwardRef,
	isValidElement,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Dimensions,
	type LayoutChangeEvent,
	type LayoutRectangle,
	Modal,
	Pressable,
	View,
} from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { MenuProvider } from './Menu.context';
import type { MenuPlacement, MenuSize, MenuTriggerProps } from './Menu.types';
import { scheduleOnRN } from 'react-native-worklets';

// ============================================================================
// Types
// ============================================================================

interface Position {
	top: number;
	left: number;
}

// ============================================================================
// Utils
// ============================================================================

const calculatePosition = (
	triggerLayout: LayoutRectangle,
	dropdownLayout: { width: number; height: number },
	placement: MenuPlacement,
	screenDimensions: { width: number; height: number },
	options?: { offset: number; padding: number }
): Position => {
	const { x, y, width, height } = triggerLayout;
	const { width: dropdownWidth, height: dropdownHeight } = dropdownLayout;
	const { width: screenWidth, height: screenHeight } = screenDimensions;

	let top = 0;
	let left = 0;

	const offset = options?.offset ?? 4; // Trigger ↔ dropdown gap
	const padding = options?.padding ?? 8; // screen edge padding

	// Calculate default position
	switch (placement) {
		case 'top':
			top = y - dropdownHeight - offset;
			left = x + (width - dropdownWidth) / 2;
			break;
		case 'top-start':
			top = y - dropdownHeight - offset;
			left = x;
			break;
		case 'top-end':
			top = y - dropdownHeight - offset;
			left = x + width - dropdownWidth;
			break;
		case 'bottom':
			top = y + height + offset;
			left = x + (width - dropdownWidth) / 2;
			break;
		case 'bottom-start':
			top = y + height + offset;
			left = x;
			break;
		case 'bottom-end':
			top = y + height + offset;
			left = x + width - dropdownWidth;
			break;
		case 'left':
			top = y + (height - dropdownHeight) / 2;
			left = x - dropdownWidth - offset;
			break;
		case 'left-start':
			top = y;
			left = x - dropdownWidth - offset;
			break;
		case 'left-end':
			top = y + height - dropdownHeight;
			left = x - dropdownWidth - offset;
			break;
		case 'right':
			top = y + (height - dropdownHeight) / 2;
			left = x + width + offset;
			break;
		case 'right-start':
			top = y;
			left = x + width + offset;
			break;
		case 'right-end':
			top = y + height - dropdownHeight;
			left = x + width + offset;
			break;
	}

	// Display boundary correction
	// Left boundary
	if (left < padding) {
		left = padding;
	}

	// Right boundary
	if (left + dropdownWidth > screenWidth - padding) {
		left = screenWidth - dropdownWidth - padding;
	}

	// Top boundary
	if (top < padding) {
		top = padding;
	}

	// Bottom boundary
	if (top + dropdownHeight > screenHeight - padding) {
		top = screenHeight - dropdownHeight - padding;
	}

	return { top, left };
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	dropdownContainer: {
		position: 'absolute',
	},
}));

// ============================================================================
// MenuTrigger Component
// ============================================================================

export const MenuTrigger = forwardRef<View, MenuTriggerProps>(
	(
		{
			open: controlledOpen,
			defaultOpen = false,
			onOpen,
			onClose,
			children,
			dropdown,
			placement = 'bottom-start',
			closeOnOutsidePress = true,
			closeOnSelect = true,
			style,
			...viewProps
		},
		forwardedRef
	) => {
	const { theme } = useUnistyles();
	const positionOffset = theme.spacing[1];
	const positionPadding = theme.spacing[2];

	// Controlled/Uncontrolled state management
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : internalOpen;

	// Modal's actual visible state (keep until animation is complete)
	const [modalVisible, setModalVisible] = useState(false);

	// Ref for measuring layout
	const triggerRef = useRef<View>(null);

	useImperativeHandle(forwardedRef, () => triggerRef.current!);
	const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(
		null
	);
	const [dropdownSize, setDropdownSize] = useState({ width: 0, height: 0 });
	const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

	// Animation
	const opacity = useSharedValue(0);
	const scaleX = useSharedValue(0.5);
	const scaleY = useSharedValue(0);

	// Modal hide (call after animation is complete)
	const hideModal = useCallback(() => {
		'worklet';
		setModalVisible(false);
	}, []);

	// Open menu
	const handleOpen = useCallback(() => {
		if (!isControlled) {
			setInternalOpen(true);
		}
		onOpen?.();
	}, [isControlled, onOpen]);

	// Close menu
	const handleClose = useCallback(() => {
		if (!isControlled) {
			setInternalOpen(false);
		}
		onClose?.();
	}, [isControlled, onClose]);

	// Measure trigger layout
	const measureTrigger = useCallback(() => {
		triggerRef.current?.measureInWindow((x, y, width, height) => {
			setTriggerLayout({ x, y, width, height });
		});
	}, []);

	// Trigger click
	const handleTriggerPress = useCallback(() => {
		if (isOpen) {
			handleClose();
		} else {
			measureTrigger();
			handleOpen();
		}
	}, [isOpen, handleClose, measureTrigger, handleOpen]);

	// Overlay click (outside click)
	const handleOverlayPress = useCallback(() => {
		if (closeOnOutsidePress) {
			handleClose();
		}
	}, [closeOnOutsidePress, handleClose]);

	// Measure dropdown layout
	const handleDropdownLayout = useCallback(
		(event: LayoutChangeEvent) => {
			const { width, height } = event.nativeEvent.layout;
			setDropdownSize({ width, height });

			// If trigger layout is present, calculate position
			if (triggerLayout) {
				const screenDimensions = Dimensions.get('window');
				const newPosition = calculatePosition(
					triggerLayout,
					{ width, height },
					placement,
					screenDimensions,
					{ offset: positionOffset, padding: positionPadding }
				);
				setPosition(newPosition);
			}
		},
		[triggerLayout, placement, positionOffset, positionPadding]
	);

	// If trigger layout is changed, recalculate position
	useEffect(() => {
		if (triggerLayout && dropdownSize.width > 0) {
			const screenDimensions = Dimensions.get('window');
			const newPosition = calculatePosition(
				triggerLayout,
				dropdownSize,
				placement,
				screenDimensions,
				{ offset: positionOffset, padding: positionPadding }
			);
			setPosition(newPosition);
		}
	}, [triggerLayout, dropdownSize, placement, positionOffset, positionPadding]);

	// Open/Close animation
	useEffect(() => {
		if (isOpen) {
			// Open: Immediately display Modal → Start animation
			setModalVisible(true);
			opacity.value = withSpring(1, { stiffness: 1300, mass: 2, damping: 60 });
			scaleX.value = withDelay(
				50,
				withSpring(1, { stiffness: 1300, mass: 2, damping: 60 })
			);
			scaleY.value = withDelay(
				70,
				withSpring(1, { stiffness: 1300, mass: 2, damping: 60 })
			);
		} else if (modalVisible) {
			// Close: Start animation → Hide Modal after completion
			opacity.value = withDelay(
				30,
				withSpring(
					0,
					{ stiffness: 1500, mass: 2, damping: 100 },
					(finished) => {
						if (finished) {
							hideModal()
						}
					}
				)
			);
			scaleX.value = withDelay(
				30,
				withSpring(0, { stiffness: 1800, mass: 2, damping: 100 })
			);
			scaleY.value = withDelay(
				40,
				withSpring(0, { stiffness: 1800, mass: 2, damping: 100 })
			);
		}
	}, [isOpen]);

	// Context value
	const menuSize = useMemo<MenuSize>(() => {
		if (isValidElement(dropdown)) {
			const maybeSize = (dropdown.props as { size?: MenuSize } | undefined)?.size;
			return maybeSize ?? 'md';
		}
		return 'md';
	}, [dropdown]);

	const contextValue = useMemo(
		() => ({
			size: menuSize,
			close: handleClose,
			closeOnSelect,
		}),
		[menuSize, handleClose, closeOnSelect]
	);

	// Inject props to trigger children
	const triggerElement = useMemo(() => {
		if (isValidElement(children)) {
			const child = children as React.ReactElement<{
				onPress?: (event: unknown) => void;
			}>;
			const childOnPress = child.props.onPress;

			return cloneElement(child, {
				onPress: (event: unknown) => {
					handleTriggerPress();
					childOnPress?.(event);
				},
			});
		}
		return children;
	}, [children, handleTriggerPress]);

	// Animation style
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
	}));

	return (
		<>
			{/* Trigger */}
			<View ref={triggerRef} style={style} {...viewProps}>
				{triggerElement}
			</View>

			{/* Dropdown Modal */}
			<Modal
				visible={modalVisible}
				transparent
				animationType="none"
				statusBarTranslucent
				onRequestClose={handleClose}
			>
				<View
					style={StyleSheet.absoluteFillObject}
					accessibilityViewIsModal
					importantForAccessibility="yes"
					onAccessibilityEscape={handleClose}
				>
					{/* Overlay (for outside press detection) */}
					<Pressable
						style={styles.overlay}
						onPress={handleOverlayPress}
						accessible={false}
					>
						{/* Dropdown */}
						<Animated.View
							style={[
								styles.dropdownContainer,
								{ top: position.top, left: position.left },
								animatedStyle,
							]}
							onLayout={handleDropdownLayout}
							// Prevent Pressable event propagation
							onStartShouldSetResponder={() => true}
						>
							<MenuProvider value={contextValue}>{dropdown}</MenuProvider>
						</Animated.View>
					</Pressable>
				</View>
			</Modal>
		</>
	);
	}
);

MenuTrigger.displayName = 'Menu.Trigger';
