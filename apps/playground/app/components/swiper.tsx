import { Swiper } from '@fleet-ui/components';
import { Alert, ScrollView, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Enum Props 상수화
const VARIANTS = ['filled', 'outlined', 'flat', 'gradient'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
] as const;

const ROUNDED = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

export default function SwiperScreen() {
	useUnistyles();

	const handleSwipeSuccess = (label: string) => {
		Alert.alert('Success', `${label} completed!`);
	};

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				{/* Header */}
				<PageHeader
					title="Swiper"
					description="좌→우 스와이프 제스처로 액션을 확인하고 실행하는 인터랙티브 컴포넌트"
				/>

				{/* Variants */}
				<Section title="Variants">
					<View style={commonStyles.column}>
						{VARIANTS.map((variant) => (
							<Swiper
								key={variant}
								variant={variant}
								colorScheme="neutral"
								onSwipeSuccess={() => handleSwipeSuccess(variant)}
							>
								Slide to {variant}
							</Swiper>
						))}
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={commonStyles.column}>
						{SIZES.map((size) => (
							<Swiper
								key={size}
								size={size}
								colorScheme="primary"
								onSwipeSuccess={() => handleSwipeSuccess(size)}
								placeholder={`Slide to ${size}`}
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes - Filled */}
				<Section title="Color Schemes (Filled)">
					<View style={commonStyles.column}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Swiper
								key={colorScheme}
								variant="filled"
								colorScheme={colorScheme}
								onSwipeSuccess={() => handleSwipeSuccess(colorScheme)}
								placeholder={`Slide to ${colorScheme}`}
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes - Outlined */}
				<Section title="Color Schemes (Outlined)">
					<View style={commonStyles.column}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Swiper
								key={colorScheme}
								variant="outlined"
								colorScheme={colorScheme}
								onSwipeSuccess={() => handleSwipeSuccess(colorScheme)}
								placeholder={`Slide to ${colorScheme}`}
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes - Flat */}
				<Section title="Color Schemes (Flat)">
					<View style={commonStyles.column}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Swiper
								key={colorScheme}
								variant="flat"
								colorScheme={colorScheme}
								onSwipeSuccess={() => handleSwipeSuccess(colorScheme)}
								placeholder={`Slide to ${colorScheme}`}
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes - Gradient */}
				<Section title="Color Schemes (Gradient)">
					<View style={commonStyles.column}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<Swiper
								key={colorScheme}
								variant="gradient"
								colorScheme={colorScheme}
								onSwipeSuccess={() => handleSwipeSuccess(colorScheme)}
								placeholder={`Slide to ${colorScheme}`}
							/>
						))}
					</View>
				</Section>

				{/* Rounded */}
				<Section title="Rounded">
					<View style={commonStyles.column}>
						{ROUNDED.map((rounded) => (
							<Swiper
								key={rounded}
								variant="filled"
								colorScheme="primary"
								rounded={rounded}
								onSwipeSuccess={() => handleSwipeSuccess('rounded')}
								placeholder={`Slide to ${rounded}`}
							/>
						))}
					</View>
				</Section>

				{/* Threshold */}
				<Section title="Threshold">
					<View style={commonStyles.column}>
						<Swiper
							variant="filled"
							colorScheme="primary"
							threshold={0.5}
							onSwipeSuccess={() => handleSwipeSuccess('threshold 50%')}
							placeholder="Slide to threshold 50%"
						/>
						<Swiper
							variant="filled"
							colorScheme="primary"
							threshold={0.7}
							onSwipeSuccess={() => handleSwipeSuccess('threshold 70%')}
							placeholder="Slide to threshold 70%"
						/>
						<Swiper
							variant="filled"
							colorScheme="primary"
							threshold={0.9}
							onSwipeSuccess={() => handleSwipeSuccess('threshold 90%')}
							placeholder="Slide to threshold 90%"
						/>
					</View>
				</Section>

				{/* Disabled */}
				<Section title="Disabled">
					<View style={commonStyles.column}>
						<Swiper variant="filled" colorScheme="primary" disabled placeholder="Disabled" />
						<Swiper variant="outlined" colorScheme="error" disabled placeholder="Disabled Outlined" />
					</View>
				</Section>

				{/* Custom Gradient */}
				<Section title="Custom Gradient">
					<View style={commonStyles.column}>
						<Swiper
							variant="gradient"
							colorScheme="primary"
							customGradient={{
								colors: ['#FF6B6B', '#FFD93D', '#6BCB77'],
								locations: [0, 0.5, 1],
							}}
							onSwipeSuccess={() => handleSwipeSuccess('custom gradient')}
							placeholder="Slide to custom gradient"
						/>
						<Swiper
							variant="gradient"
							colorScheme="primary"
							customGradient={{
								colors: ['#667eea', '#764ba2'],
								locations: [0, 1],
							}}
							onSwipeSuccess={() => handleSwipeSuccess('purple gradient')}
							placeholder="Slide to purple gradient"
						/>
					</View>
				</Section>

				{/* Use Cases */}
				<Section title="Use Cases">
					<View style={commonStyles.column}>
						{/* 결제 확인 */}
						<Swiper
							variant="gradient"
							colorScheme="primary"
							size="lg"
							rounded="full"
							onSwipeSuccess={() =>
								Alert.alert('Payment', 'Processing payment...')
							}
							placeholder="Slide to Pay"
						/>

						{/* 위험한 작업 */}
						<Swiper
							variant="outlined"
							colorScheme="error"
							size="md"
							rounded="full"
							onSwipeSuccess={() =>
								Alert.alert('Delete', 'Account will be deleted')
							}
							placeholder="Slide to Delete"
						/>

						{/* 잠금 해제 */}
						<Swiper
							variant="filled"
							colorScheme="success"
							size="md"
							rounded="full"
							onSwipeSuccess={() => Alert.alert('Unlocked', 'Welcome back!')}
							placeholder="Slide to Unlock"
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
