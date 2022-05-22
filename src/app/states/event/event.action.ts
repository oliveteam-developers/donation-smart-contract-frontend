import { createAction, props } from '@ngrx/store';

// Interfaces
import { IEvent } from '../../interfaces';

export const emitEvent = createAction(
  '[Event] Emit event',
  props<{ data: IEvent | null }>()
);