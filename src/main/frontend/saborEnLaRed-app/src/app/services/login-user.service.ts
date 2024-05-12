import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from "./helper";
import { throwError, Observable, catchError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from '../models/User';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL = baserUrl;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentUser: BehaviorSubject<User>;

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  }

  // httpOptionsAuth = {

  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem("token")
  //   }),
  // }

  constructor(private httpClient: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") !== null);
    this.currentUserToken = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");
    this.currentUser = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("user") || "{}"));
  }


  public login(userCredencials: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + "/auth/login", userCredencials).pipe(
      tap((userData) => {
        console.log(userData);
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("user", JSON.stringify(userData.user));
        this.currentUserLoginOn.next(true);
        this.currentUserToken.next(userData);
        if (userData.user) {
          this.currentUser.next(userData.user);
        }
      }),
      map((userData) => userData.token),
      catchError(this.errorHandler)
    );
  }

  public logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.currentUserLoginOn.next(false);
    this.currentUserToken.next("");
    this.currentUser.next({} as User);

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

  get userToken(): Observable<String> {
    return this.currentUserToken.asObservable();
  }

  get isUserLoggedIn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get currentUserTokenValue(): String {
    return this.currentUserToken.value;
  }

  get currentUserValue(): User {
    return this.currentUser.value;
  }



  // //generamos el token para el usuario
  // public generateToken(userCredencials: any): Observable<User> {
  //   console.log(userCredencials)
  //   return this.httpClient.post<User>(this.apiURL + "/users/login", JSON.stringify(userCredencials), this.httpOptions)
  //     .pipe(catchError(this.errorHandler));
  // }

  // errorHandler(error: any) {
  //   return throwError(error);
  // }

  // //iniciamos sesion y establecemos el token en el localstorage
  // public loginUser(token: any) {
  //   localStorage.setItem("token", token);
  // }

  // public isLoggedIn() {
  //   let tokenStr = localStorage.getItem("token");
  //   if (tokenStr === undefined || tokenStr === '' || tokenStr === null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // //cerramos sesion y eliminamos el token del localstorage
  // public logout() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   return true;
  // }

  // //obtenemos el token del localstorage 
  // public getToken() {
  //   return localStorage.getItem("token");
  // }

  //guardamos el usuario en el localstorage
  // public setUser(user: User) {
  //   sessionStorage.setItem("user", JSON.stringify(user));
  // }

  //obtenemos el usuario del localstorage
  public getUser() {
    let userStr = sessionStorage.getItem("user");
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
    if (user !== null) {
      return user.rol;
    }
  }

  // public getCurrentUser(){

  //   return this.httpClient.get(this.apiURL + "/users/current-user", this.httpOptionsAuth)
  // }


}

