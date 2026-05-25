import { describe, it, expect } from 'vitest';
import {
  audioReducer,
  initialAudioState,
  type AudioState,
  type AudioAction,
} from './audioReducer';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function state(overrides: Partial<AudioState> = {}): AudioState {
  return { ...initialAudioState, ...overrides };
}

function reduce(s: AudioState, action: AudioAction): AudioState {
  return audioReducer(s, action);
}

// ─── LOAD_TRACK ──────────────────────────────────────────────────────────────

describe('LOAD_TRACK', () => {
  const action: AudioAction = { type: 'LOAD_TRACK', payload: { trackIndex: 2 } };

  it.each([
    ['idle', state({ status: 'idle' })],
    ['loading', state({ status: 'loading', trackIndex: 0 })],
    ['playing', state({ status: 'playing', trackIndex: 0, currentTime: 30, duration: 200 })],
    ['paused', state({ status: 'paused', trackIndex: 0, currentTime: 15, duration: 200 })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error', errorMessage: 'boom' })],
  ])('transitions from %s to loading', (_, from) => {
    const next = reduce(from, action);
    expect(next.status).toBe('loading');
    expect(next.trackIndex).toBe(2);
    expect(next.currentTime).toBe(0);
    expect(next.duration).toBe(0);
    expect(next.errorMessage).toBeUndefined();
  });
});

// ─── PLAY ────────────────────────────────────────────────────────────────────

describe('PLAY', () => {
  const action: AudioAction = { type: 'PLAY' };

  it.each([
    ['loading', state({ status: 'loading' }), 'playing'],
    ['paused', state({ status: 'paused' }), 'playing'],
  ])('transitions from %s to %s', (_, from, expected) => {
    expect(reduce(from, action).status).toBe(expected);
  });

  it.each([
    ['idle', state({ status: 'idle' })],
    ['playing', state({ status: 'playing' })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error' })],
  ])('is a no-op from %s', (_, from) => {
    expect(reduce(from, action)).toBe(from);
  });
});

// ─── PAUSE ───────────────────────────────────────────────────────────────────

describe('PAUSE', () => {
  const action: AudioAction = { type: 'PAUSE' };

  it('transitions from playing to paused', () => {
    expect(reduce(state({ status: 'playing' }), action).status).toBe('paused');
  });

  it.each([
    ['idle', state({ status: 'idle' })],
    ['loading', state({ status: 'loading' })],
    ['paused', state({ status: 'paused' })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error' })],
  ])('is a no-op from %s', (_, from) => {
    expect(reduce(from, action)).toBe(from);
  });
});

// ─── TIME_UPDATE ─────────────────────────────────────────────────────────────

describe('TIME_UPDATE', () => {
  const action: AudioAction = { type: 'TIME_UPDATE', payload: { currentTime: 42 } };

  it.each([
    ['playing', state({ status: 'playing' })],
    ['paused', state({ status: 'paused' })],
  ])('updates currentTime when %s', (_, from) => {
    expect(reduce(from, action).currentTime).toBe(42);
  });

  it.each([
    ['idle', state({ status: 'idle' })],
    ['loading', state({ status: 'loading' })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error' })],
  ])('is a no-op from %s', (_, from) => {
    expect(reduce(from, action)).toBe(from);
  });
});

// ─── DURATION_CHANGE ─────────────────────────────────────────────────────────

describe('DURATION_CHANGE', () => {
  const action: AudioAction = { type: 'DURATION_CHANGE', payload: { duration: 180 } };

  it.each([
    ['loading', state({ status: 'loading' })],
    ['playing', state({ status: 'playing' })],
    ['paused', state({ status: 'paused' })],
  ])('updates duration when %s', (_, from) => {
    expect(reduce(from, action).duration).toBe(180);
  });

  it.each([
    ['idle', state({ status: 'idle' })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error' })],
  ])('is a no-op from %s', (_, from) => {
    expect(reduce(from, action)).toBe(from);
  });
});

// ─── SEEK ────────────────────────────────────────────────────────────────────

describe('SEEK', () => {
  const base = state({ status: 'playing', duration: 100, currentTime: 50 });

  it('seeks to given position while playing', () => {
    expect(reduce(base, { type: 'SEEK', payload: { currentTime: 70 } }).currentTime).toBe(70);
  });

  it('seeks while paused', () => {
    const paused = { ...base, status: 'paused' as const };
    expect(reduce(paused, { type: 'SEEK', payload: { currentTime: 20 } }).currentTime).toBe(20);
  });

  it('clamps below 0', () => {
    expect(reduce(base, { type: 'SEEK', payload: { currentTime: -10 } }).currentTime).toBe(0);
  });

  it('clamps above duration', () => {
    expect(reduce(base, { type: 'SEEK', payload: { currentTime: 999 } }).currentTime).toBe(100);
  });

  it.each([
    ['idle', state({ status: 'idle' })],
    ['loading', state({ status: 'loading' })],
    ['ended', state({ status: 'ended' })],
    ['error', state({ status: 'error' })],
  ])('is a no-op from %s', (_, from) => {
    expect(reduce(from, { type: 'SEEK', payload: { currentTime: 10 } })).toBe(from);
  });
});

// ─── NEXT ────────────────────────────────────────────────────────────────────

describe('NEXT', () => {
  it('advances to the next track', () => {
    const next = reduce(state({ trackIndex: 1 }), { type: 'NEXT', payload: { trackCount: 6 } });
    expect(next.trackIndex).toBe(2);
    expect(next.status).toBe('loading');
  });

  it('wraps from the last track to first', () => {
    const next = reduce(state({ trackIndex: 5 }), { type: 'NEXT', payload: { trackCount: 6 } });
    expect(next.trackIndex).toBe(0);
  });

  it('resets currentTime and duration', () => {
    const next = reduce(
      state({ trackIndex: 0, currentTime: 45, duration: 200 }),
      { type: 'NEXT', payload: { trackCount: 6 } },
    );
    expect(next.currentTime).toBe(0);
    expect(next.duration).toBe(0);
  });
});

// ─── PREV ────────────────────────────────────────────────────────────────────

describe('PREV', () => {
  it('goes to the previous track', () => {
    const next = reduce(state({ trackIndex: 3 }), { type: 'PREV', payload: { trackCount: 6 } });
    expect(next.trackIndex).toBe(2);
    expect(next.status).toBe('loading');
  });

  it('wraps from first track to last', () => {
    const next = reduce(state({ trackIndex: 0 }), { type: 'PREV', payload: { trackCount: 6 } });
    expect(next.trackIndex).toBe(5);
  });

  it('resets currentTime and duration', () => {
    const next = reduce(
      state({ trackIndex: 2, currentTime: 10, duration: 120 }),
      { type: 'PREV', payload: { trackCount: 6 } },
    );
    expect(next.currentTime).toBe(0);
    expect(next.duration).toBe(0);
  });
});

// ─── ENDED ───────────────────────────────────────────────────────────────────

describe('ENDED', () => {
  it('transitions to ended and sets currentTime to duration', () => {
    const next = reduce(state({ status: 'playing', duration: 180 }), { type: 'ENDED' });
    expect(next.status).toBe('ended');
    expect(next.currentTime).toBe(180);
  });
});

// ─── ERROR ───────────────────────────────────────────────────────────────────

describe('ERROR', () => {
  it('transitions to error and stores the message', () => {
    const next = reduce(state({ status: 'loading' }), { type: 'ERROR', payload: { message: 'network failure' } });
    expect(next.status).toBe('error');
    expect(next.errorMessage).toBe('network failure');
  });
});

// ─── SET_VOLUME ──────────────────────────────────────────────────────────────

describe('SET_VOLUME', () => {
  it('sets volume to given value', () => {
    expect(reduce(state(), { type: 'SET_VOLUME', payload: { volume: 0.5 } }).volume).toBe(0.5);
  });

  it('clamps to 0 on underflow', () => {
    expect(reduce(state(), { type: 'SET_VOLUME', payload: { volume: -1 } }).volume).toBe(0);
  });

  it('clamps to 1 on overflow', () => {
    expect(reduce(state(), { type: 'SET_VOLUME', payload: { volume: 2 } }).volume).toBe(1);
  });
});

// ─── TOGGLE_MUTE ─────────────────────────────────────────────────────────────

describe('TOGGLE_MUTE', () => {
  it('mutes when unmuted', () => {
    expect(reduce(state({ isMuted: false }), { type: 'TOGGLE_MUTE' }).isMuted).toBe(true);
  });

  it('unmutes when muted', () => {
    expect(reduce(state({ isMuted: true }), { type: 'TOGGLE_MUTE' }).isMuted).toBe(false);
  });
});

// ─── initialAudioState ───────────────────────────────────────────────────────

describe('initialAudioState', () => {
  it('has the correct default shape', () => {
    expect(initialAudioState).toEqual({
      status: 'idle',
      trackIndex: 0,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      errorMessage: undefined,
    });
  });
});
