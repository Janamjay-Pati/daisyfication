import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advent-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advent-calendar.component.html',
  styleUrls: ['./advent-calendar.component.scss']
})
export class AdventCalendarComponent {
  // Array of 36 cards, each with an image path
  cards = Array.from({ length: 36 }, (_, i) => ({
    image: `/assets/Nyssa.jpeg`
  }));

  // Generate an array of month names
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Group cards into rows (e.g., one row per month)
  groupedCards: { image: string }[][] = this.cards.reduce((rows, card, index) => {
    const rowIndex = Math.floor(index / 3); // Adjust 3 to the number of columns per row
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(card);
    return rows;
  }, [] as { image: string }[][]); // Explicitly type as an array of arrays of card objects

  // Unwrap a gift card
  unwrapGift(rowIndex: number, cardIndex: number): void {
    console.log(`Unwrapping gift at row ${rowIndex}, card ${cardIndex}`);
    const giftWrap = document.querySelectorAll('.gift-wrap')[rowIndex * 3 + cardIndex] as HTMLElement;
    if (giftWrap) {
      giftWrap.classList.add('animate');
      setTimeout(() => {
        console.log('Gift unwrapped!');
      }, 600);
    }
  }
}