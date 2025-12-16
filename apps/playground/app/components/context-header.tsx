import {
	ContextHeader,
	Icon,
	type ContextHeaderShadow,
	type ContextHeaderSize,
	type ContextHeaderPaddingHorizontal,
} from '@fleet-ui/components';
import { Alert, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';
import { EllipsisIcon, SaveIcon, SearchIcon, SettingsIcon, XIcon } from 'lucide-react-native';

const SIZES: ContextHeaderSize[] = ['sm', 'md', 'lg', 'xl'];
const SHADOWS: ContextHeaderShadow[] = ['none', 'sm', 'md', 'lg'];
const PADDING_HORIZONTALS: ContextHeaderPaddingHorizontal[] = ['none', 'sm', 'md', 'lg'];

export default function ContextHeaderExamplesScreen() {
	const { theme } = useUnistyles();

	const handleBackPress = () => {
		Alert.alert('Back pressed', 'Back button was pressed');
	};

	const handleActionPress = () => {
		Alert.alert('Action pressed', 'Action button was pressed');
	};

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="ContextHeader"
					description="A custom header component for mobile screens that can replace the native navigation stack header. Provides left/center/right layout with size and shadow variants."
				/>

				<Section
					title="Sizes"
					description="Different height and typography sizes."
					sectionBodyStyle={{ padding: 0 }}
				>
					<View style={styles.headerContainer}>
						{SIZES.map((size) => (
							<ContextHeader
								key={size}
								size={size}
								title={`Size: ${size}`}
								onBackPress={handleBackPress}
								style={styles.header}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Padding Horizontal"
					description="Different padding horizontal options."
				>
					<View style={styles.headerContainer}>
						{PADDING_HORIZONTALS.map((paddingHorizontal) => (
							<ContextHeader key={paddingHorizontal} paddingHorizontal={paddingHorizontal} title={`Padding Horizontal: ${paddingHorizontal}`} onBackPress={handleBackPress} style={styles.header} />
						))}
					</View>
				</Section>

				<Section
					title="Shadow Variants"
					description="Elevation presets from none to large."
				>
					<View style={styles.headerContainer}>
						{SHADOWS.map((shadow) => (
							<ContextHeader
								key={shadow}
								shadow={shadow}
								title={`Shadow: ${shadow}`}
								onBackPress={handleBackPress}
								style={styles.headerWithMargin}
							/>
						))}
					</View>
				</Section>

				<Section
					title="Title Alignment"
					description="Center (default with back button) vs left alignment."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="Center Aligned (default)"
							titleAlign="center"
							onBackPress={handleBackPress}
							style={styles.header}
						/>
						<ContextHeader
							title="Left Aligned"
							titleAlign="left"
							onBackPress={handleBackPress}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Without Back Button"
					description="When showBackButton is false, title auto-aligns to left."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="No Back Button"
							showBackButton={false}
							style={styles.header}
						/>
						<ContextHeader
							title="With Right Action"
							showBackButton={false}
							right={<Icon icon={SettingsIcon} />}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Custom Left Content"
					description="Replace back button with custom content."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="Custom Left"
							left={<Icon icon={XIcon} />}
							style={styles.header}
						/>
						<ContextHeader
							title="Empty Left (left=null)"
							left={null}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Right Content"
					description="Add action icons or buttons to the right area."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="Single Action"
							onBackPress={handleBackPress}
							right={<Icon icon={EllipsisIcon} />}
							style={styles.header}
						/>
						<ContextHeader
							title="Multiple Actions"
							onBackPress={handleBackPress}
							right={
								<View style={styles.rightActions}>
									<Icon icon={SearchIcon} />
									<Icon icon={EllipsisIcon} />
								</View>
							}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Background Color"
					description="Custom background color override."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="Primary Background"
							onBackPress={handleBackPress}
							backgroundColor={theme.colors.primary.content_2}
							style={styles.header}
						/>
						<ContextHeader
							title="Neutral Background"
							onBackPress={handleBackPress}
							backgroundColor={theme.colors.neutral.content_2}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Long Title"
					description="Title truncation with ellipsis."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="This is a very long title that should be truncated with ellipsis when it exceeds the available space"
							onBackPress={handleBackPress}
							right={<Icon icon={EllipsisIcon} />}
							style={styles.header}
						/>
					</View>
				</Section>

				<Section
					title="Combined Example"
					description="Full featured header with all options."
				>
					<View style={styles.headerContainer}>
						<ContextHeader
							title="Profile Settings"
							size="lg"
							shadow="md"
							onBackPress={handleBackPress}
							right={
								<View style={styles.rightActions}>
									<Icon icon={SaveIcon} />
								</View>
							}
							style={styles.header}
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	headerContainer: {
		gap: theme.spacing[4],
	},
	header: {
		// borderWidth: 1,
		// borderColor: theme.colors.neutral.border_subtle,
		borderRadius: theme.rounded.md,
	},
	headerWithMargin: {
		borderWidth: 1,
		borderColor: theme.colors.neutral.border_subtle,
		borderRadius: theme.rounded.md,
		marginBottom: theme.spacing[2],
	},
	rightActions: {
		flexDirection: 'row',
		gap: theme.spacing[2],
	},
}));
