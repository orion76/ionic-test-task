import { Injectable, InjectionToken } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAuthService, ITokenResponse } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { log } from '../../../../utils/rxjs.util';
import { authConfig } from '../auth.config';

export const AUTH_SERVICE = new InjectionToken('AUTH_SERVICE');


@Injectable({providedIn: 'root'})
export class AuthService implements IAuthService {

  storageId = 'auth_token';


  constructor(private storage: Storage, private http: HttpClient) {
  }

  getToken(): Observable<string> {
    return fromPromise(this.storage.get(this.storageId));
  }

  isAuth(): Observable<boolean> {
    return this.getToken().pipe(map(Boolean));
  }

  save(tokenResponse: string): Observable<ITokenResponse> {
    return fromPromise(this.storage.set(this.storageId, tokenResponse)).pipe(
      map((token) => ({token}))
    );
  }

  delete(): Observable<boolean> {
    return fromPromise(this.storage.remove(this.storageId)).pipe(map(Boolean));
  }

  auth(login: string, pass: string): Observable<ITokenResponse> {
    return this.http.post(authConfig.loginUrl, {login, pass})
      .pipe(
        catchError((error) => of(error)),
        switchMap((token: any) => {
          if (token instanceof HttpErrorResponse) {
            console.warn(token);
            const error = token.error;
            return of({error});
          } else {
            return this.save(token);
          }
        }),
      );
  }
}
