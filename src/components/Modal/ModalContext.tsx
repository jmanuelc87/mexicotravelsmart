'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

export type ModalType = 'phrases' | 'translator' | 'terms' | 'privacy' | 'ext-link';

export interface ModalState {
  type: ModalType;
  props?: Record<string, unknown>;
}

interface ModalContextValue {
  modal: ModalState | null;
  openModal: (type: ModalType, props?: Record<string, unknown>) => void;
  closeModal: () => void;
  triggerRef: React.MutableRefObject<Element | null>;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);
  const triggerRef = useRef<Element | null>(null);

  const openModal = useCallback((type: ModalType, props?: Record<string, unknown>) => {
    triggerRef.current = document.activeElement;
    setModal({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    if (triggerRef.current && 'focus' in triggerRef.current) {
      (triggerRef.current as HTMLElement).focus();
    }
    triggerRef.current = null;
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, triggerRef }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
