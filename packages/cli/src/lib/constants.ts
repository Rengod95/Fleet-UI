export const DEFAULT_ALIAS_PREFIX = '@fleet-ui/local';
export const DEFAULT_CORE_DIR = 'fleet-ui/core';
export const DEFAULT_COMPONENTS_DIR = 'fleet-ui/components';

export const FLEET_UI_JSON = 'fleet-ui.json';

export const REQUIRED_PEER_DEPS = [
	'react-native-unistyles',
	'react-native-reanimated',
	'react-native-gesture-handler',
	'react-native-worklets',
	'expo-blur',
	'expo-image',
	'expo-linear-gradient',
	'react-native-safe-area-context',
	'react-native-svg',
] as const;

export type RequiredPeerDep = (typeof REQUIRED_PEER_DEPS)[number];

export const REQUIRED_DEV_DEPS = ['babel-plugin-module-resolver'] as const;
export type RequiredDevDep = (typeof REQUIRED_DEV_DEPS)[number];

