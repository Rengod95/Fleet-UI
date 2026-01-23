import { Button, Icon, State, type StateVariant } from '@fleet-ui/components';
import { Rocket, Sparkles, Zap } from 'lucide-react-native';
import { Image, ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Enum Props 상수화
const VARIANTS: StateVariant[] = [
	'success',
	'error',
	'warning',
	'info',
	'neutral',
	'ghost',
];

export default function StateExamplesScreen() {
	const { theme } = useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="State"
					description="A page component that visually shows the result of a specific task. It displays statuses like success, error, warning, etc. and provides various messages and actions."
				/>

				<Section
					title="Overview"
					value="overview"
					description="The most basic State example."
				>
					<State
						variant="success"
						title="Task Completed!"
						description="Your request has been successfully processed."
						button={
							<State.Button onPress={() => console.log('Check')}>
								Check
							</State.Button>
						}
					/>
				</Section>

				<Section
					title="Variants"
					description="Set the state type with the variant prop. Each variant has a unique icon and color."
				>
					<View style={commonStyles.column}>
						<Text style={commonStyles.label}>The Variant prop is control the icon, background visual style. The content text is samples.</Text>
					{VARIANTS.map((variant) => (
						<View key={variant} style={styles.variantItem}>
							<Text style={styles.variantLabel}>{variant}</Text>
							<State
								variant={variant}
								title={getVariantTitle(variant)}
								description={getVariantDescription(variant)}
								button={
									<State.Button >Confirm</State.Button>
								}
								/>
						</View>
						))}
						</View>
				</Section>

				{/* With Button */}
				<Section
					title="State.Button"
					description="Use State.Button to add an action button. But Normal 'Button' component is recommended for most cases."
				>
					<State
						variant="error"
						title="Connection Failed"
						description="Please check your network connection and try again."
						button={
							<State.Button onPress={() => console.log('Retry')}>
								Retry
							</State.Button>
						}
					/>
				</Section>

				{/* Custom Asset */}
				<Section
					title="Custom Asset"
					description="Use the asset prop to display custom icons or images."
				>
					<State
						variant="neutral"
						asset={
							<View style={styles.customIconFrame}>
								<Icon icon={Rocket} size="_2xl" colorScheme="primary" />
							</View>
						}
						title="New Feature Released"
						description="Try the new version that is faster and more powerful."
						button={
							<State.Button onPress={() => console.log('Start')}>
								Start
							</State.Button>
						}
					/>

					<State
						variant="neutral"
						asset={
							<View style={styles.customIconFrame}>
								<Icon icon={Sparkles} size="_2xl" colorScheme="warning" />
							</View>
						}
						title="Special Event in Progress"
						description="You can get special benefits by participating now."
					/>

					<State
						variant="neutral"
						asset={
							<Image
								source={{ uri: 'https://picsum.photos/80/80' }}
								style={styles.customImage}
							/>
						}
						title="Profile Updated"
						description="The profile picture has been successfully changed."
					/>
				</Section>

				{/* Ghost Variant */}
				<Section
					title="Ghost Variant"
					description="The ghost variant only displays text without an icon frame."
				>
					<State
						variant="ghost"
						title="No Data"
						description="There is no registered item yet. Please add a new item."
						button={
							<State.Button onPress={() => console.log('Add')}>
								Add Item
							</State.Button>
						}
					/>
				</Section>
				{/* Bottom Spacer */}
				<View style={{ height: 40 }} />
			</View>
		</ScrollView>
	);
}

// Helper functions
function getVariantTitle(variant: StateVariant): string {
	const titles: Record<StateVariant, string> = {
		success: 'Success',
		error: 'Error',
		warning: 'Warning',
		info: 'Info',
		neutral: 'Neutral',
		ghost: 'Neutral (Ghost)',
	};
	return titles[variant];
}

function getVariantDescription(variant: StateVariant): string {
	const descriptions: Record<StateVariant, string> = {
		success: 'The task has been successfully completed.',
		error: 'An error has occurred. Please try again later.',
		warning: 'A situation that requires attention.',
		info: 'Information to note.',
		neutral: 'A general notification message.',
		ghost: 'Text only display without icon.',
	};
	return descriptions[variant];
}

const styles = StyleSheet.create((theme) => ({
	variantItem: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.border_subtle,
		paddingBottom: theme.spacing[4],
	},
	variantLabel: {
		...theme.typography.caption1Strong,
		color: theme.colors.neutral.text_4,
		textTransform: 'uppercase',
		marginBottom: theme.spacing[2],
		paddingHorizontal: theme.spacing[4],
	},
	customIconFrame: {
		width: 64,
		height: 64,
		borderRadius: theme.rounded.xl,
		backgroundColor: theme.colors.neutral.content_2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	customImage: {
		width: 80,
		height: 80,
		borderRadius: theme.rounded.xl,
	},
	useCaseContainer: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.border_subtle,
		paddingBottom: theme.spacing[4],
	},
	useCaseLabel: {
		...theme.typography.body3Strong,
		color: theme.colors.neutral.text_3,
		marginBottom: theme.spacing[2],
		paddingHorizontal: theme.spacing[4],
	},
}));
