import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginLogoutService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    { provide: HttpClient, useClass: HttpClient },
  ],
})

export class LoginComponent {
  submit = false
  validEmail = false
  validPassword = false
  FormData = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  sendData=false;
  errorFromBackend = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder, private http: HttpClient,
    private LoginLogoutService: LoginLogoutService,
    private router: Router) {}

  sendLogin(event: Event) {
    event.preventDefault();
    this.submit = true;
    if (this.FormData.controls.email.valid) this.validEmail = true
    if (this.FormData.controls.password.valid) this.validPassword = true
    if (
      this.FormData.controls.email.valid &&
      this.FormData.controls.password.valid
    ) {
      this.sendLoginToBackend(this.FormData.controls.email.value as string, this.FormData.controls.password.value as string)

        .pipe(
          tap((response: any) => {
            let localStorage = document.defaultView?.localStorage;
            if (localStorage) {
              localStorage.setItem('token', response.token);
            }
            this.sendData=true;
            setTimeout(() => {
              this.LoginLogoutService.login();
              this.router.navigate(['/filmography']);
            }, 2000);
          }),
          catchError((error: any) => {
            this.errorFromBackend = true;
            return of(error);
          })
        )
        .subscribe();
    }
  }

  sendLoginToBackend(email: string, password: string): Observable<any> {
    const URL = 'https://siehstehnix.sylviazartmann.de/authentication/login/';
    const body = new FormData();
      body.append('email', email);
      body.append('password', password);
    return this.http.post(URL, body);
  }

}


