import { ContractState } from './contract';
import { EventState } from './event';

export interface State {
  contract: ContractState;
  event: EventState;
}