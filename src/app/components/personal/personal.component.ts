import { Component, OnInit } from '@angular/core';
import { MyCalendarComponent } from '../my-calendar/my-calendar.component';
import { CommonModule } from '@angular/common';
import { MyBookWorldComponent } from "../my-book-world/my-book-world.component";
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  currentSection: string = '';
  openSection = "importantDates";

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          this.updateCurrentSection();
      }
    });

    // Initial update
    this.updateCurrentSection();
  }

  updateCurrentSection(): void {
    const childRoute = this.route.snapshot.firstChild?.routeConfig?.path;
    this.currentSection = childRoute || 'importantDates';
}

}
