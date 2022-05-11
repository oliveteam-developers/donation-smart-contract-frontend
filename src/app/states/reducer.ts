import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './state';
import * as ContractReducer from './contract/contract.reducer';
import * as EventReducer from './event/event.reducer';

export const reducers: ActionReducerMap<State> = {
  contract: ContractReducer.reducer,
  event: EventReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];