// src/lib/redux/types/counterTypes.ts
export interface CounterState {
  count: number;
  loading: boolean;
  error: string | null;
}

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const INCREMENT_SUCCESS = 'INCREMENT_SUCCESS';
export const INCREMENT_FAILURE = 'INCREMENT_FAILURE';

interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

interface IncrementAsyncAction {
  type: typeof INCREMENT_ASYNC;
}

interface IncrementSuccessAction {
  type: typeof INCREMENT_SUCCESS;
  payload: number;
}

interface IncrementFailureAction {
  type: typeof INCREMENT_FAILURE;
  payload: string;
}

export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | IncrementAsyncAction
  | IncrementSuccessAction
  | IncrementFailureAction;