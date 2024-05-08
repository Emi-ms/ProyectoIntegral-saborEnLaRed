import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baserUrl from "./helper";
import { User } from "../models/User";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = baserUrl;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }),
  }

  constructor(private httpClient: HttpClient) {
  }

  public registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "/users/signup", JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    return throwError(error);
  }

  //generamos el token para el usuario
  public generateToken(userCredencials: any): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + "/users/login", JSON.stringify(userCredencials), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //iniciamos sesion y establecemos el token en el localstorage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null) {
      return false;
    } else {
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localstorage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //obtenemos el token del localstorage 
  public getToken() {
    return localStorage.getItem("token");
  }

  //guardamos el usuario en el localstorage
  public setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //obtenemos el usuario del localstorage
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr !== null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //obtenemos el rol del usuario
  public getUserRole() {
    let user = this.getUser();
    return user.role;
  }

  public getCurrentUser(){
    return this.httpClient.get(this.apiURL + "/users/current-user", this.httpOptionsAuth)
  }



}
