import { IEvent } from '../../interfaces';

export interface EventState {
  data: IEvent | null;
}

export const initialState: EventState = {
  data: null,
};