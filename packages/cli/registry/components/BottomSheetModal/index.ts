import { BottomSheetModalRoot } from './BottomSheetModal';
import { BottomSheetModalAction } from './BottomSheetModalAction';
import { BottomSheetModalBody, BottomSheetModalBodyDescription } from './BottomSheetModalBody';
import { BottomSheetModalFooter } from './BottomSheetModalFooter';
import { BottomSheetModalHeader } from './BottomSheetModalHeader';
import type { BottomSheetModalComponent } from './BottomSheetModal.types';

export const BottomSheetModal = Object.assign(BottomSheetModalRoot, {
	Header: BottomSheetModalHeader,
	Body: BottomSheetModalBody,
	BodyDescription: BottomSheetModalBodyDescription,
	Action: BottomSheetModalAction,
	Footer: BottomSheetModalFooter,
}) satisfies BottomSheetModalComponent;

export type {
	BottomSheetModalActionProps,
	BottomSheetModalBodyDescriptionProps,
	BottomSheetModalBodyProps,
	BottomSheetModalFooterProps,
	BottomSheetModalHeaderProps,
	BottomSheetModalRootProps as BottomSheetModalProps,
} from './BottomSheetModal.types';
