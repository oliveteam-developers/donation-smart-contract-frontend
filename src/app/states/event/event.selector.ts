import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from './event.state';

export const selectEvent = createFeatureSelector<EventState>('event');

export const selectEventData = createSelector(
  selectEvent,
  (state: EventState) => state.data
);
