import {
	Button,
	Chip,
	ContextHeader,
	Divider,
	Icon,
	IconButton,
	Input,
	Section,
	Typo,
} from '@fleet-ui/components';
import { useToast } from '@fleet-ui/components';
import { router } from 'expo-router';
import {
	AtSign,
	Calendar,
	ChevronLeft,
	CreditCard,
	DollarSign,
	Eye,
	EyeOff,
	Globe,
	Hash,
	Link,
	Lock,
	Mail,
	MapPin,
	Phone,
	Search,
	Send,
	User,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// ============================================
// Types
// ============================================

interface ContactForm {
	name: string;
	email: string;
	phone: string;
	message: string;
}

interface PaymentForm {
	cardNumber: string;
	expiry: string;
	cvv: string;
	amount: string;
}

interface ProfileForm {
	username: string;
	bio: string;
	website: string;
	location: string;
}

// ============================================
// Constants
// ============================================

const VARIANTS = ['filled', 'flat', 'bordered', 'underlined', 'faded'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

// ============================================
// Main Component
// ============================================

export default function FormScreen() {
	const { theme } = useUnistyles();
	const toast = useToast();

	// Refs
	const emailRef = useRef<TextInput>(null);
	const phoneRef = useRef<TextInput>(null);
	const messageRef = useRef<TextInput>(null);

	// Form States
	const [contactForm, setContactForm] = useState<ContactForm>({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const [paymentForm, setPaymentForm] = useState<PaymentForm>({
		cardNumber: '',
		expiry: '',
		cvv: '',
		amount: '',
	});

	const [profileForm, setProfileForm] = useState<ProfileForm>({
		username: '',
		bio: '',
		website: '',
		location: '',
	});

	// UI States
	const [showPassword, setShowPassword] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedVariant, setSelectedVariant] = useState<
		(typeof VARIANTS)[number]
	>('bordered');

	// Validation
	const [errors, setErrors] = useState<Record<string, string>>({});

	// ============================================
	// Handlers
	// ============================================

	const updateContactForm = (key: keyof ContactForm, value: string) => {
		setContactForm((prev) => ({ ...prev, [key]: value }));
		if (errors[key]) {
			setErrors((prev) => ({ ...prev, [key]: '' }));
		}
	};

	const updatePaymentForm = (key: keyof PaymentForm, value: string) => {
		setPaymentForm((prev) => ({ ...prev, [key]: value }));
	};

	const updateProfileForm = (key: keyof ProfileForm, value: string) => {
		setProfileForm((prev) => ({ ...prev, [key]: value }));
	};

	const validateContactForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!contactForm.name.trim()) {
			newErrors.name = 'Name is required';
		}
		if (!contactForm.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
			newErrors.email = 'Invalid email format';
		}
		if (contactForm.phone && !/^\d{10,}$/.test(contactForm.phone.replace(/\D/g, ''))) {
			newErrors.phone = 'Invalid phone number';
		}
		if (!contactForm.message.trim()) {
			newErrors.message = 'Message is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmitContact = () => {
		if (validateContactForm()) {
			toast.show({
				title: 'Message Sent!',
				description: 'We will get back to you soon.',
				colorScheme: 'success',
			});
			setContactForm({ name: '', email: '', phone: '', message: '' });
		} else {
			toast.show({
				title: 'Validation Error',
				description: 'Please check the form fields',
				colorScheme: 'error',
			});
		}
	};

	const formatCardNumber = (value: string): string => {
		const digits = value.replace(/\D/g, '');
		const groups = digits.match(/.{1,4}/g);
		return groups ? groups.join(' ').slice(0, 19) : '';
	};

	const formatExpiry = (value: string): string => {
		const digits = value.replace(/\D/g, '');
		if (digits.length >= 2) {
			return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
		}
		return digits;
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
				title="Forms & Inputs"
				size="lg"
				style={styles.header}
				left={
					<IconButton
						size="xs"
						variant="ghost"
						icon={<Icon icon={ChevronLeft} size="xl" colorScheme="neutral" />}
						onPress={handleBack}
					/>
				}
			/>

			{/* Content */}
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				{/* ============================================ */}
				{/* Variant Showcase */}
				{/* ============================================ */}
				<Section
					title="Input Variants"
					subtitle="Different visual styles for various contexts"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[5],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					{/* Variant Selector */}
					<View style={styles.variantSelector}>
						{VARIANTS.map((v) => (
							<Chip
								key={v}
								size="md"
								variant={selectedVariant === v ? 'filled' : 'flat'}
								colorScheme={selectedVariant === v ? 'primary' : 'neutral'}
								onPress={() => setSelectedVariant(v)}
							>
								{v}
							</Chip>
						))}
					</View>

					{/* Demo Input */}
					<View style={styles.demoBox}>
						<Input
							label="Demo Input"
							placeholder={`This is ${selectedVariant} variant`}
							variant={selectedVariant}
							size="lg"
							description={`variant="${selectedVariant}"`}
						/>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Size Comparison */}
				{/* ============================================ */}
				<Section
					title="Input Sizes"
					subtitle="Available size options (xs to xl)"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<View style={styles.sizesContainer}>
						{SIZES.map((s) => (
							<View key={s} style={styles.sizeRow}>
								<Typo variant="caption1" style={styles.sizeLabel}>
									{s}
								</Typo>
								<View style={styles.sizeInput}>
									<Input placeholder={`Size ${s}`} size={s} variant="bordered" />
								</View>
							</View>
						))}
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Search Input */}
				{/* ============================================ */}
				<Section
					title="Search Input"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<Input
						placeholder="Search anything..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						variant="flat"
						size="lg"
						radius="full"
						startContent={
							<Icon icon={Search} size="sm" colorScheme="neutral" />
						}
						isClearable
					/>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Contact Form */}
				{/* ============================================ */}
				<Section
					title="Contact Form"
					subtitle="Complete form with validation"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<View style={styles.formGroup}>
						<Input
							label="Full Name"
							placeholder="John Doe"
							value={contactForm.name}
							onChangeText={(text) => updateContactForm('name', text)}
							variant="underlined"
							size="lg"
							startContent={
								<Icon icon={User} size="sm" colorScheme="neutral" />
							}
							isInvalid={!!errors.name}
							errorMessage={errors.name}
							returnKeyType="next"
							onSubmitEditing={() => emailRef.current?.focus()}
						/>

						<Input
							ref={emailRef}
							label="Email Address"
							placeholder="john@example.com"
							value={contactForm.email}
							onChangeText={(text) => updateContactForm('email', text)}
							variant="underlined"
							size="lg"
							keyboardType="email-address"
							autoCapitalize="none"
							startContent={
								<Icon icon={Mail} size="sm" colorScheme="neutral" />
							}
							isInvalid={!!errors.email}
							errorMessage={errors.email}
							returnKeyType="next"
							onSubmitEditing={() => phoneRef.current?.focus()}
						/>

						<Input
							ref={phoneRef}
							label="Phone Number"
							placeholder="+1 (555) 000-0000"
							value={contactForm.phone}
							onChangeText={(text) => updateContactForm('phone', text)}
							variant="underlined"
							size="lg"
							keyboardType="phone-pad"
							startContent={
								<Icon icon={Phone} size="sm" colorScheme="neutral" />
							}
							isInvalid={!!errors.phone}
							errorMessage={errors.phone}
							description="Optional"
							returnKeyType="next"
							onSubmitEditing={() => messageRef.current?.focus()}
						/>

						<Input
							ref={messageRef}
							label="Message"
							placeholder="How can we help you?"
							value={contactForm.message}
							onChangeText={(text) => updateContactForm('message', text)}
							variant="underlined"
							size="lg"
							multiline
							numberOfLines={4}
							isInvalid={!!errors.message}
							errorMessage={errors.message}
						/>

						<Button
							variant="filled"
							colorScheme="neutral"
							size="xl"
							onPress={handleSubmitContact}
							rightIcon={<Icon icon={Send} size="sm" color="white" />}
							fullWidth
						>
							Send Message
						</Button>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Payment Form */}
				{/* ============================================ */}
				<Section
					title="Payment Form"
					subtitle="Formatted inputs for card details"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<View style={styles.formGroup}>
						<Input
							label="Card Number"
							placeholder="1234 5678 9012 3456"
							value={paymentForm.cardNumber}
							onChangeText={(text) =>
								updatePaymentForm('cardNumber', formatCardNumber(text))
							}
							variant="bordered"
							size="lg"
							keyboardType="number-pad"
							maxLength={19}
							startContent={
								<Icon icon={CreditCard} size="sm" colorScheme="neutral" />
							}
						/>

						<View style={styles.rowInputs}>
							<View style={styles.halfInput}>
								<Input
									label="Expiry Date"
									placeholder="MM/YY"
									value={paymentForm.expiry}
									onChangeText={(text) =>
										updatePaymentForm('expiry', formatExpiry(text))
									}
									variant="bordered"
									size="lg"
									keyboardType="number-pad"
									maxLength={5}
									startContent={
										<Icon icon={Calendar} size="sm" colorScheme="neutral" />
									}
								/>
							</View>
							<View style={styles.halfInput}>
								<Input
									label="CVV"
									placeholder="123"
									value={paymentForm.cvv}
									onChangeText={(text) =>
										updatePaymentForm('cvv', text.replace(/\D/g, ''))
									}
									variant="bordered"
									size="lg"
									keyboardType="number-pad"
									maxLength={4}
									secureTextEntry
									startContent={
										<Icon icon={Lock} size="sm" colorScheme="neutral" />
									}
								/>
							</View>
						</View>

						<Input
							label="Amount"
							placeholder="0.00"
							value={paymentForm.amount}
							onChangeText={(text) =>
								updatePaymentForm('amount', text.replace(/[^\d.]/g, ''))
							}
							variant="bordered"
							size="lg"
							keyboardType="decimal-pad"
							startContent={
								<Icon icon={DollarSign} size="sm" colorScheme="neutral" />
							}
						/>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Profile Form */}
				{/* ============================================ */}
				<Section
					title="Profile Form"
					subtitle="Various input types with icons"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<View style={styles.formGroup}>
						<Input
							label="Username"
							placeholder="johndoe"
							value={profileForm.username}
							onChangeText={(text) => updateProfileForm('username', text)}
							variant="faded"
							size="lg"
							autoCapitalize="none"
							startContent={
								<Icon icon={AtSign} size="sm" colorScheme="neutral" />
							}
							description="Your unique username"
						/>

						<Input
							label="Bio"
							placeholder="Tell us about yourself..."
							value={profileForm.bio}
							onChangeText={(text) => updateProfileForm('bio', text)}
							variant="faded"
							size="lg"
							multiline
							numberOfLines={3}
							description="Max 200 characters"
						/>

						<Input
							label="Website"
							placeholder="https://example.com"
							value={profileForm.website}
							onChangeText={(text) => updateProfileForm('website', text)}
							variant="faded"
							size="lg"
							keyboardType="url"
							autoCapitalize="none"
							startContent={
								<Icon icon={Globe} size="sm" colorScheme="neutral" />
							}
						/>

						<Input
							label="Location"
							placeholder="San Francisco, CA"
							value={profileForm.location}
							onChangeText={(text) => updateProfileForm('location', text)}
							variant="faded"
							size="lg"
							startContent={
								<Icon icon={MapPin} size="sm" colorScheme="neutral" />
							}
						/>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Special States */}
				{/* ============================================ */}
				<Section
					title="Input States"
					subtitle="Disabled, Read-only, Error states"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<View style={styles.formGroup}>
						<Input
							label="Disabled Input"
							placeholder="Cannot type here"
							value="Disabled value"
							variant="bordered"
							size="lg"
							isDisabled
							startContent={
								<Icon icon={Lock} size="sm" colorScheme="neutral" />
							}
						/>

						<Input
							label="Read-only Input"
							placeholder="Cannot edit"
							value="Read-only value"
							variant="bordered"
							size="lg"
							isReadOnly
							startContent={
								<Icon icon={Hash} size="sm" colorScheme="neutral" />
							}
						/>

						<Input
							label="Error State"
							placeholder="Enter something"
							value="Invalid input"
							variant="bordered"
							size="lg"
							isInvalid
							errorMessage="This field has an error"
							startContent={
								<Icon icon={Mail} size="sm" colorScheme="error" />
							}
						/>

						<Input
							label="With Description"
							placeholder="Enter value"
							variant="bordered"
							size="lg"
							description="This is a helpful description for the input field"
							startContent={
								<Icon icon={Link} size="sm" colorScheme="neutral" />
							}
						/>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Password Input */}
				{/* ============================================ */}
				<Section
					title="Password Input"
					subtitle="Toggle visibility with end content"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[5] }}
				>
					<Input
						label="Password"
						placeholder="Enter your password"
						variant="bordered"
						size="lg"
						secureTextEntry={!showPassword}
						startContent={<Icon icon={Lock} size="sm" colorScheme="neutral" />}
						endContent={
							<Pressable onPress={() => setShowPassword(!showPassword)}>
								<Icon
									icon={showPassword ? EyeOff : Eye}
									size="sm"
									colorScheme="neutral"
								/>
							</Pressable>
						}
						isClearable={false}
					/>
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
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.content_3,
	},

	// Scroll
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: rt.insets.bottom + 24,
	},

	// Variant Selector
	variantSelector: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[2],
		marginBottom: theme.spacing[4],
	},

	// Demo Box
	demoBox: {
		padding: theme.spacing[4],
		backgroundColor: theme.colors.neutral.content_2,
		borderRadius: theme.rounded.lg,
	},

	// Sizes
	sizesContainer: {
		gap: theme.spacing[3],
	},
	sizeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[3],
	},
	sizeLabel: {
		width: 24,
		color: theme.colors.neutral.text_3,
		fontWeight: theme.text.fontWeight.semibold,
	},
	sizeInput: {
		flex: 1,
	},

	// Form
	formGroup: {
		gap: theme.spacing[5],
	},

	// Row inputs
	rowInputs: {
		flexDirection: 'row',
		gap: theme.spacing[4],
	},
	halfInput: {
		flex: 1,
	},

	// Bottom
	bottomSpacer: {
		height: 24,
	},
}));
