import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface IAuthService {
  isAuth(): Observable<boolean>;

  auth(login: string, pass: string): Observable<ITokenResponse>;

  save(token: string): Observable<ITokenResponse>;

  getToken(): Observable<string>;

  delete(): Observable<boolean>;
}

export interface ITokenResponse {
  token?: string;
  error?: string;
}
