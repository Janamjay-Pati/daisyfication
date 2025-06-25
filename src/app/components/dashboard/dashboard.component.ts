import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MyCalendarComponent } from "../my-calendar/my-calendar.component";
import { AdventCalendarComponent } from "../advent-calendar/advent-calendar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, MyCalendarComponent, AdventCalendarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router) {}

}
