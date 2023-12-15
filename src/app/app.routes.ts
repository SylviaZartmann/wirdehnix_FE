import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VideopageComponent } from './videopage/videopage.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'videopage', component: VideopageComponent},
  {path: 'legal-notice', component: LegalNoticeComponent},
  {path: 'imprint', component: ImprintComponent},
];
