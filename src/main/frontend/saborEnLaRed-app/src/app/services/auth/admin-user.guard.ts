import { CanActivateFn } from '@angular/router';

export const adminUserGuard: CanActivateFn = (route, state) => {
  return true;
};


import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from '../login-user.service';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{

    constructor( private loginService: LoginService, private router: Router) {
        
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.loginService.currentUserLoginOn && this.loginService.getUserRole() === 'ADMIN'){
            return true;
        }
        this.router.navigateByUrl('/login');
        return false;
    }
}
