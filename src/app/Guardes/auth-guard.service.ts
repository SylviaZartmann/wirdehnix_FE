import { Injectable } from '@angular/core';
import { LoginLogoutService } from '../Services/login.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginLogoutService, private router: Router) { }

  canActivate(): boolean {
    if(!this.login.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}


// auth guard service checkt ob user authentifiziert ist über auth service
// im auth service kann die authentifizierung überprüft werden
// mit token Abfrage aus localstorage
// wenn nicht authentifiziert dann redirect auf login page und return false
// wenn authentifiziert dann return true
//
