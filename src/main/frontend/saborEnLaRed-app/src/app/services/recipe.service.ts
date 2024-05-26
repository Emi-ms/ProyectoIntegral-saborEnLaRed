import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { RecipeRequest } from '../models/RecipeRequest';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiURL = baserUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });

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

  logicDelete(id: number) {
    return this.httpClient.put<Recipe>(this.apiURL + '/recipes/logic-delete/' + id, { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  save(recipeRequest: RecipeRequest, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', new Blob([JSON.stringify(recipeRequest)], {
      type: "application/json"
    }));
    formData.append('file', file);
    return this.httpClient.post<FormData>(this.apiURL + "/recipes", formData, {
      reportProgress: true,
    },)
      .pipe(catchError(this.errorHandler));
  }

  getRecipeImage(photo: string): Observable<any> {
    return this.httpClient.get(this.apiURL + "/recipes/file/" + photo, { responseType: 'blob' })
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