import { createContext, useContext } from 'react';
import type { CheckboxCardGroupContextValue } from './CheckboxCard.types';

/**
 * CheckboxCardGroup Context
 * 그룹 내 CheckboxCard들이 상태를 공유하기 위한 Context
 */
export const CheckboxCardGroupContext =
	createContext<CheckboxCardGroupContextValue | null>(null);

/**
 * CheckboxCardGroup Context 사용 훅
 * @returns CheckboxCardGroupContextValue | null
 */
export const useCheckboxCardGroup =
	(): CheckboxCardGroupContextValue | null => {
		return useContext(CheckboxCardGroupContext);
	};

/**
 * CheckboxCardGroup Context Provider
 */
export const CheckboxCardGroupProvider = CheckboxCardGroupContext.Provider;
