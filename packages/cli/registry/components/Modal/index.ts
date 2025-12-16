import { ModalRoot } from './Modal';
import type { ModalComponent } from './Modal.types';
import { ModalBody } from './ModalBody';
import { ModalDescription } from './ModalDescription';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

/**
 * Modal Compound Component
 *
 * Overlay modal displayed in the center of the screen.
 *
 * Features:
 * - Drag to dismiss support
 * - Size options (sm, md, lg)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Modal visible={isVisible} onClose={() => setVisible(false)}>
 *   <Modal.Header title="Notification" subtitle="Important message" />
 *   <Modal.Body>
 *     <Text>Modal content</Text>
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button onPress={() => setVisible(false)}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export const Modal = Object.assign(ModalRoot, {
	Header: ModalHeader,
	Body: ModalBody,
	Footer: ModalFooter,
	Description: ModalDescription,
}) satisfies ModalComponent;

export type {
	ModalBodyProps,
	ModalColorScheme,
	ModalComponent,
	ModalContextValue,
	ModalFooterProps,
	ModalHeaderProps,
	ModalRootProps,
	ModalRounded,
	ModalSize,
} from './Modal.types';

export { ModalRoot } from './Modal';
export { useModalContext } from './Modal.context';
export { ModalBody } from './ModalBody';
export { ModalDescription } from './ModalDescription';
export { ModalFooter } from './ModalFooter';
export { ModalHeader } from './ModalHeader';
