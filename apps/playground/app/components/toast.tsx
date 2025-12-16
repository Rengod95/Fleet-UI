import {
	Button,
	Icon,
	IconButton,
	type ToastShowOptions,
	toast,
} from '@fleet-ui/components';
import { AlertCircle, CheckCircle } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
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
		title: 'Playground Toast',
		description: 'Top/Bottom, variant, inset, drag dismiss, X 버튼 지원',
		icon: (
			<IconButton
				colorScheme="neutral"
				variant="ghost"
				icon={<Icon icon={AlertCircle} size={'xl'} strokeWidth={2} />}
			/>
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
					description="전역 Provider + Toast.show() 기반 비모달 알림. 위치(top/bottom), safeArea+inset, colorScheme/variant/size/rounded/shadow, drag/X dismiss 지원."
				/>

				<Section title="기본 호출 (Top/Bottom)">
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
											size="lg"
											colorScheme="success"
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
										onPress={() => baseToast({ colorScheme, variant })}
									>
										{`${variant}/${colorScheme}`}
									</Button>
								))}
							</View>
						))}
					</View>
				</Section>

				<Section title="Inset · SafeArea · Action">
					<View style={commonStyles.row}>
						<Button
							onPress={() =>
								baseToast({
									position: 'top',
									insets: { top: 24, horizontal: 12 },
									description: '상단 inset 24 / 좌우 12 적용',
								})
							}
						>
							Top inset 24 + horizontal 12
						</Button>
						<Button
							onPress={() =>
								baseToast({
									position: 'bottom',
									safeArea: false,
									description: 'safeArea 비활성 (하단 침범 주의)',
								})
							}
							variant="outlined"
						>
							Bottom safeArea off
						</Button>
					</View>
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
							Action button 포함
						</Button>
					</View>
				</Section>

				<Section title="Drag / X 버튼 Dismiss">
					<View style={commonStyles.column}>
						<Button
							onPress={() =>
								baseToast({
									description: '드래그하거나 X 버튼으로 닫을 수 있습니다.',
									closeThreshold: 48,
									dragToDismiss: true,
								})
							}
						>
							드래그 & X 닫기
						</Button>
						<Button
							onPress={() =>
								baseToast({
									dragToDismiss: false,
									description: '드래그 불가, X만 사용',
								})
							}
							variant="outlined"
						>
							X만 사용 (dragToDismiss=false)
						</Button>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
