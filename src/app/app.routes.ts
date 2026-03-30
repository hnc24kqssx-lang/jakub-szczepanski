import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { ContactPageComponent } from './pages/contact-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'kontakt', component: ContactPageComponent },
  { path: 'polityka-prywatnosci', component: PrivacyPageComponent },
  { path: '**', redirectTo: '' },
];
