import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import {  Observable, catchError, throwError } from 'rxjs';
import { CommentRequest } from '../models/CommentRequest';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL = baserUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(this.apiURL + '/comments/comments-actives')
    .pipe(
      catchError(this.errorHandler));
  }


  save(comment: CommentRequest) {
    return this.httpClient.post(this.apiURL + '/comments', comment)
    .pipe(
      catchError(this.errorHandler));
  }

  logicDelete(id: number) {
    return this.httpClient.put(this.apiURL + '/comments/logic-delete/' + id, { headers: this.headers })
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

