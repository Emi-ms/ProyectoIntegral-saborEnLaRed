import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  catchError, throwError } from 'rxjs';
import { RateRequest } from '../models/RateRequest';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private apiURL = baserUrl;

  constructor(private httpClient: HttpClient) { }

  save(rate: RateRequest) {
    return this.httpClient.post(this.apiURL + '/rates', rate)
    .pipe(
      catchError(this.errorHandler));
  }


  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Ha ocurrido un error:", error.error);
    }
    else {
      console.error(
        `Backend codigo de error: ${error.status}, ` +
        `El cuerpo del error: ${error.error}`);
    }
    return throwError(() => new Error("Algo salio mal; por favor, intente de nuevo."));
  }
}
