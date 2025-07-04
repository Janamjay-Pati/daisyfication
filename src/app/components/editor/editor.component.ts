import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillEditorComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  content = '';
  modules = {
    toolbar: {
      container: '#custom-toolbar'
    }
  };
  focusMode = false;
  wordCount = 0;
  charCount = 0;

  toggleFocusMode() {
    this.focusMode = !this.focusMode;
  
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

  ngOnInit() {
    // Listen to changes and update word/char count
    setInterval(() => {
      const text = this.stripHtml(this.content || '');
      this.wordCount = text.trim().split(/\s+/).filter(w => w).length;
      this.charCount = text.length;
    }, 500);

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.focusMode = false;
      }
    });
  }

  stripHtml(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

}
