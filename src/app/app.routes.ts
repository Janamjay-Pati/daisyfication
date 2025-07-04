import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component'; // Import your Auth component
import { authGuard } from './guards/auth.guard'; // Import the authGuard
import { EditorComponent } from './components/editor/editor.component';

export const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent }, // Add the auth route
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard], // Protect the dashboard with authGuard
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  { path: '**', redirectTo: 'auth' }, // Redirect all unknown paths to auth
];