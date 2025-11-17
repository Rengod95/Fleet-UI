import { Platform } from 'react-native';
import {
	getCurrentPlatform,
	isAndroid,
	isIOS,
	isNative,
	isWeb,
	selectPlatform,
} from './platform';

describe('Platform Utilities', () => {
	describe('getCurrentPlatform', () => {
		it('returns the current platform', () => {
			const platform = getCurrentPlatform();
			expect(['ios', 'android', 'web', 'windows', 'macos']).toContain(platform);
		});
	});

	describe('Platform detection functions', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('isIOS returns true when platform is ios', () => {
			(Platform.OS as string) = 'ios';
			expect(isIOS()).toBe(true);
		});

		it('isAndroid returns true when platform is android', () => {
			(Platform.OS as string) = 'android';
			expect(isAndroid()).toBe(true);
		});

		it('isWeb returns true when platform is web', () => {
			(Platform.OS as string) = 'web';
			expect(isWeb()).toBe(true);
		});

		it('isNative returns true for iOS and Android', () => {
			(Platform.OS as string) = 'ios';
			expect(isNative()).toBe(true);

			(Platform.OS as string) = 'android';
			expect(isNative()).toBe(true);

			(Platform.OS as string) = 'web';
			expect(isNative()).toBe(false);
		});
	});

	describe('selectPlatform', () => {
		it('returns iOS value when on iOS', () => {
			(Platform.OS as string) = 'ios';
			const result = selectPlatform({
				ios: 'iOS value',
				android: 'Android value',
				web: 'Web value',
				default: 'Default value',
			});
			expect(result).toBe('iOS value');
		});

		it('returns default value when platform-specific value is not provided', () => {
			(Platform.OS as string) = 'ios';
			const result = selectPlatform({
				android: 'Android value',
				default: 'Default value',
			});
			expect(result).toBe('Default value');
		});

		it('returns native value when on native platform and specific value not provided', () => {
			(Platform.OS as string) = 'ios';
			const result = selectPlatform({
				native: 'Native value',
				default: 'Default value',
			});
			expect(result).toBe('Native value');
		});
	});
});
