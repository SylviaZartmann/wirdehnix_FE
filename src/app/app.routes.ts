import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VideopageComponent } from './videopage/videopage.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ImprintComponent } from './imprint/imprint.component';
import { WelcomeComponent } from './welcome/welcome.component';

 export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'videopage', component: VideopageComponent},
  {path: 'privacy-policy', component: LegalNoticeComponent},
  {path: 'legal-notice', component: ImprintComponent},
];
