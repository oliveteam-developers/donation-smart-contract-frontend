import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './state';
import * as ContractReducer from './contract/contract.reducer';

export const reducers: ActionReducerMap<State> = {
  contract: ContractReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];