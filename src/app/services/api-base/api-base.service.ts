import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  constructor() { }

  protected makeUrl(endPoint: string, params: any = {}, queryParams: any = {}): string {
    let url = endPoint;

    if (params && Object.keys(params).length) {
      Object.keys(params).forEach((key) => {
        url = url.replace(`:${key}`, params[key]);
      });
    }

    if (queryParams && Object.keys(queryParams).length) {
      let index = 0;
      let query = '';

      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          index = index + 1;
          if (index === Object.keys(queryParams).length) {
            query += `${key}=${queryParams[key]}`;
          } else {
            query += `${key}=${queryParams[key]}&`;
          }
        }
      }

      url = `${url}?${query}`;
    }

    return url;
  }
}
