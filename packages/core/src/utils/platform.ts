import { Platform as RNPlatform } from 'react-native';
import type { Platform } from '../types';

/**
 * Get current platform
 */
export const getCurrentPlatform = (): Platform => {
	return RNPlatform.OS as Platform;
};

/**
 * Check if running on iOS
 */
export const isIOS = (): boolean => {
	return RNPlatform.OS === 'ios';
};

/**
 * Check if running on Android
 */
export const isAndroid = (): boolean => {
	return RNPlatform.OS === 'android';
};

/**
 * Check if running on Web
 */
export const isWeb = (): boolean => {
	return RNPlatform.OS === 'web';
};

/**
 * Check if running on native platform (iOS or Android)
 */
export const isNative = (): boolean => {
	return isIOS() || isAndroid();
};

/**
 * Platform-specific value selector
 */
export const selectPlatform = <T>(values: {
	ios?: T;
	android?: T;
	web?: T;
	native?: T;
	default: T;
}): T => {
	if (isIOS() && values.ios !== undefined) {
		return values.ios;
	}
	if (isAndroid() && values.android !== undefined) {
		return values.android;
	}
	if (isWeb() && values.web !== undefined) {
		return values.web;
	}
	if (isNative() && values.native !== undefined) {
		return values.native;
	}
	return values.default;
};
