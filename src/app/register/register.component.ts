import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [{ provide: HttpClient, useClass: HttpClient }],
})
export class RegisterComponent {
  FormData = this.fb.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    conf_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  submit: boolean = false;
  sendData: boolean = false;
  errorFromBackend: boolean = true;
  validUsername: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validPassword2: boolean = true;

  backendValidUsername: boolean = true;
  backendValidEmail: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  sendRegister(event: Event) {
    this.submit = true;

    event.preventDefault();
    this.validateInputs(
      this.FormData.controls.username,
      this.FormData.controls.email,
      this.FormData.controls.password,
      this.FormData.controls.conf_password
      );
    setTimeout(() => {
      this.submit = false;
      this.backendValidUsername = true;
      this.backendValidEmail = true;
    }, 5000);

    if (
      this.validUsername &&
      this.validEmail &&
      this.validPassword &&
      this.validPassword2 &&
      this.validPassword === this.validPassword2
    ) {
      this.sendRegisterToBackend(
        this.FormData.controls.username.value as string,
        this.FormData.controls.email.value as string,
        this.FormData.controls.password.value as string,
        this.FormData.controls.conf_password.value as string
      )
        .pipe(
          tap((response: any) => {
            localStorage.setItem('token', response.token);
            this.sendData=true;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }),
          catchError((error: any) => {
            this.sendData = false;
            if (error.error.includes("Username")) this.backendValidUsername = false;
            if (error.error.includes("Email")) this.backendValidEmail = false;
            return of(error);
          })
        )
        .subscribe();
      }
  }

  validateInputs(username:any, email:any, password:any, conf_password:any) {
    if (username.invalid) this.validUsername = false;
      else this.validUsername = true;
    if (email.invalid) this.validEmail = false;
      else this.validEmail = true;
    if (password.invalid)this.validPassword = false;
      else this.validPassword = true;
    if (conf_password.invalid) this.validPassword2 = false;
      else this.validPassword2 = true;
    if (password.value !== conf_password.value) this.validPassword2 = false;
      else this.validPassword2 = true;
  }

  sendRegisterToBackend(
    username: string,
    email: string,
    password: string,
    conf_password: string
  ): Observable<any> {
    const URL = 'http://127.0.0.1:8000/authentication/register/';
    const data = {
      username: username,
      email: email,
      password: password,
      conf_password: conf_password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(URL, JSON.stringify(data), { headers: headers });
  }
}

// senden als JSON

// sendRegisterToBackend(username:string, email: string, password: string, conf_password: string): Observable<any> {
//   console.log(username, email, password, conf_password); // wir sind da
//   const URL = 'http://127.0.0.1:8000/authentication/register/';
// const body = new FormData();
//   body.append('username', username);
//   body.append('email', email);
//   body.append('password', password);
//   body.append('conf_password', conf_password);
//   console.log('body', body);
//   return this.http.post(URL, body);
// }
