import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './../../services/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, QuillEditorComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  content = '';
  selectedColor = '#000000';
  toolbarHidden = false;
  modules = {
    toolbar: {
      container: '#custom-toolbar'
    }
  };
  focusMode = false;
  wordCount = 0;
  charCount = 0;
  bookTitle = '';
  chapterName = '';
  chapterDocId: string | null = null;
  bookDocId: string | null = null;
  @ViewChild(QuillEditorComponent) quillEditorComponent!: QuillEditorComponent;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Listen to changes and update word/char count
    setInterval(() => {
      const text = this.stripHtml(this.content || '');
      this.wordCount = text.trim().split(/\s+/).filter(w => w).length;
      this.charCount = text.length;
    }, 500);

    // Get query params for book and chapter
    this.route.queryParams.subscribe(async params => {
      this.bookTitle = params['bookTitle'];
      this.chapterName = params['chapterName'];

      // Find bookDocId
      const booksSnapshot = await getDocs(collection(db, 'Books'));
      booksSnapshot.forEach(doc => {
        if (doc.data()['title'] === this.bookTitle) {
          this.bookDocId = doc.id;
        }
      });

      if (this.bookDocId) {
        // Find chapterDocId
        const chaptersSnapshot = await getDocs(collection(db, 'Books', this.bookDocId, 'chapters'));
        chaptersSnapshot.forEach(doc => {
          if (doc.data()['name'] === this.chapterName) {
            this.chapterDocId = doc.id;
            this.content = doc.data()['content'] || '';
          }
        });
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.focusMode = false; // User exited fullscreen (possibly via Escape)
        this.toolbarHidden = false; // Show toolbar again
      }
    });
  }

  onBackArrowClick(focusMode: boolean) {
    if (focusMode) {
      this.toggleFocusMode();
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleFocusMode() {
    this.focusMode = !this.focusMode;
    this.toolbarHidden = this.focusMode;
  
    const el = document.documentElement;
  
    if (this.focusMode) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
      else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen();
    }
  }

  openOptions() {
    this.toolbarHidden = !this.toolbarHidden;
  }

  stripHtml(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  applyColor(event: any) {
    const color = event.target.value;
    const quillEditor = this.quillEditorComponent?.quillEditor;
    if (quillEditor) {
      const range = quillEditor.getSelection();
      if (range && range.length > 0) {
        quillEditor.format('color', color);
      } else {
        // Set color for future input
        quillEditor.format('color', color);
      }
    }
  }

  async save() {
    if (this.bookDocId && this.chapterDocId) {
      const chapterRef = doc(db, 'Books', this.bookDocId, 'chapters', this.chapterDocId);
      await updateDoc(chapterRef, { content: this.content });
      this.snackBar.open('Chapter saved successfully!', 'Dismiss', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
      this.snackBar.open('Error saving chapter. Please try again.', 'Dismiss', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

}
