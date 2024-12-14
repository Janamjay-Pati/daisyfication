import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalComponent } from './components/personal/personal.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { MyBookWorldComponent } from './components/my-book-world/my-book-world.component';
import { AdventCalendarComponent } from './components/advent-calendar/advent-calendar.component';
import { AuthenticationComponent } from './components/authentication/authentication.component'; // Import your Auth component
import { authGuard } from './guards/auth.guard'; // Import the authGuard

export const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent }, // Add the auth route
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard], // Protect the dashboard with authGuard
  },
  {
    path: 'personal',
    component: PersonalComponent,
    canActivate: [authGuard], // Protect the personal route with authGuard
    children: [
      { path: '', redirectTo: 'importantDates', pathMatch: 'full' },
      { path: 'importantDates', component: MyCalendarComponent },
      { path: 'myBookWorld', component: MyBookWorldComponent },
      { path: 'adventCalendar', component: AdventCalendarComponent },
    ],
  },
  { path: '**', redirectTo: 'auth' }, // Redirect all unknown paths to auth
];