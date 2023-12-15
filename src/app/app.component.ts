import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { VideopageComponent } from './videopage/videopage.component';
import { FooterComponent } from "./footer/footer.component";
import { RegisterComponent } from "./register/register.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeaderComponent, LoginComponent, ImprintComponent, LegalNoticeComponent, VideopageComponent, FooterComponent, RegisterComponent]
})
export class AppComponent {
  title = 'wirdehnix_FE';
}
