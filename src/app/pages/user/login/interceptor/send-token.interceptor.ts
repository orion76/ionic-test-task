import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthService } from '../types';
import { AUTH_SERVICE } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { authConfig } from '../auth.config';

@Injectable({providedIn: 'root'})
export class SendTokenInterceptor implements HttpInterceptor {

  passHash = '';
  salt = '';

  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sentToken(request, next);
  }


  sentToken(request: HttpRequest<any>, next: HttpHandler): any {
    const {url} = request;

    if (!url.startsWith(authConfig.loginUrl)) {
      return next.handle(request);
    }


    return this.authService.getToken().pipe(
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(request);
        } else {
          const error = 'Authorization is needed';
          return of(new HttpResponse({status: 401, body: {error}}));
        }
      })
    );
  }


}


