import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalComponent } from './components/personal/personal.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { MyBookWorldComponent } from './components/my-book-world/my-book-world.component';
import { AdventCalendarComponent } from './components/advent-calendar/advent-calendar.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: 'personal',
        component: PersonalComponent,
        children: [
            { path: '', redirectTo: 'importantDates', pathMatch: 'full' },
            { path: 'importantDates', component: MyCalendarComponent },
            { path: 'myBookWorld', component: MyBookWorldComponent },
            { path: 'adventCalendar', component: AdventCalendarComponent }
        ],
    },
];