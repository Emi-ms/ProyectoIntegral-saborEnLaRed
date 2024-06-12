import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Ingredient } from '../models/Ingredient';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiURL = baserUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.apiURL + '/ingredients/ingredients-actives')
      .pipe(
        catchError(this.errorHandler));
  }

  create(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.apiURL + '/ingredients', JSON.stringify(ingredient), { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(this.apiURL + '/ingredients/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.put<Ingredient>(this.apiURL + '/ingredients/' + id, JSON.stringify(ingredient), { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Ingredient>(this.apiURL + '/ingredients/' + id, { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  logicDelete(id: number) {
    return this.httpClient.put<Ingredient>(this.apiURL + '/ingredients/logic-delete/' + id, { headers: this.headers })
      .pipe(catchError(this.errorHandler));
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
