'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useDeviceId } from '../../hooks/useDeviceId';
import styles from './page.module.css';

interface Conversation {
  conversation_id: string;
  locale: string;
  created_at: string;
  last_active_at: string;
  expires_at: string;
}

export default function ChatPage() {
  const deviceId = useDeviceId();
  const locale = useLocale();
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deviceId) return;

    async function fetchConversations() {
      try {
        const res = await fetch('/api/bot/v1/conversations', {
          headers: { 'X-Device-ID': deviceId! },
        });
        if (!res.ok) {
          setError('Could not load conversations.');
          return;
        }
        const data = await res.json();
        setConversations(data.items);
        setNextCursor(data.next_cursor ?? null);
      } catch {
        setError('Could not connect to the assistant.');
      } finally {
        setLoading(false);
      }
    }

    fetchConversations();
  }, [deviceId, locale]);

  async function handleLoadMore() {
    if (!deviceId || !nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/bot/v1/conversations?after=${nextCursor}`, {
        headers: { 'X-Device-ID': deviceId },
      });
      if (!res.ok) return;
      const data = await res.json();
      setConversations((prev) => {
        const seen = new Set(prev.map((c) => c.conversation_id));
        return [...prev, ...data.items.filter((c: Conversation) => !seen.has(c.conversation_id))];
      });
      setNextCursor(data.next_cursor ?? null);
    } catch { /* leave list as-is */ } finally {
      setLoadingMore(false);
    }
  }

  async function handleNewChat() {
    if (!deviceId || creating) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/bot/v1/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-ID': deviceId },
        body: JSON.stringify({ locale }),
      });
      if (!res.ok) {
        setError('Could not create a new conversation. Please try again.');
        return;
      }
      const data = await res.json();
      router.push(`/chat/${data.conversation_id}`);
    } catch {
      setError('Could not connect to the assistant. Please try again.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className={styles['page']}>
      <div className={styles['list-header']}>
        <h1 className={styles['title']}>🤖 Travel Bot</h1>
        <button className={styles['btn-new']} onClick={handleNewChat} disabled={creating || !deviceId}>
          {creating ? '…' : '+ New Chat'}
        </button>
      </div>

      {(loading || !deviceId) && (
        <div className={styles['loading']}>Loading conversations…</div>
      )}

      {error && <div className={styles['error']}>{error}</div>}

      {!loading && !error && conversations.length === 0 && (
        <div className={styles['empty']}>No conversations yet. Start one!</div>
      )}

      {!loading && !error && conversations.length > 0 && (
        <ul className={styles['list']}>
          {conversations.map((conv) => (
            <li
              key={conv.conversation_id}
              className={styles['list-item']}
              onClick={() => router.push(`/chat/${conv.conversation_id}`)}
            >
              <div className={styles['conv-info']}>
                <span className={styles['conv-id']}>{conv.conversation_id}</span>
                <span className={styles['conv-date']}>
                  {new Date(conv.last_active_at).toLocaleString()}
                </span>
              </div>
              <span className={styles['conv-chevron']}>›</span>
            </li>
          ))}

          {nextCursor && (
            <li className={styles['load-more']}>
              <button
                className={styles['btn-load-more']}
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading…' : 'Load more'}
              </button>
            </li>
          )}
        </ul>
      )}
    </main>
  );
}
