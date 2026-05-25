/**
 * AudioPlayer state machine
 *
 * State diagram
 * ─────────────
 *
 *              LOAD_TRACK
 *   ┌──────────────────────────────────────────────────┐
 *   │                                                  ▼
 * [idle] ──LOAD_TRACK──► [loading] ──PLAY──────────► [playing]
 *                           │  ▲                       │  ▲
 *                           │  └──────LOAD_TRACK───────┘  │
 *                           │                             │
 *                         ERROR                        PAUSE
 *                           │                             │
 *                           ▼                             ▼
 *                        [error]               [paused] ─PLAY──► [playing]
 *                           │                    │  ▲
 *                       LOAD_TRACK           LOAD_TRACK
 *                           │                    │
 *                           └────────────────────┘
 *                                    │
 *                                    ▼
 *                                 [loading]
 *
 *  [playing] ──ENDED──► [ended] ──LOAD_TRACK / NEXT / PREV──► [loading]
 *
 *  NEXT / PREV are valid from: idle, loading, playing, paused, ended, error
 *  SEEK is valid when status is playing or paused (clamped to [0, duration])
 *  SET_VOLUME clamps to [0, 1]
 *  TIME_UPDATE / DURATION_CHANGE are no-ops outside of playing / paused
 */

// ─── State ───────────────────────────────────────────────────────────────────

export type AudioStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'ended'
  | 'error'
  | 'locked';

export interface AudioState {
  status: AudioStatus;
  trackIndex: number;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  errorMessage: string | undefined;
}

export const initialAudioState: AudioState = {
  status: 'idle',
  trackIndex: 0,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  errorMessage: undefined,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

export type AudioAction =
  | { type: 'LOAD_TRACK'; payload: { trackIndex: number } }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TIME_UPDATE'; payload: { currentTime: number } }
  | { type: 'DURATION_CHANGE'; payload: { duration: number } }
  | { type: 'SEEK'; payload: { currentTime: number } }
  | { type: 'NEXT'; payload: { trackCount: number } }
  | { type: 'PREV'; payload: { trackCount: number } }
  | { type: 'ENDED' }
  | { type: 'ERROR'; payload: { message: string } }
  | { type: 'SET_VOLUME'; payload: { volume: number } }
  | { type: 'TOGGLE_MUTE' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

export function audioReducer(
  state: AudioState,
  action: AudioAction,
): AudioState {
  // 'locked' is a terminal passthrough — all actions are no-ops.
  // The UI is in a disabled state; only the host can unlock it by
  // re-rendering with isAuthenticated=true (which mounts a fresh reducer).
  if (state.status === 'locked') return state;

  switch (action.type) {
    case 'LOAD_TRACK':
      return {
        ...state,
        status: 'loading',
        trackIndex: action.payload.trackIndex,
        currentTime: 0,
        duration: 0,
        errorMessage: undefined,
      };

    case 'PLAY':
      if (state.status === 'loading' || state.status === 'paused') {
        return { ...state, status: 'playing' };
      }
      return state;

    case 'PAUSE':
      if (state.status === 'playing') {
        return { ...state, status: 'paused' };
      }
      return state;

    case 'TIME_UPDATE':
      if (state.status === 'playing' || state.status === 'paused') {
        return { ...state, currentTime: action.payload.currentTime };
      }
      return state;

    case 'DURATION_CHANGE':
      if (state.status === 'playing' || state.status === 'paused' || state.status === 'loading') {
        return { ...state, duration: action.payload.duration };
      }
      return state;

    case 'SEEK': {
      if (state.status !== 'playing' && state.status !== 'paused') {
        return state;
      }
      const clamped = Math.min(
        Math.max(0, action.payload.currentTime),
        state.duration,
      );
      return { ...state, currentTime: clamped };
    }

    case 'NEXT': {
      const next = (state.trackIndex + 1) % action.payload.trackCount;
      return {
        ...state,
        status: 'loading',
        trackIndex: next,
        currentTime: 0,
        duration: 0,
        errorMessage: undefined,
      };
    }

    case 'PREV': {
      const prev =
        (state.trackIndex - 1 + action.payload.trackCount) %
        action.payload.trackCount;
      return {
        ...state,
        status: 'loading',
        trackIndex: prev,
        currentTime: 0,
        duration: 0,
        errorMessage: undefined,
      };
    }

    case 'ENDED':
      return { ...state, status: 'ended', currentTime: state.duration };

    case 'ERROR':
      return {
        ...state,
        status: 'error',
        errorMessage: action.payload.message,
      };

    case 'SET_VOLUME':
      return {
        ...state,
        volume: Math.min(1, Math.max(0, action.payload.volume)),
      };

    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };

    default: {
      // Exhaustiveness check — TypeScript will error if a new action is added
      // without a corresponding case. Unreachable at runtime.
      /* v8 ignore next 2 */
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
