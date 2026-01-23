import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	ContextHeader,
	Divider,
	Icon,
	IconButton,
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
	Radio,
	RadioCard,
	RadioCardGroup,
	Section,
	Slider,
	Switch,
	Typo,
} from '@fleet-ui/components';
import { router } from 'expo-router';
import {
	Bell,
	BellOff,
	ChevronLeft,
	ChevronRight,
	Globe,
	HelpCircle,
	Info,
	Lock,
	MailIcon,
	Moon,
	Shield,
	Smartphone,
	Sun,
	Type,
	User,
	Volume2,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// ============================================
// Types
// ============================================

type ThemeMode = 'light' | 'dark' | 'system';
type Language = 'ko' | 'en' | 'ja';

interface SettingsState {
	// Notifications
	pushEnabled: boolean;
	emailEnabled: boolean;
	soundEnabled: boolean;
	vibrationEnabled: boolean;

	// Appearance
	theme: ThemeMode;
	fontSize: number;

	// Language
	language: Language;

	// Privacy
	biometricEnabled: boolean;
	analyticsEnabled: boolean;
}

// ============================================
// Constants
// ============================================

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
	{ value: 'ko', label: '한국어', flag: '🇰🇷' },
	{ value: 'en', label: 'English', flag: '🇺🇸' },
	{ value: 'ja', label: '日本語', flag: '🇯🇵' },
];

// ============================================
// Main Component
// ============================================

