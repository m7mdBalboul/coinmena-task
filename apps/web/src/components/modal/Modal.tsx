import React from 'react';
import { styled } from '@crypto/design-system';
import { FaRegWindowClose } from '@crypto/icons';

const ModalBackdrop = styled('div', {
  inset: 0,
  zIndex: '$max',
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blackAlpha400',
});

const ModalContent = styled('div', {
  minHeight: 200,
  width: 'fit-content',
  position: 'relative',
});

const CloseButton = styled('button', {
  top: '$1',
  right: '$1',
  border: 'unset',
  cursor: 'pointer',
  background: 'unset',
  position: 'absolute',
});

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Modal({
  isOpen,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>) {
  return isOpen ? (
    <ModalBackdrop
      onClick={() => {
        onClose();
      }}
    >
      <ModalContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton onClick={onClose}>
          <FaRegWindowClose />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackdrop>
  ) : null;
}

export { Modal };
