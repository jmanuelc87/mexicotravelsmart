'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ChatInterface.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface PendingSend {
  clientMessageId: string;
  content: string;
  conversationId: string;
}

interface ChatInterfaceProps {
  deviceId: string;
  locale: string;
  conversationId?: string;
}

export function ChatInterface({ deviceId, locale, conversationId: fixedConversationId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [slowIndicator, setSlowIndicator] = useState(false);
  const [retryPending, setRetryPending] = useState<PendingSend | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isWaiting]);

  // Load full history when opening an existing conversation
  useEffect(() => {
    if (!fixedConversationId) return;

    async function loadHistory() {
      setIsLoadingHistory(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const accumulated: any[] = [];
      let cursor: string | null = null;

      try {
        do {
          const url: string = `/api/bot/v1/conversations/${fixedConversationId}?limit=100${cursor ? `&after=${cursor}` : ''}`;
          const res: Response = await fetch(url, { headers: { 'X-Device-ID': deviceId } });
          if (!res.ok) break;
          const data: { messages: { message_id: string; role: string; content: string }[]; next_cursor: string | null } = await res.json();
          accumulated.push(...data.messages);
          cursor = data.next_cursor ?? null;
        } while (cursor);

        setMessages(
          accumulated.map((m) => ({ id: m.message_id, role: m.role, content: m.content }))
        );
      } catch { /* show empty chat on failure */ } finally {
        setIsLoadingHistory(false);
      }
    }

    loadHistory();
  }, [fixedConversationId, deviceId]);

  function startSlowTimer() {
    slowTimerRef.current = setTimeout(() => setSlowIndicator(true), 8000);
  }

  function clearSlowTimer() {
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = null;
    setSlowIndicator(false);
  }

  async function sendMessage(content: string, clientMessageId: string) {
    setIsWaiting(true);
    setRetryPending(null);
    startSlowTimer();

    try {
      let conversation_id = fixedConversationId;

      if (!conversation_id) {
        const convRes = await fetch('/api/bot/v1/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-ID': deviceId },
          body: JSON.stringify({ locale }),
        });

        if (!convRes.ok) {
          let detail: string | null = null;
          try { const err = await convRes.json(); detail = err?.detail ?? null; } catch { /* ignore */ }
          setMessages((prev) => [
            ...prev,
            { id: `error-${clientMessageId}`, role: 'assistant', content: detail ? `__error_detail__:${detail}` : '__error_generic__' },
          ]);
          return;
        }

        conversation_id = (await convRes.json()).conversation_id as string;
      }

      const res = await fetch(`/api/bot/v1/conversations/${conversation_id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-ID': deviceId },
        body: JSON.stringify({ content, client_message_id: clientMessageId, locale }),
      });

      clearSlowTimer();

      if (res.status === 504) {
        setRetryPending({ clientMessageId, content, conversationId: conversation_id });
        setMessages((prev) => [
          ...prev,
          { id: `error-${clientMessageId}`, role: 'assistant', content: '__error_timeout__' },
        ]);
        return;
      }

      if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After');
        const seconds = retryAfter ? parseInt(retryAfter, 10) : null;
        setRetryPending({ clientMessageId, content, conversationId: conversation_id });
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${clientMessageId}`,
            role: 'assistant',
            content: seconds ? `__error_ratelimit__:${seconds}` : '__error_ratelimit__',
          },
        ]);
        return;
      }

      if (!res.ok) {
        let detail: string | null = null;
        try { const err = await res.json(); detail = err?.detail ?? null; } catch { /* ignore */ }
        setMessages((prev) => [
          ...prev,
          { id: `error-${clientMessageId}`, role: 'assistant', content: detail ? `__error_detail__:${detail}` : '__error_generic__' },
        ]);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: data.message_id, role: 'assistant', content: data.content },
      ]);
    } catch {
      clearSlowTimer();
      setMessages((prev) => [
        ...prev,
        { id: `error-${clientMessageId}`, role: 'assistant', content: '__error_generic__' },
      ]);
    } finally {
      setIsWaiting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isWaiting) return;

    const clientMessageId = crypto.randomUUID();
    setInput('');
    setMessages((prev) => [
      ...prev,
      { id: `user-${clientMessageId}`, role: 'user', content: text },
    ]);
    await sendMessage(text, clientMessageId);
  }

  async function handleRetry() {
    if (!retryPending) return;
    setMessages((prev) => prev.filter((m) => !m.content.startsWith('__error_')));
    await sendMessage(retryPending.content, retryPending.clientMessageId);
  }

  function renderMessage(msg: Message) {
    if (msg.content === '__error_timeout__') {
      return (
        <div key={msg.id} className={styles['bubble-error']}>
          <span>The assistant is taking too long to respond.</span>
          <button className={styles['retry-btn']} onClick={handleRetry}>Retry</button>
        </div>
      );
    }
    if (msg.content.startsWith('__error_ratelimit__')) {
      const seconds = msg.content.includes(':') ? msg.content.split(':')[1] : null;
      const label = seconds
        ? `Too many requests. Please wait ${seconds}s before retrying.`
        : 'Too many requests. Please try again shortly.';
      return (
        <div key={msg.id} className={styles['bubble-error']}>
          <span>{label}</span>
          <button className={styles['retry-btn']} onClick={() => retryPending && handleRetry()}>Retry</button>
        </div>
      );
    }
    if (msg.content.startsWith('__error_detail__:')) {
      return (
        <div key={msg.id} className={styles['bubble-error']}>
          <span>{msg.content.slice('__error_detail__:'.length)}</span>
        </div>
      );
    }
    if (msg.content === '__error_generic__') {
      return (
        <div key={msg.id} className={styles['bubble-error']}>
          <span>Something went wrong. Please try again.</span>
          <button className={styles['retry-btn']} onClick={() => retryPending && handleRetry()}>Retry</button>
        </div>
      );
    }
    return (
      <div
        key={msg.id}
        className={msg.role === 'user' ? styles['bubble-user'] : styles['bubble-assistant']}
      >
        {msg.content}
      </div>
    );
  }

  return (
    <div className={styles['chat']}>
      <div className={styles['messages']} ref={listRef}>
        {isLoadingHistory && (
          <div className={styles['bubble-assistant']}>
            <span className={styles['typing']}>···</span>
          </div>
        )}
        {messages.map(renderMessage)}
        {isWaiting && (
          <div className={styles['bubble-assistant']}>
            <span className={styles['typing']}>
              {slowIndicator ? 'Still thinking…' : '···'}
            </span>
          </div>
        )}
      </div>

      <form className={styles['input-bar']} onSubmit={handleSubmit}>
        <textarea
          className={styles['input']}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about traveling in Mexico…"
          maxLength={2000}
          rows={1}
          disabled={isWaiting}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent);
            }
          }}
        />
        <button
          type="submit"
          className={styles['send-btn']}
          disabled={isWaiting || !input.trim()}
          aria-label="Send message"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
