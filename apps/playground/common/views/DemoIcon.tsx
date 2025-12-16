import { Text } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface DemoIconProps {
	label: string;
}

export function DemoIcon({ label }: DemoIconProps) {
	useUnistyles();
	return <Text style={styles.icon}>{label}</Text>;
}

const styles = StyleSheet.create((theme) => ({
	icon: {
		fontSize: 16,
		color: theme.colors.neutral.text_1,
	},
}));
