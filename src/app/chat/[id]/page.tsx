'use client';

import { use } from 'react';
import { useLocale } from 'next-intl';
import { ChatInterface } from '../../../components/ChatInterface/ChatInterface';
import { useDeviceId } from '../../../hooks/useDeviceId';
import styles from '../page.module.css';

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const deviceId = useDeviceId();
  const locale = useLocale();

  return (
    <main className={styles['page']}>
      <div className={styles['list-header']}>
        <h1 className={styles['title']}>🤖 Travel Bot</h1>
      </div>

      {!deviceId && <div className={styles['loading']}>Loading…</div>}

      {deviceId && (
        <div className={styles['chat-wrapper']}>
          <ChatInterface deviceId={deviceId} locale={locale} conversationId={id} />
        </div>
      )}
    </main>
  );
}
