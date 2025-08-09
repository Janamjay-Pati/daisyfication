import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-book',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatFormField, FormsModule, MatInputModule],
  templateUrl: './add-new-book.component.html',
  styleUrl: './add-new-book.component.scss'
})
export class AddNewBookComponent {
  bookTitle = '';

  constructor(
    private dialogRef: MatDialogRef<AddNewBookComponent>,
    private snackBar: MatSnackBar
  ) {}

  save() {
    if (this.bookTitle.trim()) {
      this.dialogRef.close(this.bookTitle);
    } else {
      this.snackBar.open('Book title cannot be empty', 'Dismiss', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
