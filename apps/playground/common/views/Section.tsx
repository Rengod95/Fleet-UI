import { type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface SectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	sectionBodyStyle?: StyleProp<ViewStyle>;
}

export function Section({
	title,
	description,
	children,
	style,
	sectionBodyStyle,
}: SectionProps) {
	useUnistyles();
	return (
		<View style={[styles.section, style]}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>{title}</Text>
				{description ? (
					<Text style={styles.sectionDescription}>{description}</Text>
				) : null}
			</View>

			<View style={[styles.sectionBody, sectionBodyStyle]}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	section: {
		marginTop: 16,
		backgroundColor: 'transparent',
	},
	sectionHeader: {
		marginBottom: theme.spacing[5],
	},
	sectionTitle: {
		...theme.typography.h5,
		// marginBottom: 4,
	},
	sectionDescription: {
		fontSize: 13,
		color: theme.colors.neutral.text_3,
		lineHeight: 18,
		marginBottom: 8,
	},
	sectionBody: {
		backgroundColor: theme.colors.neutral.content_1,
		borderRadius: theme.rounded.xl,
		padding: theme.spacing[4],
		gap: theme.spacing[4],
	},
}));
