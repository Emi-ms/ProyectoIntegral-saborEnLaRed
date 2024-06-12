import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,

} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../login-user.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const loginService = inject(LoginService);
    const token = sessionStorage.getItem('token');
    const router = inject(Router);

    if (token) {
        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token,

            },
        });
    }
    console.log(request.headers);

    return next(request).pipe(
        catchError((error) => {
            const CODES = [401, 403];
            if (CODES.includes(error.status)) {
                loginService.logout();
                router.navigate(['/login']);
            }

            return throwError(()=> error);
        })
    );
}