import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { CommentRequest } from '../models/commentRequest';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL = baserUrl;

  constructor(private httpClient: HttpClient) { }


  save(comment: CommentRequest) {
    return this.httpClient.post(this.apiURL + '/comments', comment)
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

