import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { RecipeRequest } from '../models/RecipeRequest';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiURL = baserUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.apiURL + '/recipes/recipes-actives')
      .pipe(
        catchError(this.errorHandler));
  }

  find(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.apiURL + "/recipes/" + id)
      .pipe(catchError(this.errorHandler));
  }

  save(RecipeRequest:RecipeRequest): Observable<RecipeRequest> {
    return this.httpClient.post<RecipeRequest>(this.apiURL + "/recipes", RecipeRequest)
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