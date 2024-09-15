import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalComponent } from './components/personal/personal.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'personal', component: PersonalComponent },
];
