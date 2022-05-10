import { Action, createReducer, on } from '@ngrx/store';
import * as contractActions from './contract.action';
import { initialState, ContractState } from './contract.state';

const contractReducer = createReducer(
  initialState,
  on(contractActions.fetchContractInfoSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
);

export function reducer(state: ContractState | undefined, action: Action) {
  return contractReducer(state, action);
}