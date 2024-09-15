import { Component } from '@angular/core';
import { MyCalendarComponent } from '../my-calendar/my-calendar.component';
import { CommonModule } from '@angular/common';
import { MyBookWorldComponent } from "../../my-book-world/my-book-world.component";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [MyCalendarComponent, CommonModule, MyBookWorldComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent {
  openSection = "importantDates";

  toggleSection(section: string) {
    this.openSection = section;
  }

  isSectionSelected(section: string) {
    return this.openSection === section;
  }

}
