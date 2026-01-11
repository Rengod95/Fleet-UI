import { type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Accordion } from '@fleet-ui/components';

interface SectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	sectionBodyStyle?: StyleProp<ViewStyle>;
	/**
	 * Accordion value (섹션 식별자)
	 * @default title의 camelCase 변환값
	 */
	value?: string;
	/**
	 * 기본 열림 상태
	 * @default true
	 */
	defaultOpen?: boolean;
}

/**
 * 데모 페이지의 섹션 컴포넌트
 *
 * 내부적으로 Accordion을 사용하여 collapsible 기능을 제공하며,
 * **페이지 단에서 별도의 Accordion 컨텍스트를 만들 필요가 없습니다.**
 *
 * @example
 * ```tsx
 * <Section title="Variants" value="variants">
 *   <View style={commonStyles.row}>
 *     {VARIANTS.map(variant => ...)}
 *   </View>
 * </Section>
 * ```
 */
export function Section({
	title,
	description,
	children,
	style,
	sectionBodyStyle,
	value,
	defaultOpen = true,
}: SectionProps) {
	const { theme } = useUnistyles();

	// value가 없으면 title을 camelCase로 변환
	const accordionValue =
		value || title.replace(/\s+/g, '').replace(/^./, (c) => c.toLowerCase());

	return (
		<Accordion
			type="multiple"
			defaultValue={defaultOpen ? [accordionValue] : []}
			variant="ghost"
			colorScheme="neutral"
			gap="none"
			style={{
				overflow:'visible'
			}}
		>
			<Accordion.Item value={accordionValue} style={[styles.section, style]}>
				<Accordion.Header accessibilityLabel={title} style={styles.sectionHeader}>
					<View >
						<Text style={styles.sectionTitle}>{title}</Text>
						{description ? (
							<Text style={styles.sectionDescription}>{description}</Text>
						) : null}
					</View>
				</Accordion.Header>
				<Accordion.Content style={styles.accordionContent}>
					<View style={[styles.sectionBody, sectionBodyStyle]}>{children}</View>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion>
	);
}

const styles = StyleSheet.create((theme) => ({
	section: {
		// marginTop: theme.spacing[6],
		paddingHorizontal: 0,
		overflow:'visible'
	},
	sectionHeader: {
		gap: theme.spacing[1],
		paddingHorizontal: theme.spacing[4],
		boxShadow: theme.shadows.sm,
		borderRadius: theme.rounded.sm,
	},
	sectionTitle: {
		...theme.typography.h6,
		color: theme.colors.neutral.text_1,
	},
	sectionDescription: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		lineHeight: 18,
	},
	accordionContent: {
		width: '100%',
		paddingHorizontal: 0,
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: 'transparent',
	},
	sectionBody: {
		marginTop: theme.spacing[4],
		borderRadius: theme.rounded.lg,
		padding: theme.spacing[4],
		gap: theme.spacing[4],
		minHeight:240,
		alignItems:'center',
		justifyContent:'center',
	},
}));
