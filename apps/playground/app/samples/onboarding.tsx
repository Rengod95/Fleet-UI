import {
	Button,
	Checkbox,
	ContextHeader,
	Icon,
	IconButton,
	Input,
	Modal,
	OTPInput,
	Progress,
	StepIndicator,
	Typo,
} from '@fleet-ui/components';
import { useToast } from '@fleet-ui/components';
import { router } from 'expo-router';
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronLeft,
	Eye,
	EyeOff,
	Mail,
	PartyPopper,
	User,
} from 'lucide-react-native';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// ============================================
// Types
// ============================================

interface FormData {
	email: string;
	password: string;
	name: string;
	otp: string;
	termsAgreed: boolean;
	marketingAgreed: boolean;
}

// ============================================
// Constants
// ============================================

const TOTAL_STEPS = 4;
const STEP_LABELS = [
	{ stepIndex: 0, label: '계정' },
	{ stepIndex: 1, label: '인증' },
	{ stepIndex: 2, label: '정보' },
	{ stepIndex: 3, label: '완료' },
];

// ============================================
// Main Component
// ============================================

export default function OnboardingScreen() {
	useUnistyles();
	const insets = useSafeAreaInsets();
	const toast = useToast();

	// Form state
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		name: '',
		otp: '',
		termsAgreed: false,
		marketingAgreed: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showCompletionModal, setShowCompletionModal] = useState(false);

	// Validation
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
		{},
	);

	// ============================================
	// Handlers
	// ============================================

	const updateFormData = <K extends keyof FormData>(
		key: K,
		value: FormData[K],
	) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
		// Clear error when user starts typing
		if (errors[key]) {
			setErrors((prev) => ({ ...prev, [key]: undefined }));
		}
	};

	const validateStep = (step: number): boolean => {
		const newErrors: Partial<Record<keyof FormData, string>> = {};

		switch (step) {
			case 0: // 계정 정보
				if (!formData.email) {
					newErrors.email = 'Enter your email';
				} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
					newErrors.email = 'Invalid email format';
				}
				if (!formData.password) {
					newErrors.password = 'Enter your password';
				} else if (formData.password.length < 4) {
					newErrors.password = 'Password must be at least 4 characters';
				}
				break;

			case 1: // OTP 인증
				if (!formData.otp || formData.otp.length !== 6) {
					newErrors.otp = 'Enter the 6-digit verification code';
				}
				break;

			case 2: // 개인정보 & 약관
				if (!formData.name) {
					newErrors.name = 'Enter your name';
				}
				if (!formData.termsAgreed) {
					toast.show({
						title: 'Terms of service agreement required',
						description: 'Please agree to the terms of service',
						colorScheme: 'warning',
					});
					return false;
				}
				break;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = async () => {
		if (!validateStep(currentStep)) return;

		if (currentStep === 0) {
			// 이메일 인증 요청 시뮬레이션
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsLoading(false);
			toast.show({
				title: 'Verification code sent',
				description: `Verification code sent to ${formData.email}`,
				colorScheme: 'success',
				position:'bottom',
				insets:{bottom : insets.bottom + 64},
			});
		}

		if (currentStep < TOTAL_STEPS - 1) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		} else {
			router.back();
		}
	};

	const handleComplete = async () => {
		if (!validateStep(currentStep)) return;

		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsLoading(false);
		setCurrentStep(3); // 완료 단계로 이동
		setShowCompletionModal(true);
	};

	const handleResendOTP = () => {
		toast.show({
			title: 'Verification code resent',
			description: 'New verification code sent',
			colorScheme: 'info',
		});
	};

	// ============================================
	// Step Content Renderers
	// ============================================

	const renderAccountStep = () => (
		<View style={styles.stepContent}>
			<View style={styles.stepHeader}>
				<Typo variant="h2">Create an account</Typo>
				<Typo variant="body2" style={styles.stepDescription}>
					Enter your email and password to create an account
				</Typo>
			</View>

			<View style={styles.formGroup}>
				<Input
					label="Email"
					placeholder="example@email.com"
					value={formData.email}
					onChangeText={(text) => updateFormData('email', text)}
					keyboardType="email-address"
					autoCapitalize="none"
					isInvalid={!!errors.email}
					errorMessage={errors.email}
					variant="underlined"
					size='xl'
				/>

				<Input
					label="Password"
					placeholder="Enter at least 8 characters"
					value={formData.password}
					onChangeText={(text) => updateFormData('password', text)}
					secureTextEntry={!showPassword}
					endContent={
						<Pressable onPress={() => setShowPassword(!showPassword)}>
							<Icon
								icon={showPassword ? EyeOff : Eye}
								size="md"
								colorScheme="neutral"
							/>
						</Pressable>
					}
					isInvalid={!!errors.password}
					errorMessage={errors.password}
					variant="underlined"
					size='xl'
				/>
			</View>
		</View>
	);

	const renderOTPStep = () => (
		<View style={styles.stepContent}>
			<View style={styles.stepHeader}>
				<Typo variant="h3">Email Verification</Typo>
				<Typo variant="body2" style={styles.stepDescription}>
					Enter the verification code sent to {formData.email}
				</Typo>
			</View>

			<View style={styles.otpContainer}>
				<OTPInput
					maxLength={6}
					defaultValue={formData.otp}
					onChangeText={(text) => updateFormData('otp', text)}
					onComplete={(code) => {
						updateFormData('otp', code);
						toast.show({
							title: 'Verification code entered',
							colorScheme: 'success',
						});
					}}
					colorScheme="primary"
					variant="flat"
					size="lg"
					isInvalid={!!errors.otp}
				/>
				{errors.otp && (
					<Typo variant="caption1" style={styles.otpError}>
						{errors.otp}
					</Typo>
				)}
			</View>

			<View style={styles.resendContainer}>
				<Typo variant="body3" style={styles.resendText}>
					Didn't receive the verification code?
				</Typo>
				<Pressable onPress={handleResendOTP}>
					<Typo variant="body3" style={styles.resendLink}>
						Resend
					</Typo>
				</Pressable>
			</View>
		</View>
	);

	const renderInfoStep = () => (
		<View style={styles.stepContent}>
			<View style={styles.stepHeader}>
				<Typo variant="h3">Profile Information</Typo>
				<Typo variant="body2" style={styles.stepDescription}>
					Last step. Please enter your name and agree to the terms of service.
				</Typo>
			</View>

			{/* 프로필 완성도 */}
			<View style={styles.progressContainer}>
				<View style={styles.progressHeader}>
					<Typo variant="body3">Profile Completion</Typo>
					<Typo variant="body3" style={styles.progressPercent}>
						{Math.round(
							((formData.name ? 1 : 0) +
								(formData.termsAgreed ? 1 : 0) +
								(formData.marketingAgreed ? 0.5 : 0)) *
								40,
						)}
						%
					</Typo>
				</View>
				<Progress
					step={5}
					activeStep={
						(formData.name ? 1 : 0) +
						(formData.termsAgreed ? 1 : 0) +
						(formData.marketingAgreed ? 1 : 0) +
						2
					}
					trackVariant="flat"
					thumbVariant="none"
					colorScheme="primary"
					size="sm"
				/>
			</View>

			<View style={styles.formGroup}>
				<Input
					label="이름"
					placeholder="홍길동"
					value={formData.name}
					onChangeText={(text) => updateFormData('name', text)}
					startContent={<Icon icon={User} size="sm" colorScheme="neutral" />}
					isInvalid={!!errors.name}
					errorMessage={errors.name}
					variant="bordered"
				/>
			</View>

			<View style={styles.agreementSection}>
				<Typo variant="body2Strong" style={styles.agreementTitle}>
					Terms of service agreement
				</Typo>

				<View style={styles.checkboxGroup}>
					<Pressable
						style={styles.checkboxRow}
						onPress={() => updateFormData('termsAgreed', !formData.termsAgreed)}
					>
						<Checkbox
							checked={formData.termsAgreed}
							onCheckedChange={(checked) =>
								updateFormData('termsAgreed', checked)
							}
							colorScheme="primary"
						/>
						<View style={styles.checkboxLabel}>
							<Typo variant="body3">[Required] Terms of service agreement</Typo>
						</View>
					</Pressable>

					<Pressable
						style={styles.checkboxRow}
						onPress={() =>
							updateFormData('marketingAgreed', !formData.marketingAgreed)
						}
					>
						<Checkbox
							checked={formData.marketingAgreed}
							onCheckedChange={(checked) =>
								updateFormData('marketingAgreed', checked)
							}
							colorScheme="primary"
						/>
						<View style={styles.checkboxLabel}>
							<Typo variant="body3">[Optional] Marketing information consent</Typo>
							<Typo variant="caption1" style={styles.checkboxDescription}>
								You can receive event and discount information
							</Typo>
						</View>
					</Pressable>
				</View>
			</View>
		</View>
	);

	const renderCompleteStep = () => (
		<View style={styles.stepContent}>
			<View style={styles.completeContainer}>
				<View style={styles.completeIconWrapper}>
					<Icon icon={PartyPopper} size="_3xl" colorScheme="primary" />
				</View>
				<Typo variant="h2" style={styles.completeTitle}>
					가입 완료!
				</Typo>
				<Typo variant="body1" style={styles.completeDescription}>
					{formData.name}님, 환영합니다!{'\n'}
					지금 바로 서비스를 시작해보세요.
				</Typo>
			</View>
		</View>
	);

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return renderAccountStep();
			case 1:
				return renderOTPStep();
			case 2:
				return renderInfoStep();
			case 3:
				return renderCompleteStep();
			default:
				return null;
		}
	};

	// ============================================
	// Render
	// ============================================

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{/* Header */}
			<ContextHeader 
			title="Registration" 
			size="lg"
			style={{paddingHorizontal:16}}
			left={<IconButton size='xs' variant='flat' icon={<ChevronLeft size={20} strokeWidth={2} />} onPress={handleBack} />}
			right={<StepIndicator step={TOTAL_STEPS} activeStep={currentStep} size="sm" colorScheme="neutral" />}
			/>

			{/* Content */}
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				{renderStepContent()}
			</ScrollView>

			{/* Footer */}
			<View style={[styles.footer]}>
				{currentStep < 3 ? (
					<>
						{currentStep > 0 && currentStep < 3 && (
							<Button
								variant="flat"
								colorScheme="neutral"
								size="xl"
								onPress={handleBack}
								leftIcon={<Icon icon={ArrowLeft} size="sm" />}
								style={styles.secondaryButton}
							>
								Back
							</Button>
						)}
						<Button
							variant="filled"
							colorScheme="neutral"
							size="xl"
							onPress={currentStep === 2 ? handleComplete : handleNext}
							loading={isLoading}
							style={[
								styles.primaryButton,
								currentStep === 0 && styles.fullWidthButton,
							]}
						>
							{currentStep === 2 ? 'Complete' : 'Next'}
						</Button>
					</>
				) : (
					<Button
						variant="filled"
						colorScheme="primary"
						size="lg"
						onPress={() => router.replace('/samples')}
						fullWidth
					>
						Start
					</Button>
				)}
			</View>

			{/* Completion Modal */}
			<Modal
				visible={showCompletionModal}
				onClose={() => setShowCompletionModal(false)}
				size="sm"
				rounded="lg"
			>
				<Modal.Header title="🎉 축하합니다!" />
				<Modal.Body>
					<Typo variant="body2" style={styles.modalText}>
						Congratulations! {formData.name}!{'\n'}
						Your registration is complete.
					</Typo>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="filled"
						colorScheme="primary"
						size="md"
						onPress={() => setShowCompletionModal(false)}
						fullWidth
					>
						확인
					</Button>
				</Modal.Footer>
			</Modal>
		</KeyboardAvoidingView>
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
		paddingBottom: rt.insets.bottom,
	},

	// Header
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.neutral.border_subtle,
	},
	backButton: {
		padding: 8,
	},
	stepIndicatorWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	placeholder: {
		width: 40,
	},

	// Content
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		padding: theme.spacing[6],
	},
	stepContent: {
		flex: 1,
	},
	stepHeader: {
		marginTop: theme.spacing['9'],
		marginBottom: theme.spacing['12'],
	},
	stepDescription: {
		color: theme.colors.neutral.text_3,
		marginTop: 8,
		marginLeft: 1,
	},

	// Form
	formGroup: {
		gap: theme.spacing[9],
		marginTop: theme.spacing[4],
		paddingHorizontal: theme.spacing[2],
	},

	// OTP
	otpContainer: {
		alignItems: 'center',
		marginBottom: 24,
	},
	otpError: {
		color: theme.colors.error.solid,
		marginTop: 8,
	},
	resendContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	resendText: {
		color: theme.colors.neutral.text_3,
	},
	resendLink: {
		color: theme.colors.primary.solid,
		fontWeight: theme.text.fontWeight.semibold,
	},

	// Progress
	progressContainer: {
		marginBottom: 24,
		padding: 16,
		backgroundColor: theme.colors.neutral.content_2,
		borderRadius: theme.rounded.md,
	},
	progressHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	progressPercent: {
		color: theme.colors.primary.solid,
		fontWeight: theme.text.fontWeight.semibold,
	},

	// Agreement
	agreementSection: {
		marginTop: 32,
	},
	agreementTitle: {
		marginBottom: 16,
	},
	checkboxGroup: {
		gap: 16,
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	checkboxLabel: {
		flex: 1,
	},
	checkboxDescription: {
		color: theme.colors.neutral.text_4,
		marginTop: 2,
	},

	// Complete
	completeContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 48,
	},
	completeIconWrapper: {
		marginBottom: 24,
	},
	completeTitle: {
		textAlign: 'center',
		marginBottom: 12,
	},
	completeDescription: {
		textAlign: 'center',
		color: theme.colors.neutral.text_3,
		lineHeight: 24,
	},

	// Footer
	footer: {
		flexDirection: 'row',
		paddingHorizontal: theme.spacing[6],
		paddingVertical: theme.spacing[4],
		paddingBottom: rt.insets.bottom + theme.spacing[4],
		gap: theme.spacing[4],
		borderTopWidth: 1,
		borderTopColor: theme.colors.neutral.border_subtle,
	},
	primaryButton: {
		flex: 1,
	},
	secondaryButton: {
		flex: 0,
		minWidth: 100,
	},
	fullWidthButton: {
		flex: 1,
	},

	// Modal
	modalText: {
		textAlign: 'center',
		lineHeight: 22,
	},
}));
