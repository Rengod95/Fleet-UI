import { createContext, useContext } from 'react';
import type {
	AccordionContextValue,
	AccordionItemContextValue,
} from './Accordion.types';

// ============================================================================
// Accordion Root Context
// ============================================================================

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const AccordionProvider = AccordionContext.Provider;

export function useAccordionContext(): AccordionContextValue {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error(
			'useAccordionContext must be used within an <Accordion /> component'
		);
	}
	return context;
}

// ============================================================================
// AccordionItem Context
// ============================================================================

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
	null
);

export const AccordionItemProvider = AccordionItemContext.Provider;

export function useAccordionItemContext(): AccordionItemContextValue {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error(
			'useAccordionItemContext must be used within an <AccordionItem /> component'
		);
	}
	return context;
}
