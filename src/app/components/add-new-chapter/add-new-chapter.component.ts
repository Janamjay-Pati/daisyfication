import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-chapter',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatFormField, FormsModule, MatInputModule],
  templateUrl: './add-new-chapter.component.html',
  styleUrl: './add-new-chapter.component.scss'
})
export class AddNewChapterComponent {
  chapterName = '';

  constructor(
    private dialogRef: MatDialogRef<AddNewChapterComponent>,
    private snackBar: MatSnackBar
  ) {}

  save() {
    if (this.chapterName.trim()) {
      this.dialogRef.close(this.chapterName);
    } else {
      this.snackBar.open('Chapter Name cannot be empty', 'Dismiss', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
