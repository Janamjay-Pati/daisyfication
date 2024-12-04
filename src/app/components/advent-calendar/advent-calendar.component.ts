import { CommonModule } from '@angular/common';
import { OnInit, AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.service';

interface Card {
  name: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-advent-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advent-calendar.component.html',
  styleUrls: ['./advent-calendar.component.scss']
})
export class AdventCalendarComponent implements OnInit, AfterViewInit {
  cards: Card[] = [];
  groupedCards: Card[][] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  @ViewChildren('stars', { read: ElementRef })
  stars!: QueryList<ElementRef>; 

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const querySnapshot = await getDocs(collection(db, 'AdventCalendarCards'));
    this.cards = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { 
        name: data['name'], 
        image: data['image'], 
        rating: data['rating'] || 0 
      };
    });

    this.groupCards(); // Group cards after fetching
    console.log(this.cards);
  }

  groupCards(): void {
    const columnsPerRow = 3; // Adjust as needed
    this.groupedCards = this.cards.reduce((rows, card, index) => {
      const rowIndex = Math.floor(index / columnsPerRow);
      if (!rows[rowIndex]) rows[rowIndex] = [];
      rows[rowIndex].push(card);
      return rows;
    }, [] as Card[][]);
  }

  ngAfterViewInit() {
    this.applyStarRatings();
  }

  applyStarRatings(): void {
    this.stars.forEach((starContainerRef) => {
      const cardIndex = parseInt(starContainerRef.nativeElement.getAttribute('data-card-index'), 10);
      const card = this.cards[cardIndex];
      const stars = starContainerRef.nativeElement.querySelectorAll('.star');

      if (card.rating > 0) {
        for (let i = 0; i < card.rating; i++) {
          stars[i].classList.add('lit-up');
        }
      }

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
          for (let i = 0; i < card.rating; i++) {
            stars[i].classList.add('lit-up');
          }
        });
      });
    });
  }

  selectStars(globalCardIndex: number, selectedStars: number): void {
    this.cards[globalCardIndex].rating = selectedStars;
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

  unwrapGift(rowIndex: number, cardIndex: number): void {
    console.log('Unwrapping gift at row ${rowIndex}, card ${cardIndex}');
    const cardIndexInDOM = rowIndex * this.groupedCards[0].length + cardIndex; // Adjust based on grouping
    const giftWrap = document.querySelectorAll('.gift-wrap')[cardIndexInDOM] as HTMLElement;
    if (giftWrap) {
      giftWrap.classList.add('animate');
      setTimeout(() => {
        console.log('Gift unwrapped!');
      }, 600);
    }
  }
}