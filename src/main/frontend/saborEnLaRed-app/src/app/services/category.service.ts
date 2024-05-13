import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = baserUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler));
  }

  create(distrito: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL, JSON.stringify(distrito), { headers: this.headers})
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, distrito: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + id, JSON.stringify(distrito), { headers: this.headers})
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Category>(this.apiURL + id, { headers: this.headers})
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
