import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MyCalendarComponent } from "../my-calendar/my-calendar.component";
import { AdventCalendarComponent } from "../advent-calendar/advent-calendar.component";
import { MatButtonModule } from '@angular/material/button';
import { db } from './../../services/firebase.service';
import { collection, getDocs } from 'firebase/firestore';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, MyCalendarComponent, AdventCalendarComponent, MatButtonModule, MatSelectModule, MatFormField],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  books: any[] = [];
  selectedBookIndex: number | null = null;
  selectedChapterIndex: number | null = null;
  chapterList: any[] = []
  selectedBookChapters: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  openEditor() {
    this.router.navigate(['/editor'])
  }

  async getData() {
    const booksSnapshot = await getDocs(collection(db, 'Books'));
    for (const bookDoc of booksSnapshot.docs) {
      if (bookDoc.exists()) {
        this.books.push(bookDoc.data());

        // Get chapters subcollection for this book
        const chaptersRef = collection(db, 'Books', bookDoc.id, 'chapters');
        const chaptersSnapshot = await getDocs(chaptersRef);
        chaptersSnapshot.forEach((chapterDoc) => {
          if (chapterDoc.exists()) {
            const bookName = bookDoc.data()['title'];
            const chapterData = chapterDoc.data();

            let bookEntry = this.chapterList.find(chapter => chapter.bookName === bookName);
            if (bookEntry) {
              // If chapters is not an array, initialize it
              if (!Array.isArray(bookEntry.chapters)) {
                bookEntry.chapters = [];
              }
              bookEntry.chapters.push(chapterData);
            } else {
              this.chapterList.push({
                bookName: bookName,
                chapters: [chapterData]
              });
            }
          }
        });
      }
    }
  }

  onBookSelect(index: number) {
    this.selectedBookIndex = index;
    const selectedBook = this.books[index];
    this.selectedBookChapters = this.chapterList.find(chapter => chapter.bookName === selectedBook.title)?.chapters || [];
    this.selectedChapterIndex = null; // Reset chapter selection when book changes
  }

  onChapterSelect(index: number) {
    this.selectedChapterIndex = index;
    console.log('Selected Chapter:', index);
  }

}
