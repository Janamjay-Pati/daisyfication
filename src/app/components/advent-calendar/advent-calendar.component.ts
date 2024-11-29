import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-advent-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advent-calendar.component.html',
  styleUrls: ['./advent-calendar.component.scss']
})
export class AdventCalendarComponent implements AfterViewInit {
  // Array of 36 cards, each with an image path
  cards = [
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg` },
  ]

  // Generate an array of month names
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  @ViewChildren('stars', { read: ElementRef })
  stars!: QueryList<ElementRef>; // Use ElementRef to access nativeElement


  ngAfterViewInit() {
    // Wait until all view children are initialized
    this.stars.forEach((starContainerRef) => {
      const stars = starContainerRef.nativeElement.querySelectorAll('.star');
      const cardIndex = starContainerRef.nativeElement.getAttribute('data-card-index');  // Get the card index

      // Add hover event to each star within the card
      stars.forEach((star: any, starIndex: any) => {
        star.addEventListener('mouseenter', () => {
          console.log('Hovered on Card:', cardIndex, 'Star:', starIndex + 1); // Display which card and star is hovered
          // Add the "lit-up" class to the hovered star and all previous stars within the same card
          for (let i = 0; i <= starIndex; i++) {
            stars[i].classList.add('lit-up');
          }
        });

        star.addEventListener('mouseleave', () => {
          // Remove the "lit-up" class from all stars within the same card
          for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('lit-up');
          }
        });
      });
    });
  }

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