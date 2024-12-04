import { CommonModule } from '@angular/common';
import { OnInit, AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
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

  selectStars(rowIndex: number, cardIndex: number, selectedStars: number): void {
    // Calculate global card index
    const globalCardIndex = rowIndex * 3 + cardIndex;

    // Get the card's name (assuming it's unique)
    const cardName = this.cards[globalCardIndex].name;

    // Update the card's rating in local array
    this.cards[globalCardIndex].rating = selectedStars;

    // Query the Firestore collection to find the document with this unique name
    const cardQuery = query(collection(db, 'AdventCalendarCards'), where('name', '==', cardName));

    getDocs(cardQuery).then(querySnapshot => {
        if (!querySnapshot.empty) {
            // There should only be one document with the name, so we take the first one
            const cardDocRef = querySnapshot.docs[0].ref;

            // Update the rating in Firestore
            updateDoc(cardDocRef, {
                rating: selectedStars
            })
            .then(() => {
                console.log('Rating updated in Firestore!');
            })
            .catch((error) => {
                console.error('Error updating rating: ', error);
            });
        } else {
            console.error('Card not found with name: ', cardName);
        }
    })
    .catch((error) => {
        console.error('Error querying Firestore: ', error);
    });

    // Log the card details and selected stars for debugging
    console.log('Card Clicked:', this.cards[globalCardIndex]);
    console.log('Stars Selected:', selectedStars);
    console.log('Row:', rowIndex, 'Card:', cardIndex, 'Star Selected:', selectedStars);

    // Find the star container for this specific card
    const cardStars = this.stars.find(
      (ref) => parseInt(ref.nativeElement.getAttribute('data-card-index'), 10) === globalCardIndex
    );

    if (cardStars) {
        // Update the star visuals
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
    console.log(`Unwrapping gift at row ${rowIndex}, card ${cardIndex}`);
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