import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ingredient } from '../models/Ingredient';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiURL = baserUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.apiURL + '/ingredients')
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
