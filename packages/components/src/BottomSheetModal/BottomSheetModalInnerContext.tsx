import { createContext, useContext } from 'react';
import type { InnerContextValue } from './BottomSheetModal.types';

export const InnerContext = createContext<InnerContextValue | null>(null);

export const useInnerContext = () => {
	const context = useContext(InnerContext);
	if (!context) {
		throw new Error(
			'BottomSheetModal subcomponents must be used within a BottomSheetModal component'
		);
	}
	return context;
};
