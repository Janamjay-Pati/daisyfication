import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MyCalendarComponent } from "../my-calendar/my-calendar.component";
import { AdventCalendarComponent } from "../advent-calendar/advent-calendar.component";
import { MatButtonModule } from '@angular/material/button';
import { db } from './../../services/firebase.service';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AddNewBookComponent } from '../add-new-book/add-new-book.component';
import { AddNewChapterComponent } from '../add-new-chapter/add-new-chapter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, MyCalendarComponent, AdventCalendarComponent, MatButtonModule, MatSelectModule, MatFormField],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  books: any[] = [];
  selectedBookIndex: number | null = null;
  selectedChapterIndex: number | null = null;
  chapterList: any[] = []
  selectedBookChapters: any[] = [];
  bookTitle = '';
  chapterName = '';

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  openEditor() {
    this.router.navigate(['/editor'], {
      queryParams: {
        bookTitle: this.bookTitle,
        chapterName: this.chapterName,
      }
    });
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
    if (index === -1) {
      this.selectedBookIndex = null; // Reset selection immediately
      this.dialog.open(AddNewBookComponent, {
        width: '500px'
      }).afterClosed().subscribe(async (result) => {
        if (result) {
          this.bookTitle = result;
          await addDoc(collection(db, 'Books'), { title: result, completionPercentage: 0 });
          this.books.push({ title: result });
          // Do NOT select the new book automatically
        }
        // Always reset selection after dialog closes
        this.selectedBookIndex = null;
        this.selectedChapterIndex = null;
      });
      return;
    }
    this.selectedBookIndex = index;
    const selectedBook = this.books[index];
    this.bookTitle = selectedBook.title;
    this.selectedBookChapters = this.chapterList.find(chapter => chapter.bookName === selectedBook.title)?.chapters || [];
    this.selectedChapterIndex = null; // Reset chapter selection when book changes
  }

  onChapterSelect(index: number) {
    if (index === -1) {
      this.selectedChapterIndex = null; // Reset selection immediately
      const selectedBook = this.books[this.selectedBookIndex!];
      const bookTitle = selectedBook.title;

      // Find the Firestore book document by title
      const addChapter = async () => {
        // Get all books to find the correct bookDoc
        const booksSnapshot = await getDocs(collection(db, 'Books'));
        let bookDocId: string | null = null;
        booksSnapshot.forEach(doc => {
          if (doc.data()['title'] === bookTitle) {
            bookDocId = doc.id;
          }
        });

        if (!bookDocId) return;

        this.dialog.open(AddNewChapterComponent, {
          width: '500px'
        }).afterClosed().subscribe(async (result) => {
          if (result && bookDocId) {
            this.chapterName = result;
            // Add chapter to the chapters subcollection of the selected book
            await addDoc(collection(db, 'Books', bookDocId as string, 'chapters'), { name: result, content: '', isCompleted: false });
            // Update local chapter list
            let bookEntry = this.chapterList.find(chapter => chapter.bookName === bookTitle);
            if (bookEntry) {
              bookEntry.chapters.push({ name: result });
            } else {
              this.chapterList.push({
                bookName: bookTitle,
                chapters: [{ name: result }]
              });
            }
            this.selectedBookChapters = this.chapterList.find(chapter => chapter.bookName === bookTitle)?.chapters || [];
          }
        });
      };

      addChapter();
      return;
    } else {
      this.selectedChapterIndex = index;
    }
    const selectedChapter = this.selectedBookChapters[index];
    this.chapterName = selectedChapter.name;
  }

}
