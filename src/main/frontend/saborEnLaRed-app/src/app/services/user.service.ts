import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import baserUrl from "./helper";
import { User } from "../models/User";
import { catchError, Observable, throwError, tap } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiURL = baserUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });


  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + '/users/users-actives')
      .pipe(
        catchError(this.errorHandler));

  }

  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + "/users/" + id, { headers: this.headers })
      .pipe(catchError(this.errorHandler));

  }

  public getUserFromSessionStorage(): User {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user || "{}");

  }


  public registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "/auth/register", JSON.stringify(user), { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  public createUserByAdmin(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "/users", JSON.stringify(user), { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  public updateUser(user: User): Observable<any> {

    return this.httpClient.put<User>(this.apiURL + "/users", JSON.stringify(user), { headers: this.headers })
      .pipe(
        tap(updateUser => {
          console.log("updateUser", updateUser)
          sessionStorage.setItem("user", JSON.stringify(user));
        }),
        catchError(this.errorHandler)
      );
  }

  logicDelete(id: number) {
    return this.httpClient.put<User>(this.apiURL + '/users/logic-delete/' + id, { headers: this.headers })
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
    return throwError(error);
    //return throwError(() => new Error("Algo salio mal; por favor, intente de nuevo."));
  }

}
