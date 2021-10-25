import { NgModule } from '@angular/core';

import { UserAuthComponent } from './form/user-auth.component';
import { AUTH_SERVICE, AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthentificatedGuard } from './services/authentificated.guard';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginMockInterceptor } from './interceptor/login-mock.interceptor';
import { SendTokenInterceptor } from './interceptor/send-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UserAuthComponent, IonicModule],
  declarations: [UserAuthComponent],
  providers: [
    {provide: AUTH_SERVICE, useClass: AuthService},
    {provide: HTTP_INTERCEPTORS, useClass: LoginMockInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true},
    AuthGuard,
    AuthentificatedGuard,
  ],
})
export class UserAuthModule {
}
