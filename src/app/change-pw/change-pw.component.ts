import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';import {
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-change-pw',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './change-pw.component.html',
  styleUrl: './change-pw.component.scss',
  providers: [{ provide: HttpClient, useClass: HttpClient }],
})
export class ChangePWComponent {
  ChangeData = this.fb.group({
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
  validEmail: boolean = false;
  validPW: boolean = false;
  validconfPW: boolean = false;

  backendValidEmail: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  changePW (event: Event) {
    this.submit = true;
    event.preventDefault();

    this.validateInputs(
      this.ChangeData.controls.email,
      this.ChangeData.controls.password,
      this.ChangeData.controls.conf_password
      );
    setTimeout(() => {
      this.submit = false;
      this.backendValidEmail = true;
    }, 5000);

    if (
      this.validEmail &&
      this.validPW &&
      this.validconfPW &&
      this.validPW === this.validconfPW
    ) {
      this.sendCahngesToBackend(
        this.ChangeData.controls.email.value as string,
        this.ChangeData.controls.password.value as string,
        this.ChangeData.controls.conf_password.value as string
      )
        .pipe(
          tap((response: any) => {
            // localStorage.setItem('token', response.token);
            console.log(response);
            this.sendData=true;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }),
          catchError((error: any) => {
            this.sendData = false;
            if (error.error.includes("Email")) this.backendValidEmail = false;
            return of(error);
          })
        )
        .subscribe();
      }
  }

  validateInputs(email:any, password:any, conf_password:any) {
    if (email.invalid) this.validEmail = false;
      else this.validEmail = true;
    if (password.invalid)this.validPW = false;
      else this.validPW = true;
    if (conf_password.invalid) this.validconfPW = false;
      else this.validconfPW = true;
    if (password.value !== conf_password.value) this.validconfPW = false;
      else this.validconfPW = true;
  }

  sendCahngesToBackend(email: string, password: string, conf_password: string): Observable<any> {
    const URL = 'https://siehstehnix.sylviazartmann.de/authentication/changePW/';
    const data = {
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
