'use client';

import { useEffect } from 'react';
import { useModal } from './ModalContext';

export function ExternalLinkInterceptor() {
  const { openModal } = useModal();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      if (anchor.target !== '_blank') return;
      if (!anchor.href.startsWith('https://')) return;

      e.preventDefault();
      openModal('ext-link', { url: anchor.href });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openModal]);

  return null;
}
