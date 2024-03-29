import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-check',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './register-check.component.html',
  styleUrl: './register-check.component.scss',
  providers: [{ provide: HttpClient, useClass: HttpClient }],
})
export class RegisterCheckComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      if (token) {
        const url = `https://siehstehnix.sylviazartmann.de/authentication/register/confirm/${token}/`;
        lastValueFrom(this.http.get(url));
        setTimeout(() => window.location.href = '/login', 3000);
      } else {
        console.error('Token not found in URL');
      }
    });
  }
}
