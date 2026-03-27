import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'polityka-prywatnosci', component: PrivacyPageComponent },
  { path: '**', redirectTo: '' },
];
