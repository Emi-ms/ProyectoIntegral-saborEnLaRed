import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import {LoginService } from '../login-user.service';

export const normalUserGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class UserOrAdminGuard implements CanActivate{

  constructor( private loginService: LoginService, private router: Router) {
      
  }

  canActivate(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if(this.loginService.currentUserLoginOn && (this.loginService.getUserRole() === 'NORMAL_USER' || this.loginService.getUserRole() === 'ADMIN')){
          return true;
      }
      this.router.navigateByUrl('/');
      return false;
  }
}