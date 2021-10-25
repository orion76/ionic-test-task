import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTH_SERVICE } from '../services/auth.service';
import { IAuthService } from '../types';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: [null, [Validators.required]],
      pass: [null, [Validators.required]],
    });
  }

  login() {
    const {login, pass} = this.form.value;
    this.authService.auth(login, pass)
      .pipe(take(1))
      .toPromise().then((result) => {
      if (result.error) {
        this.error = result.error;
      } else {
        this.router.navigate(['user', 'containers']);
      }
    });
  }
}
