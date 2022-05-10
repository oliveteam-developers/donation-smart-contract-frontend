import { IContractInfo } from '../../interfaces';

export interface ContractState {
  data: IContractInfo | null;
}

export const initialState: ContractState = {
  data: null,
};