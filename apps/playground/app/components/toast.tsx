import {
	Button,
	Icon,
	type ToastShowOptions,
	toast,
} from '@fleet-ui/components';
import { AlertCircle, CheckCircle } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import {
	commonStyles,
	PageHeader,
	Section,
} from '../../common/views';

const COLOR_SCHEMES: ToastShowOptions['colorScheme'][] = [
	'neutral',
	'primary',
	'success',
	'warning',
	'error',
	'info',
];

const VARIANTS: NonNullable<ToastShowOptions['variant']>[] = [
	'filled',
	'flat',
	'faded',
];

const SIZES: NonNullable<ToastShowOptions['size']>[] = ['sm', 'md', 'lg'];
const ROUNDED: NonNullable<ToastShowOptions['rounded']>[] = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
	'full',
];

const baseToast = (overrides: ToastShowOptions = {}) =>
	toast.show({
		title: 'Fleet UI Toast',
		description: 'Here is a Toast example description',
		icon: (
			<Icon icon={AlertCircle} size={'md'} strokeWidth={2} color={'#000'}/>
		),
		closable: true,
		colorScheme: 'primary',
		position: 'bottom',
		...overrides,
	});

export default function ToastScreen() {
	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Toast"
					description="Declarative Function API Based Non-Modal Toast. Supports position(top/bottom), safeArea+inset, colorScheme/variant/size/rounded/shadow, drag/X dismiss, and more."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic Toast call example."
				>
					<View style={commonStyles.row}>
					<Button onPress={() => baseToast({ position: 'top' })}>
							Top Toast
						</Button>
						<Button
							onPress={() => baseToast({ position: 'bottom' })}
							variant="outlined"
						>
							Bottom Toast
						</Button>
					</View>
				</Section>

				<Section title="Title Only">
					<View style={commonStyles.row}>
						<Button
							onPress={() =>
								baseToast({
									title: 'Title Only',
									description: undefined,
									colorScheme: 'success',
									variant: 'filled',
									icon: (
										<Icon
											icon={CheckCircle}
											size="md"
											colorScheme="neutral"
											strokeWidth={2}
										/>
									),
								})
							}
						>
							Title Only
						</Button>
					</View>
				</Section>

				<Section title="Size">
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<Button
								key={size}
								onPress={() => baseToast({ size, position: 'top' })}
							>
								{`size=${size}`}
							</Button>
						))}
					</View>
				</Section>

				<Section title="Color Scheme × Variant">
					<View style={commonStyles.column}>
						{VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.row}>
								{COLOR_SCHEMES.map((colorScheme) => (
									<Button
										key={`${variant}-${colorScheme}`}
										variant={variant}
										colorScheme={colorScheme}
										onPress={() => baseToast({ colorScheme, variant })}
									>
										{`${variant}/${colorScheme}`}
									</Button>
								))}
							</View>
						))}
					</View>
				</Section>

				<Section title="Inset">
					<View style={commonStyles.row}>
						<Button
							onPress={() =>
								baseToast({
									position: 'top',
									insets: { top: 24, horizontal: 12, bottom: 12 },
									description: 'Top inset 24 / horizontal 12 / bottom 12 applied',
								})
							}
						>
							Top inset 24 + horizontal 12
						</Button>
					</View>
				</Section>

				<Section title="SafeArea">
					<Text style={commonStyles.label}>On the web, the safe area is not covered by the browser's UI.</Text>
					<Text style={commonStyles.label}>So, Toast component has default margin of the top and bottom on the web.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() =>
								baseToast({
									safeArea: true,
								})
							}
							variant="flat"
						>
							SafeArea True
						</Button>
						<Button
							onPress={() =>
								baseToast({
									safeArea: false,
								})
							}
							variant="flat"
						>
							SafeArea False
						</Button>
					</View>
				</Section>

				<Section title="Action Prop">
					<Text style={commonStyles.label}>You can add an 'action' prop to the Toast. It requires a 'label' and 'onPress' function icnluded object.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() =>
								baseToast({
									action: {
										label: 'Undo',
										onPress: () =>
											baseToast({
												title: 'Action pressed',
												description: 'Undo tapped',
												variant: 'faded',
											}),
									},
								})
							}
							variant="flat"
						>
							Action button included
						</Button>
					</View>
				</Section>

				<Section title="Closable Prop">
					<Text style={commonStyles.label}>Closable prop is used to control the visibility of the 'x' button.</Text>
					<Text style={commonStyles.label}>If false, the only way to close the Toast is to drag it down or automatically close after the duration.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() => baseToast({ closable: true })}
							variant="flat"
						>
							Closable True
						</Button>
						<Button
							onPress={() => baseToast({ closable: false })}
							variant="outlined"
						>
							Closable False
						</Button>
					</View>
				</Section>

				<Section title="Drag To Dismiss Prop">
					<Text style={commonStyles.label}>Drag To Dismiss prop is used to control the ability to dismiss the Toast by dragging it down.</Text>
					<Text style={commonStyles.label}>If false, the only way to dismiss the Toast is to click the 'x' button or automatically close after the duration.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() => baseToast({ dragToDismiss: true })}
							variant="flat"
						>
							Drag To Dismiss True
						</Button>
						<Button
							onPress={() => baseToast({ dragToDismiss: false })}
							variant="outlined"
						>
							Drag To Dismiss False
						</Button>
					</View>
				</Section>

				<Section title="Close Threshold Prop">
					<Text style={commonStyles.label}>Close Threshold prop is used to control the threshold for dismissing the Toast by dragging it down.</Text>
					<Text style={commonStyles.label}>If the drag distance is greater than the threshold, the Toast will be dismissed.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() => baseToast({ closeThreshold: 48, insets:{bottom : 96} })}
							variant="flat"
						>
							Close Threshold 48
						</Button>
						<Button
							onPress={() => baseToast({ closeThreshold: 96, insets:{bottom : 96} })}
							variant="outlined"
						>
							Close Threshold 96
						</Button>
					</View>
				</Section>

				<Section title="Duration Prop">
					<Text style={commonStyles.label}>Duration prop is used to control the duration of the Toast.</Text>
					<Text style={commonStyles.label}>If the duration is 0, the Toast will not automatically close.</Text>
					<View style={commonStyles.row}>
						<Button
							onPress={() => baseToast({ duration: 0 })}
							variant="flat"
						>
							Duration 0ms
						</Button>
						<Button
							onPress={() => baseToast({ duration: 3500 })}
							variant="outlined"
						>
							Duration 3500ms (default)
						</Button>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
