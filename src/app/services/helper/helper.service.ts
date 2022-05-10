import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getFloatNumber(value: string) {
    return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

}
