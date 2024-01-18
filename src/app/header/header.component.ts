import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginLogoutService } from '../Services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = true;

  constructor(private LoginLogoutService: LoginLogoutService) {
    this.LoginLogoutService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  isToken() {
    if (localStorage.getItem('token')) return true;
    else return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.LoginLogoutService.logout();
  }
}
