import { createAction, props } from '@ngrx/store';

// Interfaces
import { IContractInfo } from '../../interfaces';

export const fetchContractInfo = createAction('[Contract] Fetch contract info');

export const fetchContractInfoSuccess = createAction(
  '[Contract] Fetch contract info successfully',
  props<{ data: IContractInfo }>()
);

export const fetchContractInfoFailed = createAction(
  '[Contract] Fetch contract info failed',
  props<{ error: any }>()
);