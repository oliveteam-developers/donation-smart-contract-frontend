import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// Services
import { ApiService } from '../../services/api/api.service';

// Actions
import * as contractActions from './contract.action';

@Injectable()
export class ContractEffects {

  constructor(
    private actions$: Actions<any>,
    private apiService: ApiService,
  ) { }

  fetchContractInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contractActions.fetchContractInfo.type),
      switchMap(() =>
        this.apiService.contract().pipe(
          map((data) => {
            return contractActions.fetchContractInfoSuccess({ data: data });
          }),
          catchError((error) =>
            of(contractActions.fetchContractInfoFailed({ error: error }))
          )
        )
      )
    )
  );

}