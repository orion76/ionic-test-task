import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { authConfig } from '../auth.config';

@Injectable({providedIn: 'root'})
export class LoginMockInterceptor implements HttpInterceptor {

  passHash = 'f4cc6f502df87723ccbed2e188da5ee3';
  salt = 'ypAGXTepSwJzzADA4I9GeoqErwrJvVXbkFaS135h3HveQDCnALSAAi5cdgEiPNBS';

  constructor(public router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.login(request, next);
  }


  login(request: HttpRequest<any>, next: HttpHandler): any {

    const {url} = request;
    let ret: any;
    if (url.startsWith(authConfig.loginUrl)) {
      const {login, pass} = request.body;
      if (this.checkPass(pass)) {
        const token = this.generateToken(login, pass);
        ret = of(new HttpResponse({status: 200, body: {token}}));
      } else {
        const error = 'Incorrect login or password';
        throw new HttpErrorResponse({
          error,
          status: 403,
          statusText: 'Auth Error',
        });
      }
    } else {
      ret = next.handle(request);
    }
    return ret;
  }

  checkPass(pass): boolean {
    const md5 = new Md5();
    md5.appendAsciiStr(pass);
    md5.appendAsciiStr(this.salt);
    return this.passHash === md5.end();
  }

  generateToken(login: string, pass: string): string {
    const md5 = new Md5();
    md5.appendAsciiStr(pass);
    md5.appendAsciiStr(this.salt);
    md5.appendAsciiStr(String(Date.now()));
    return md5.end() as string;

  }

}


