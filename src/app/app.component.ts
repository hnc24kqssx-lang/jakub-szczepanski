import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './components/loading-screen.component';
import { NavbarComponent } from './components/navbar.component';
import { CookieBannerComponent } from './components/cookie-banner.component';
import { BackToTopComponent } from './components/back-to-top.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoadingScreenComponent,
    NavbarComponent,
    CookieBannerComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title = 'portfolio';
}
