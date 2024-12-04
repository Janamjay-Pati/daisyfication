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
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 1 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 4 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
    { name: 'The Duchess Deal', image: `/assets/The_Duchess_Deal.jpeg`,rating: 0 },
  ]

  // Generate an array of month names
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  @ViewChildren('stars', { read: ElementRef })
  stars!: QueryList<ElementRef>; // Use ElementRef to access nativeElement


  ngAfterViewInit() {
    this.stars.forEach((starContainerRef) => {
      const cardIndex = parseInt(starContainerRef.nativeElement.getAttribute('data-card-index'), 10);
      const card = this.cards[cardIndex]; // Get the corresponding card
      const stars = starContainerRef.nativeElement.querySelectorAll('.star');
      if (card.rating > 0) {
        // Add the "lit-up" class to the preselected stars
        for (let i = 0; i < card.rating; i++) {
          stars[i].classList.add('lit-up');
        }
      }
  
      // Add hover and click events
      stars.forEach((star: HTMLElement, starIndex: number) => {
        star.addEventListener('mouseenter', () => {
          for (let i = 0; i <= starIndex; i++) {
            stars[i].classList.add('lit-up');
          }
        });
  
        star.addEventListener('mouseleave', () => {
          for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('lit-up');
          }
  
          // Reapply the rating after hover ends
          for (let i = 0; i < card.rating; i++) {
            stars[i].classList.add('lit-up');
          }
        });
      });
    });
  }
  
  selectStars(globalCardIndex: number, selectedStars: number): void {
    console.log(`Global Card Index: ${globalCardIndex}, Selected Stars: ${selectedStars}`);
    
    // Update the card's rating
    this.cards[globalCardIndex].rating = selectedStars;
  
    // Clear and reapply the "lit-up" class based on the new rating
    const cardStars = this.stars.find(
      (ref) => parseInt(ref.nativeElement.getAttribute('data-card-index'), 10) === globalCardIndex
    );
    
    if (cardStars) {
      const starElements = cardStars.nativeElement.querySelectorAll('.star');
      starElements.forEach((star: HTMLElement, index: number) => {
        if (index < selectedStars) {
          star.classList.add('lit-up');
        } else {
          star.classList.remove('lit-up');
        }
      });
    }
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