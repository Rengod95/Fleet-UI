import { Icon } from '@fleet-ui/components';
import { Heart, Star } from 'lucide-react-native';
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
] as const;

export default function IconScreen() {
	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Icon"
					description="Wrapped Lucide icons with Fleet UI styles. It supports size, color scheme, and accessibility labels."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Basic Icon example (primary + lg)."
				>
					<View style={commonStyles.row}>
						<Icon
							icon={Star}
							colorScheme="primary"
							size="lg"
							accessibilityLabel="Star primary lg"
						/>
					</View>
				</Section>

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
			</View>
		</ScrollView>
	);
}