export default function SettingsScreen() {
	const { theme } = useUnistyles();

	const [settings, setSettings] = useState<SettingsState>({
		pushEnabled: true,
		emailEnabled: false,
		soundEnabled: true,
		vibrationEnabled: true,
		theme: 'system',
		fontSize: 16,
		language: 'ko',
		biometricEnabled: false,
		analyticsEnabled: true,
	});

	// ============================================
	// Handlers
	// ============================================

	const updateSetting = <K extends keyof SettingsState>(
		key: K,
		value: SettingsState[K],
	) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleBack = () => {
		router.back();
	};

	// ============================================
	// Render
	// ============================================

	return (
		<View style={styles.container}>
			{/* Header */}
			<ContextHeader
				title="Settings"
				size="lg"
				style={styles.header}
				left={
					<IconButton
						size="xs"
						variant="flat"
						icon={<ChevronLeft size={20} strokeWidth={2} />}
						onPress={handleBack}
					/>
				}
			/>

			{/* Content */}
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				{/* ============================================ */}
				{/* Notifications Section */}
				{/* ============================================ */}
				<Section
					title="Notifications"
					// subtitle="Manage how you receive notifications"
					size="lg"
					headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5]}}
					contentStyle={{paddingHorizontal: theme.spacing[2]}}
				>
					<View style={styles.sectionContent}>
						{/* Push Notifications */}
						<Item variant="flat" size="md">
							<ItemMedia>
								<Icon icon={Bell} size="md" colorScheme="neutral" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Push Notifications</ItemTitle>
								<ItemDescription>
									Receive push notifications on your device
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.pushEnabled}
									onValueChange={(value) => updateSetting('pushEnabled', value)}
									variant="flat"
									size="md"
								/>
							</ItemActions>
						</Item>
						<View style={{paddingLeft:24, marginBottom: theme.spacing[4]}}>
						<Item variant="flat" size="md" disabled={!settings.pushEnabled}>
							<ItemMedia>
								<Icon
									icon={Volume2}
									size="md"
									colorScheme={settings.pushEnabled ? 'neutral' : 'neutral'}
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Sound</ItemTitle>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.soundEnabled}
									onValueChange={(value) =>
										updateSetting('soundEnabled', value)
									}
									variant="flat"
									size="sm"
									disabled={!settings.pushEnabled}
								/>
							</ItemActions>
						</Item>

						{/* Vibration */}
						<Item variant="flat" size="md" disabled={!settings.pushEnabled}>
							<ItemMedia>
								<Icon icon={Smartphone} size="md" colorScheme="neutral" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Vibration</ItemTitle>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.vibrationEnabled}
									onValueChange={(value) =>
										updateSetting('vibrationEnabled', value)
									}
									variant="filled"
									size="sm"
									disabled={!settings.pushEnabled}
								/>
							</ItemActions>
						</Item>
							</View>

						{/* Email Notifications */}
						<Item variant="flat" size="md">
							<ItemMedia>
								<Icon icon={MailIcon} size="md" colorScheme="neutral" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Email Notifications</ItemTitle>
								<ItemDescription>
									Receive email updates and newsletters
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.emailEnabled}
									onValueChange={(value) =>
										updateSetting('emailEnabled', value)
									}
									variant="flat"
									size="md"
								/>
							</ItemActions>
						</Item>
					</View>
				</Section>

				<Divider variant="thick" size="md" />

				{/* ============================================ */}
				{/* Appearance Section */}
				{/* ============================================ */}
				<Section
					title="Appearance"
					subtitle="Customize how the app looks"
					size="lg"
					headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5]}}
					contentStyle={{paddingHorizontal: theme.spacing[2]}}
				>
					<View style={styles.sectionContent}>
						{/* Theme Selection with RadioCard */}
						<View style={styles.subsection}>
							<Typo variant="body3" style={styles.subsectionTitle}>
								Theme
							</Typo>
							<RadioCardGroup
								value={settings.theme}
								onValueChange={(value) =>
									updateSetting('theme', value as ThemeMode)
								}
								gap="sm"
							>
								<RadioCard
									value="light"
									title="Light"
									description="Always use light mode"
									media={<Icon icon={Sun} size="md" colorScheme="warning" />}
									variant="flat"
									size="md"
									indicatorPosition="end"
								/>
								<RadioCard
									value="dark"
									title="Dark"
									description="Always use dark mode"
									media={<Icon icon={Moon} size="md" colorScheme="info" />}
									variant="flat"
									size="md"
									indicatorPosition="end"
								/>
								<RadioCard
									value="system"
									title="System"
									description="Follow system settings"
									media={
										<Icon icon={Smartphone} size="md" colorScheme="neutral" />
									}
									variant="flat"
									size="md"
									indicatorPosition="end"
								/>
							</RadioCardGroup>
						</View>


						{/* Font Size Slider */}
						<View style={[styles.subsection,{paddingHorizontal: theme.spacing[6], paddingVertical: theme.spacing[4]}]}>
						    
							<View style={styles.sliderHeader}>
								<Typo variant="body3" style={styles.subsectionTitle}>
									Font Size
								</Typo>
								<Typo variant="body3" style={styles.sliderValue}>
									{settings.fontSize}px
								</Typo>
							</View>
							<Slider
								defaultValue={[settings.fontSize]}
								onValueChange={(value) => updateSetting('fontSize', value[0])}
								min={12}
								max={24}
								step={1}
								size="md"
								trackVariant="flat"
								thumbVariant="circle"
								colorScheme="neutral"
							/>
							<View style={styles.sliderLabels}>
								<Typo variant="caption1" style={styles.sliderMinMax}>
									Small
								</Typo>
								<Typo variant="caption1" style={styles.sliderMinMax}>
									Large
								</Typo>
							</View>
						</View>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Language Section */}
				{/* ============================================ */}
				<Section
					title="Language"
					subtitle="Select your preferred language"
					size="lg"
					headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5]}}
					contentStyle={{paddingHorizontal: theme.spacing[2]}}
				>
					<View style={styles.sectionContent}>
						{LANGUAGES.map((lang) => (
							<Pressable
								key={lang.value}
								onPress={() => updateSetting('language', lang.value)}
							>
								<Item variant="flat" size="md">
									<ItemMedia>
										<Typo variant="h4">{lang.flag}</Typo>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{lang.label}</ItemTitle>
									</ItemContent>
									<ItemActions>
										<Radio
											selected={settings.language === lang.value}
											onSelect={() => updateSetting('language', lang.value)}
											variant="filled"
											colorScheme="primary"
										/>
									</ItemActions>
								</Item>
							</Pressable>
						))}
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Privacy & Security Section */}
				{/* ============================================ */}
				<Section
					title="Privacy & Security"
					// subtitle="Manage your privacy settings"
					size="lg"
					headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5]}}
					contentStyle={{paddingHorizontal: theme.spacing[2]}}
				>
					<View style={styles.sectionContent}>
						{/* Biometric Login */}
						<Item variant="flat" size="md">
							<ItemMedia>
								<Icon icon={Lock} size="md" colorScheme="neutral" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Biometric Login</ItemTitle>
								<ItemDescription>
									Use Face ID or fingerprint to login
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.biometricEnabled}
									onValueChange={(value) =>
										updateSetting('biometricEnabled', value)
									}
									variant="flat"
									size="md"
								/>
							</ItemActions>
						</Item>

						{/* Analytics */}
						<Item variant="flat" size="md">
								<ItemMedia>
								<Icon icon={Shield} size="md" colorScheme="neutral" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Analytics</ItemTitle>
								<ItemDescription>
									Help us improve by sharing usage data
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Switch
									checked={settings.analyticsEnabled}
									onValueChange={(value) =>
										updateSetting('analyticsEnabled', value)
									}
									variant="flat"
									size="md"
								/>
							</ItemActions>
						</Item>
					</View>
				</Section>


				{/* ============================================ */}
				{/* Help & Support Section (Accordion) */}
				{/* ============================================ */}
				<Section title="Help & Support" size="md" headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5], backgroundColor: theme.colors.neutral.content_2}} contentStyle={{paddingHorizontal: theme.spacing[0], backgroundColor: theme.colors.neutral.content_2}}>
					<View style={[styles.sectionContent, {paddingHorizontal: theme.spacing[0]}]}>
						<Accordion type="multiple" collapsible={true} variant="flat" gap="sm" rounded='none'>
							<AccordionItem value="faq">
								<AccordionHeader
									leftIcon={
										<Icon icon={HelpCircle} size="sm" colorScheme="neutral" />
									}
								>
									Frequently Asked Questions
								</AccordionHeader>
								<AccordionContent>
									<View style={styles.faqContent}>
										<View style={styles.faqItem}>
											<Typo variant="body3Strong">
												How do I reset my password?
											</Typo>
											<Typo variant="body3" style={styles.faqAnswer}>
												Go to Profile → Security → Change Password to reset
												your password.
											</Typo>
										</View>
										<View style={styles.faqItem}>
											<Typo variant="body3Strong">
												How do I delete my account?
											</Typo>
											<Typo variant="body3" style={styles.faqAnswer}>
												Contact support to request account deletion. This action
												is irreversible.
											</Typo>
										</View>
									</View>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="about">
								<AccordionHeader
									leftIcon={
										<Icon icon={Info} size="sm" colorScheme="neutral" />
									}
								>
									About
								</AccordionHeader>
								<AccordionContent>
									<View style={styles.aboutContent}>
										<View style={styles.aboutRow}>
											<Typo variant="body3">Version</Typo>
											<Typo variant="body3" style={styles.aboutValue}>
												1.0.0
											</Typo>
										</View>
										<View style={styles.aboutRow}>
											<Typo variant="body3">Build</Typo>
											<Typo variant="body3" style={styles.aboutValue}>
												2024.12.09
											</Typo>
										</View>
									</View>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</View>
				</Section>

				{/* ============================================ */}
				{/* Navigation Items */}
				{/* ============================================ */}
				<Section title="More" size="md" headerStyle={{paddingTop: theme.spacing[6], paddingHorizontal: theme.spacing[5]}} contentStyle={{paddingHorizontal: theme.spacing[2]}}>
					<View style={styles.sectionContent}>
						<Pressable>
							<Item variant="flat" size="md">
								<ItemMedia>
									<Icon icon={User} size="md" colorScheme="neutral" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Account Settings</ItemTitle>
								</ItemContent>
								<ItemActions>
									<Icon icon={ChevronRight} size="sm" colorScheme="neutral" />
								</ItemActions>
							</Item>
						</Pressable>

						<Pressable>
							<Item variant="flat" size="md">
								<ItemMedia>
									<Icon icon={Globe} size="md" colorScheme="neutral" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Terms of Service</ItemTitle>
								</ItemContent>
								<ItemActions>
									<Icon icon={ChevronRight} size="sm" colorScheme="neutral" />
								</ItemActions>
							</Item>
						</Pressable>

						<Pressable>
							<Item variant="flat" size="md">
								<ItemMedia>
									<Icon icon={Shield} size="md" colorScheme="neutral" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Privacy Policy</ItemTitle>
								</ItemContent>
								<ItemActions>
									<Icon icon={ChevronRight} size="sm" colorScheme="neutral" />
								</ItemActions>
							</Item>
						</Pressable>
					</View>
				</Section>

				{/* Bottom spacing */}
				<View style={styles.bottomSpacer} />
			</ScrollView>
		</View>
	);
}

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.neutral.content_1,
		paddingTop: rt.insets.top,
	},

	// Header
	header: {
		paddingHorizontal: 16,
	},

	// Scroll
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: rt.insets.bottom + 24,
		// paddingHorizontal: theme.spacing[6],
	},

	// Section
	sectionContent: {
		gap: theme.spacing[1],
		paddingBottom: theme.spacing[6],
	},

	// Subsection
	subsection: {
		paddingVertical: theme.spacing[3],
		paddingHorizontal: theme.spacing[4],
		gap: theme.spacing[4],
	},
	subsectionTitle: {
		color: theme.colors.neutral.text_3,
		marginBottom: theme.spacing[2],
	},

	// Slider
	sliderHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: theme.spacing[3],
		alignItems: 'center',
		paddingHorizontal: theme.spacing[1],
		// marginBottom: theme.spacing[2],
	},
	sliderLabelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	sliderValue: {
		fontWeight: theme.text.fontWeight.semibold,
	},
	sliderLabels: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing[2],
		paddingHorizontal: theme.spacing[2],
	},
	sliderMinMax: {
		color: theme.colors.neutral.text_4,
	},

	// FAQ
	faqContent: {
		gap: theme.spacing[4],
		paddingVertical: theme.spacing[2],
	},
	faqItem: {
		gap: theme.spacing[1],
	},
	faqAnswer: {
		color: theme.colors.neutral.text_3,
		lineHeight: 20,
	},

	// About
	aboutContent: {
		gap: theme.spacing[3],
		paddingVertical: theme.spacing[2],
	},
	aboutRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	aboutValue: {
		color: theme.colors.neutral.text_3,
	},

	// Bottom
	bottomSpacer: {
		height: 24,
	},
}));
