import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-pw',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './reset-pw.component.html',
  styleUrl: './reset-pw.component.scss',
  providers: [{ provide: HttpClient, useClass: HttpClient }],
})

export class ResetPwComponent {

  ChangeData = this.fb.group({
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
  validPW: boolean = false;
  validconfPW: boolean = false;
  backendValidPassword: boolean = false;
  dict_token:any;
  token: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // HIER NUR ÄNDERN DES PW

  resetPW(event: Event) {
    this.submit = true;
    event.preventDefault();
    this.validateInputs(
      this.ChangeData.controls.password,
      this.ChangeData.controls.conf_password
    );

    // setTimeout(() => {
    //   this.submit = false;
    // }, 5000);

    if (this.validPW && this.validconfPW && this.validPW === this.validconfPW) {
      this.dict_token = this.route.params.pipe(map(params => params['token']));
      this.token = this.dict_token.source._value['token'];
      this.sendChangesToBackend(
        this.token as string,
        this.ChangeData.controls.password.value as string,
        this.ChangeData.controls.conf_password.value as string
      )
      .pipe(
          tap((response: any) => {
            this.backendValidPassword = true;
            this.sendData = true;
            setTimeout(() => {
              this.router.navigate(['/login']);
              this.backendValidPassword = false;
            }, 3000);
          }),
          catchError((error: any) => {
            this.sendData = false;
            if (error.error.includes('Email'))
              this.backendValidPassword = false;
            return of(error);
          })
        )
        .subscribe();
      };
    }


  validateInputs(password: any, conf_password: any) {
    if (password.invalid) this.validPW = false;
    else this.validPW = true;
    if (conf_password.invalid) this.validconfPW = false;
    else this.validconfPW = true;
    if (password.value !== conf_password.value) this.validconfPW = false;
    else this.validconfPW = true;
  }


  sendChangesToBackend(token: string, password: string, conf_password: string): Observable<any> {
    const URL = `https://siehstehnix.sylviazartmann.de/authentication/changePW/confirm/${token}/`;
    const data = {
      token: token,
      password: password,
      conf_password: conf_password,
    };
    // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      // });
    return this.http.post(URL, data); //{ headers: headers, params: data }
  }
}


// Marijan Code

// async resetPassword() {
//   this.route.params.subscribe(async params => {
//     const url = environment.baseUrl + '/resetPassword/' + params['token'] + '/';
//     const data = {
//       pw1: this.password,
//       pw2: this.password2
//     };
//     let response = await lastValueFrom(this.http.post(url, data));
//     if((response as any).message === 'Passwort stimmt nicht mit Passwort2 überein!') {
//       this.setErrorMessage('Passwort stimmt nicht mit Passwort2 überein!', response);
//     } else {
//       this.setErrorMessage('Passwort erfolgreich geändert! Du wirst zum Login weitergeleitet', response);
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 3000);
//     }
//   });
// }
