import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractState } from './contract.state';

export const selectContract = createFeatureSelector<ContractState>('contract');

export const selectContractData = createSelector(
  selectContract,
  (state: ContractState) => state.data
);
