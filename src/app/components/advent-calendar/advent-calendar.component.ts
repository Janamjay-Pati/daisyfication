import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advent-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advent-calendar.component.html',
  styleUrl: './advent-calendar.component.scss'
})
export class AdventCalendarComponent {
  // Array with 36 cards, each with an image path
  cards = Array.from({ length: 36 }, (_, i) => ({
    image: `/assets/Nyssa.jpeg` // Make sure the image files exist in the assets folder
  }));

  // To track if the gift has been unwrapped
  isUnwrapped = false;

  // Method to trigger unwrap animation
  unwrapGift(index: number): void {
    console.log('Unwrapping gift at index:', index); // Debugging log
    const giftWrap = document.querySelectorAll('.gift-wrap')[index] as HTMLElement;
    if (giftWrap) {
      giftWrap.classList.add('animate'); // Add animation class
      setTimeout(() => {
        this.isUnwrapped = true; // Update state after animation
      }, 600);
    }
  }

}
