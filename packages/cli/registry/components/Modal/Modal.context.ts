import { createContext, useContext } from 'react';
import type { ModalContextValue } from './Modal.types';

/**
 * Modal Context
 * 서브 컴포넌트에서 부모 Modal 상태에 접근하기 위한 Context
 */
export const ModalContext = createContext<ModalContextValue | null>(null);

/**
 * Modal Context Hook
 * Modal 서브 컴포넌트 내에서만 사용 가능
 */
export const useModalContext = (): ModalContextValue => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error(
			'Modal compound components must be used within a Modal.Root'
		);
	}
	return context;
};
