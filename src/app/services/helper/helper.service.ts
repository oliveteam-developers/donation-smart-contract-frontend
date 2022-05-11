import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// States
import { emitEvent } from '../../states/event';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private store: Store
  ) { }

  emitEvent(name: string, data: any = null) {
    this.store.dispatch(emitEvent({
      data: { name, data }
    }));

    setTimeout(() => {
      this.store.dispatch(emitEvent({ data: null }));
    }, 3000);
  }

}
