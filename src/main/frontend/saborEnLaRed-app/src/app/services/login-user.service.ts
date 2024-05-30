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
        sessionStorage.setItem("user", JSON.stringify(userData.userDTO));
        this.currentUserLoginOn.next(true);
        this.currentUserToken.next(userData);
        if (userData.userDTO) {
          this.currentUser.next(userData.userDTO);
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

    window.location.href = '/';

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


  public getUser() {
    let userStr = sessionStorage.getItem("user");
    if (userStr !== null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    if (user !== null) {
      return user.rol;
    }
  }

}

