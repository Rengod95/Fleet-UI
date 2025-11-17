import {
	borderRadius,
	fontSize,
	fontWeight,
	lightSchemeColorPalette,
	space,
} from '@fleet-ui/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const meta: Meta = {
	title: 'Design Tokens/Overview',
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

export const Spacing: StoryObj = {
	render: () => (
		<View style={styles.container}>
			<Text style={styles.title}>Spacing Scale</Text>
			<View style={styles.spacingContainer}>
				{Object.entries(space).map(([key, value]) => (
					<View key={key} style={styles.spacingRow}>
						<Text style={styles.label}>{key}</Text>
						<Text style={styles.value}>{value}px</Text>
						<View
							style={[styles.spacingBox, { width: value * 2, height: value }]}
						/>
					</View>
				))}
			</View>
		</View>
	),
};

export const BorderRadius: StoryObj = {
	render: () => (
		<View style={styles.container}>
			<Text style={styles.title}>Border Radius Scale</Text>
			<View style={styles.radiusContainer}>
				{Object.entries(borderRadius).map(([key, value]) => (
					<View key={key} style={styles.radiusItem}>
						<View style={[styles.radiusBox, { borderRadius: value }]} />
						<Text style={styles.label}>{key}</Text>
						<Text style={styles.value}>
							{value === 999 ? 'full' : `${value}px`}
						</Text>
					</View>
				))}
			</View>
		</View>
	),
};

export const Typography: StoryObj = {
	render: () => (
		<View style={styles.container}>
			<Text style={styles.title}>Font Size Scale</Text>
			<View style={styles.typographyContainer}>
				{Object.entries(fontSize).map(([key, value]) => (
					<View key={key} style={styles.typographyRow}>
						<Text style={[styles.sampleText, { fontSize: value }]}>
							The quick brown fox
						</Text>
						<Text style={styles.label}>{key}</Text>
						<Text style={styles.value}>{value}px</Text>
					</View>
				))}
			</View>
		</View>
	),
};

export const Colors: StoryObj = {
	render: () => (
		<View style={styles.container}>
			<Text style={styles.title}>Color Palette (Light)</Text>

			<Text style={styles.subtitle}>Neutral Scale</Text>
			<View style={styles.colorRow}>
				{[...Array(10)].map((_, i) => {
					const key = String(i + 1);
					const color = lightSchemeColorPalette[
						key as keyof typeof lightSchemeColorPalette
					] as string;
					return (
						<View key={key} style={styles.colorItem}>
							<View style={[styles.colorBox, { backgroundColor: color }]} />
							<Text style={styles.colorLabel}>{key}</Text>
						</View>
					);
				})}
			</View>

			<Text style={styles.subtitle}>Accent Scale</Text>
			<View style={styles.colorRow}>
				{Object.entries(lightSchemeColorPalette.accent).map(([key, color]) => (
					<View key={key} style={styles.colorItem}>
						<View style={[styles.colorBox, { backgroundColor: color }]} />
						<Text style={styles.colorLabel}>{key}</Text>
					</View>
				))}
			</View>

			<Text style={styles.subtitle}>Success Scale</Text>
			<View style={styles.colorRow}>
				{Object.entries(lightSchemeColorPalette.success).map(([key, color]) => (
					<View key={key} style={styles.colorItem}>
						<View style={[styles.colorBox, { backgroundColor: color }]} />
						<Text style={styles.colorLabel}>{key}</Text>
					</View>
				))}
			</View>
		</View>
	),
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 24,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '600',
		marginTop: 24,
		marginBottom: 12,
	},
	spacingContainer: {
		gap: 12,
	},
	spacingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	spacingBox: {
		backgroundColor: '#007AFF',
	},
	radiusContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
	},
	radiusItem: {
		alignItems: 'center',
		gap: 8,
	},
	radiusBox: {
		width: 60,
		height: 60,
		backgroundColor: '#007AFF',
	},
	typographyContainer: {
		gap: 16,
	},
	typographyRow: {
		gap: 8,
	},
	sampleText: {
		fontWeight: '400',
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
	},
	value: {
		fontSize: 12,
		color: '#999',
	},
	colorRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	colorItem: {
		alignItems: 'center',
		gap: 4,
	},
	colorBox: {
		width: 60,
		height: 60,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#eee',
	},
	colorLabel: {
		fontSize: 12,
		color: '#666',
	},
});
