import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import baserUrl from "./helper";
import {User} from "../models/User";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = `${baserUrl}/users/signup`;

 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  public registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  

  // errorHandler(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = error.error.message;
  //   } else {
  //     if (error.status === 400 && error.error.message.includes('email')) {
  //       errorMessage = 'El email ya se encuentra registrado.';
  //       Swal.fire("Lo siento!", "El email ya se encuentra registrado", "error")
  //     } else {
  //       errorMessage = 'Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo más tarde.';
  //     }

  //     // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(() => errorMessage);
  // }

  errorHandler(error: any) {
    return throwError(error);
  }
}
