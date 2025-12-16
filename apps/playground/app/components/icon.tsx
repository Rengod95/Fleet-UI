import { Icon } from '@fleet-ui/components';
import { AlertCircle, Check, Heart, Info, Star, X } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { commonStyles, PageHeader, Section } from '../../common/views';

const SIZES = [
	'_2xs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'_2xl',
	'_3xl',
	'_4xl',
] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
	'secondary',
] as const;

export default function IconScreen() {
	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Icon"
					description="Lucide 아이콘을 Fleet UI 스타일로 래핑한 컴포넌트"
				/>

				{/* Size 변형 */}
				<Section title="Sizes (_2xs ~ _4xl)">
					<View style={[commonStyles.row, { flexWrap: 'wrap', gap: 8 }]}>
						{SIZES.map((size) => (
							<Icon
								key={size}
								icon={Heart}
								size={size}
								accessibilityLabel={`Heart ${size}`}
							/>
						))}
					</View>
				</Section>

				{/* ColorScheme 변형 */}
				<Section title="Color Schemes">
					<View style={[commonStyles.row, { flexWrap: 'wrap', gap: 8 }]}>
						{COLOR_SCHEMES.map((scheme) => (
							<Icon
								key={scheme}
								icon={Star}
								colorScheme={scheme}
								size="lg"
								accessibilityLabel={`Star ${scheme}`}
							/>
						))}
					</View>
				</Section>

				{/* 다양한 아이콘 예시 */}
				<Section title="Icon Variety">
					<View style={[commonStyles.grid, { gap: 16 }]}>
						<Icon icon={Heart} accessibilityLabel="Heart" />
						<Icon icon={Check} accessibilityLabel="Check" />
						<Icon icon={X} accessibilityLabel="Close" />
						<Icon icon={AlertCircle} accessibilityLabel="Alert" />
						<Icon icon={Info} accessibilityLabel="Info" />
						<Icon icon={Star} accessibilityLabel="Star" />
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
