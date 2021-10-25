import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthService } from '../types';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AUTH_SERVICE } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({providedIn:'root'})
export class AuthentificatedGuard implements CanActivate {


  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuth().pipe(
      map((auth) => !auth || this.router.parseUrl('/user'))
    );
  }
}
