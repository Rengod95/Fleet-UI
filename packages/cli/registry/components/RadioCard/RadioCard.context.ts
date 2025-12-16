import { createContext, useContext } from 'react';
import type { RadioCardGroupContextValue } from './RadioCard.types';

/**
 * RadioCardGroup Context
 * Context for sharing state among RadioCardGroup components
 */
export const RadioCardGroupContext =
	createContext<RadioCardGroupContextValue | null>(null);

/**
 * RadioCardGroup Safe Context Hook
 * @returns RadioCardGroupContextValue
 */
export const useRadioCardGroupContext = (): RadioCardGroupContextValue => {
	const context = useContext(RadioCardGroupContext);
	if (!context) {
		throw new Error(
			'useRadioCardGroupContext must be used within a <RadioCardGroup /> component'
		);
	}
	return context;
};

/**
 * RadioCardGroup Context Provider
 */
export const RadioCardGroupProvider = RadioCardGroupContext.Provider;
