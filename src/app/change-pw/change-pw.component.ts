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

  // HIER NUR EMAIL SENDEN VOM EMAIL SENDER
  changePW (event: Event) {
    this.submit = true;
    event.preventDefault();
    this.validateInputs(this.ChangeData.controls.email);

    setTimeout(() => {
      this.submit = false;
    }, 5000);

    if (this.validEmail) {
      this.sendChangesToBackend(this.ChangeData.controls.email.value as string)
        .pipe(
          tap((response: any) => {
            // localStorage.setItem('token', response.token);
            this.backendValidEmail = true;
            this.sendData=true;
            setTimeout(() => {
              this.router.navigate(['/login']);
              this.backendValidEmail = false;
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

  validateInputs(email:any) {
    if (email.invalid) this.validEmail = false;
      else this.validEmail = true;
  }

  sendChangesToBackend(email: string): Observable<any> {
    const URL = `https://siehstehnix.sylviazartmann.de/authentication/mailresetPW/`;
    const data = {
      email: email,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(URL, JSON.stringify(data), { headers: headers });
  }
}
