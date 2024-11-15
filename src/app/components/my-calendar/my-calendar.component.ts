import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { db } from './../../services/firebase.service';
import { collection, getDocs } from 'firebase/firestore';

interface ImportantDate {
  date: number;  // Day of the month
  desc: string;  // Description
}

interface Month {
  name: string;
  monthCount: number;
  days: number;
  importantDates: ImportantDate[]; // Now TypeScript knows this is an array of ImportantDate objects
}

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})

export class MyCalendarComponent implements OnInit {
  months: Month[] = [
    { name: 'January', monthCount: 0, days: new Date(new Date().getFullYear(), 1, 0).getDate(), importantDates: [] }, // January
    { name: 'February', monthCount: 1, days: new Date(new Date().getFullYear(), 2, 0).getDate(), importantDates: [] }, // February
    { name: 'March', monthCount: 2, days: new Date(new Date().getFullYear(), 3, 0).getDate(), importantDates: [] }, // March
    { name: 'April', monthCount: 3, days: new Date(new Date().getFullYear(), 4, 0).getDate(), importantDates: [] }, // April
    { name: 'May', monthCount: 4, days: new Date(new Date().getFullYear(), 5, 0).getDate(), importantDates: [] }, // May
    { name: 'June', monthCount: 5, days: new Date(new Date().getFullYear(), 6, 0).getDate(), importantDates: [] }, // June
    { name: 'July', monthCount: 6, days: new Date(new Date().getFullYear(), 7, 0).getDate(), importantDates: [] }, // July
    { name: 'August', monthCount: 7, days: new Date(new Date().getFullYear(), 8, 0).getDate(), importantDates: [] }, // August
    { name: 'September', monthCount: 8, days: new Date(new Date().getFullYear(), 9, 0).getDate(), importantDates: [] }, // September
    { name: 'October', monthCount: 9, days: new Date(new Date().getFullYear(), 10, 0).getDate(), importantDates: [] }, // October
    { name: 'November', monthCount: 10, days: new Date(new Date().getFullYear(), 11, 0).getDate(), importantDates: [] }, // November
    { name: 'December', monthCount: 11, days: new Date(new Date().getFullYear(), 12, 0).getDate(), importantDates: [] } // December
  ];
  
  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const importantDates: { monthCount: number, date: any; desc: any }[] = [];
    const querySnapshot = await getDocs(collection(db, 'ImportantDates'));
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        importantDates.push({ monthCount: data['date'].toDate().getMonth(), date: data['date'].toDate().getDate(), desc: data['description'] })
      }
    });
    this.setImportantDates(importantDates);
  }

  setImportantDates(importantDates: any[]) {
    this.months.forEach(month => {
      importantDates.forEach(importantDate => {
        if (importantDate.monthCount === month.monthCount) {
          month.importantDates.push({ date: importantDate.date, desc: importantDate.desc })
        }
      })
    })
  }

  isImportantDate(monthCount: number, date: number): boolean {
    for (const month of this.months) {
      if (month.monthCount === monthCount) {
        for (const importantDate of month.importantDates) {
          if (importantDate.date === date) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getImportantDateDescription(monthCount: number, date: number) {
    for (const month of this.months) {
      if (month.monthCount === monthCount) {
        for (const importantDate of month.importantDates) {
          if (importantDate.date === date) {
            return importantDate.desc;
          }
        }
      }
    }
    return null;
  }
}
