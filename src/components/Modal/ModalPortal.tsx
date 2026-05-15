'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from './ModalContext';
import { PhrasesModal } from './modals/PhrasesModal';
import { TranslatorModal } from './modals/TranslatorModal';
import { TermsModal } from './modals/TermsModal';
import { PrivacyModal } from './modals/PrivacyModal';
import { ExternalLinkModal } from './modals/ExternalLinkModal';
import { useLocale } from 'next-intl';
import styles from './ModalPortal.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function ModalPortal() {
  const { modal, closeModal } = useModal();
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  // Scroll lock
  useEffect(() => {
    if (!modal) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [modal]);

  // Focus trap + ESC handler
  useEffect(() => {
    if (!modal || !containerRef.current) return;

    const el = containerRef.current;
    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));

    // Focus first element
    const first = focusables()[0];
    if (first) first.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const items = focusables();
        if (!items.length) return;
        const last = items[items.length - 1];
        const firstItem = items[0];
        if (e.shiftKey) {
          if (document.activeElement === firstItem) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            firstItem.focus();
          }
        }
      }
    }

    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [modal, closeModal]);

  const backdropDismissible = modal?.type === 'phrases' || modal?.type === 'translator';

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (backdropDismissible && e.target === e.currentTarget) {
        closeModal();
      }
    },
    [backdropDismissible, closeModal],
  );

  if (!modal) return null;

  const content = (
    <div
      className={styles['overlay']}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        ref={containerRef}
        className={styles['container']}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {modal.type === 'phrases' && <PhrasesModal />}
        {modal.type === 'translator' && <TranslatorModal />}
        {modal.type === 'terms' && <TermsModal locale={locale} />}
        {modal.type === 'privacy' && <PrivacyModal locale={locale} />}
        {modal.type === 'ext-link' && (
          <ExternalLinkModal url={(modal.props?.url as string) ?? ''} />
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}

export { ModalPortal };
