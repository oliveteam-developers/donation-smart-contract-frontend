import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './event.action';
import { initialState, EventState } from './event.state';

const eventReducer = createReducer(
  initialState,
  on(actions.emitEvent, (state, { data }) => ({
    ...state,
    data,
  })),
);

export function reducer(state: EventState | undefined, action: Action) {
  return eventReducer(state, action);
}