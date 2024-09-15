import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent {
  importantDates = [
    // Birthdays
    new Date('2024-09-16'),
    new Date('2024-07-19'),
    new Date('2024-05-1'),
    new Date('2024-01-5'),
    new Date('2024-06-9'),
    new Date('2024-05-7'),
    new Date('2024-10-21'),
    new Date('2024-07-22'),
    new Date('2024-02-7'),
    new Date('2024-04-3'),
    new Date('2024-12-23'),
    new Date('2024-08-24'),
    new Date('2024-07-3'),
    new Date('2024-12-7'),
    new Date('2024-09-1'),
    new Date('2024-12-30'),
    new Date('2024-10-13'),
    new Date('2024-12-4'),
    new Date('2024-09-12'),
    new Date('2024-02-18'),
    new Date('2024-03-9'),
    new Date('2024-11-14'),
    
    // Anniversary's
    new Date('2024-09-5'),
    new Date('2024-09-2'),
    new Date('2024-02-21'),
    new Date('2024-06-17'),
    new Date('2024-06-13'),
    new Date('2024-05-31'),
    new Date('2024-02-25'),
    new Date('2024-12-10'),
  ];

  importantDates1 = [
    // Birthdays
    {date: new Date('2024-09-16'), desc: "My Birthday"},
    {date: new Date('2024-07-19'), desc: "Janam's Birthday"},
    {date: new Date('2024-05-1'), desc: "Nisha Di's Birthday"},
    {date: new Date('2024-01-5'), desc: "Kiyansh's Birthday"},
    {date: new Date('2024-06-9'), desc: "Souj and Anujna's Birthday"},
    {date: new Date('2024-05-7'), desc: "Anusha's Birthday"},
    {date: new Date('2024-10-21'), desc: "Manisha's Birthday"},
    {date: new Date('2024-07-22'), desc: "Krishna's Birthday"},
    {date: new Date('2024-02-7'), desc: "Abhijna's Birthday"},
    {date: new Date('2024-04-3'), desc: "Suraksha's Birthday"},
    {date: new Date('2024-12-23'), desc: "Harshitha's Birthday"},
    {date: new Date('2024-08-24'), desc: "Deekshitha's Birthday"},
    {date: new Date('2024-07-3'), desc: "Nanami's Birthday"},
    {date: new Date('2024-12-7'), desc: "Gojo's Birthday"},
    {date: new Date('2024-09-1'), desc: "Jk's Birthday"},
    {date: new Date('2024-12-30'), desc: "V's Birthdatay"},
    {date: new Date('2024-10-13'), desc: "Jimin's Birthday"},
    {date: new Date('2024-12-4'), desc: "Jin's Birthday"},
    {date: new Date('2024-09-12'), desc: "RM's Birthday"},
    {date: new Date('2024-02-18'), desc: "JHope's Birthday"},
    {date: new Date('2024-03-9'), desc: "Suga's Birthday"},
    {date: new Date('2024-11-14'), desc: "Guru Bhaiya's Birthday"},
    
    // Anniversary's
    {date: new Date('2024-09-5'), desc: "Our Anniversary"},
    {date: new Date('2024-09-2'), desc: "I Love you Day"},
    {date: new Date('2024-02-21'), desc: "My Work Anniversary"},
    {date: new Date('2024-06-17'), desc: "Janam's Work Anniversary"},
    {date: new Date('2024-06-13'), desc: "BTS Anniversary"},
    {date: new Date('2024-05-31'), desc: "Dad Mom's Marriage Anniversary"},
    {date: new Date('2024-12-10'), desc: "Maternal Uncle Aunt's Marriage Anniversary"},
    {date: new Date('2024-02-25'), desc: "Souj's Work Anniversary"},
  ];

  months = [
    { name: 'January', days: this.generateMonthDays(1) },
    { name: 'February', days: this.generateMonthDays(2) },
    { name: 'March', days: this.generateMonthDays(3) },
    { name: 'April', days: this.generateMonthDays(4) },
    { name: 'May', days: this.generateMonthDays(5) },
    { name: 'June', days: this.generateMonthDays(6) },
    { name: 'July', days: this.generateMonthDays(7) },
    { name: 'August', days: this.generateMonthDays(8) },
    { name: 'September', days: this.generateMonthDays(9) },
    { name: 'October', days: this.generateMonthDays(10) },
    { name: 'November', days: this.generateMonthDays(11) },
    { name: 'December', days: this.generateMonthDays(12) }
  ];

  generateMonthDays(month: number) {
    // Generate days for each month, taking into account the number of days
    const days = [];
    const date = new Date(2024, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (this.isImportantDate(new Date(date))) {
        days.push({ day: date.getDate(), date: new Date(date), desc: this.setDesc(new Date(date)) });
      } else {
        days.push({ day: date.getDate(), date: new Date(date) });
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  isImportantDate(date: Date): boolean {
    return this.importantDates.some(d => 
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    );
  }

  setDesc(date: Date) {
    return this.importantDates1.find(importantDate => {
      return importantDate.date.getFullYear() === date.getFullYear() &&
      importantDate.date.getMonth() === date.getMonth() &&
      importantDate.date.getDate() === date.getDate()
    })?.desc;
  }

  showDateDetails(date: Date) {
    console.log(`Details for ${date.toDateString()}`);
  }
}
