import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import baserUrl from "./helper";
import { User } from "../models/User";
import { catchError, Observable, throwError } from "rxjs";


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

  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + "/users/" + id, { headers: this.headers})
      .pipe(catchError(this.errorHandler));

  }

  public registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "/auth/register", JSON.stringify(user),{ headers: this.headers})
      .pipe(catchError(this.errorHandler));
  }


  public updateUser(user: User): Observable<any> {
    // this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    console.log("en el update user el user service")
    console.log(this.headers)
    console.log(JSON.stringify(user))
  
    return this.httpClient.put<User>(this.apiURL + "/users", JSON.stringify(user), { headers: this.headers})
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.error);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error("Something bad happened; please try again later."));
  }




}
