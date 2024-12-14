import { CommonModule } from '@angular/common';
import { OnInit, AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../services/firebase.service';

interface Card {
  index: number,
  name: string;
  image: string;
  rating: number;
  isWrapped: boolean;
  spice: number;
}

@Component({
  selector: 'app-advent-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advent-calendar.component.html',
  styleUrls: ['./advent-calendar.component.scss']
})
export class AdventCalendarComponent implements OnInit, AfterViewInit {
  countdown: any;
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
        index: data['index'],
        name: data['name'], 
        image: data['image'], 
        rating: data['rating'] || 0,
        isWrapped: data['isWrapped'],
        spice: data['spice']
      };
    });

    this.cards.sort((a,b) => a.index - b.index);

    // Check the current time and set visible cards accordingly
    this.checkTimeAndUpdateVisibleCards();

    if (!this.cards?.length) {
      this.startCountdown();
    }

    this.groupCards(); // Group cards after fetching
  }

  startCountdown() {
    const targetDate = new Date('January 1, 2025 00:00:00').getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      // If the target date has passed, stop the countdown
      if (timeDifference <= 0) {
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      this.countdown = {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
      };
    }, 1000);
  }

  checkTimeAndUpdateVisibleCards() {
    const allCards = this.cards;
    const currentTime = new Date();
    const januaryCutoffTime = new Date(currentTime.getFullYear(), 0, 1, 0, 0, 0, 0);  // January 1st, 12:00 AM
    const februaryCutoffTime = new Date(currentTime.getFullYear(), 1, 1, 0, 0, 0, 0); // February 1st, 12:00 AM
    const marchCutoffTime = new Date(currentTime.getFullYear(), 2, 1, 0, 0, 0, 0);    // March 1st, 12:00 AM
    const aprilCutoffTime = new Date(currentTime.getFullYear(), 3, 1, 0, 0, 0, 0);    // April 1st, 12:00 AM
    const mayCutoffTime = new Date(currentTime.getFullYear(), 4, 1, 0, 0, 0, 0);      // May 1st, 12:00 AM
    const juneCutoffTime = new Date(currentTime.getFullYear(), 5, 1, 0, 0, 0, 0);     // June 1st, 12:00 AM
    const julyCutoffTime = new Date(currentTime.getFullYear(), 6, 1, 0, 0, 0, 0);     // July 1st, 12:00 AM
    const augustCutoffTime = new Date(currentTime.getFullYear(), 7, 1, 0, 0, 0, 0);   // August 1st, 12:00 AM
    const septemberCutoffTime = new Date(currentTime.getFullYear(), 8, 1, 0, 0, 0, 0); // September 1st, 12:00 AM
    const octoberCutoffTime = new Date(currentTime.getFullYear(), 9, 1, 0, 0, 0, 0);   // October 1st, 12:00 AM
    const novemberCutoffTime = new Date(currentTime.getFullYear(), 10, 1, 0, 0, 0, 0); // November 1st, 12:00 AM
    const decemberCutoffTime = new Date(currentTime.getFullYear(), 11, 1, 0, 0, 0, 0); // December 1st, 12:00 AM

    if (currentTime < januaryCutoffTime) {
      this.cards = [];
    } else if (currentTime >= januaryCutoffTime && currentTime < februaryCutoffTime) {
      this.cards = this.cards.slice(0, 3);
    } else if (currentTime >= februaryCutoffTime && currentTime < marchCutoffTime) {
      this.cards = this.cards.slice(0, 6);
    } else if (currentTime >= marchCutoffTime && currentTime < aprilCutoffTime) {
      this.cards = this.cards.slice(0, 9);
    }  else if (currentTime >=  aprilCutoffTime&& currentTime < mayCutoffTime) {
      this.cards = this.cards.slice(0, 12);
    }  else if (currentTime >= mayCutoffTime && currentTime < juneCutoffTime) {
      this.cards = this.cards.slice(0, 15);
    }  else if (currentTime >= juneCutoffTime && currentTime < julyCutoffTime) {
      this.cards = this.cards.slice(0, 18);
    }  else if (currentTime >= julyCutoffTime && currentTime < augustCutoffTime) {
      this.cards = this.cards.slice(0, 21);
    }  else if (currentTime >= augustCutoffTime && currentTime < septemberCutoffTime) {
      this.cards = this.cards.slice(0, 24);
    }  else if (currentTime >= septemberCutoffTime && currentTime < octoberCutoffTime) {
      this.cards = this.cards.slice(0, 27);
    }  else if (currentTime >= octoberCutoffTime && currentTime < novemberCutoffTime) {
      this.cards = this.cards.slice(0, 30);
    }  else if (currentTime >= novemberCutoffTime &&  currentTime < decemberCutoffTime) {
      this.cards = this.cards.slice(0, 33);
    } else if (currentTime >= decemberCutoffTime) {
      this.cards = allCards;
    }
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

  selectSpiceLevel(rowIndex: number, cardIndex: number, selectedSpiceLevel: number): void {
    const globalCardIndex = rowIndex * 3 + cardIndex;
    const cardName = this.cards[globalCardIndex].name;
  
    // Update the spice level in the local array
    this.cards[globalCardIndex].spice = selectedSpiceLevel;
  
    // Query the Firestore collection to find the document with this unique name
    const cardQuery = query(collection(db, 'AdventCalendarCards'), where('name', '==', cardName));
  
    getDocs(cardQuery).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const cardDocRef = querySnapshot.docs[0].ref;
  
        // Update the spice level in Firestore
        updateDoc(cardDocRef, { spice: selectedSpiceLevel })
          .then(() => {
            console.log('Spice Level updated in Firestore!');
          })
          .catch((error) => {
            console.error('Error updating spice level: ', error);
          });
      } else {
        console.error('Card not found with name: ', cardName);
      }
    })
    .catch((error) => {
      console.error('Error querying Firestore: ', error);
    });
  
    // Find the spice container for this specific card
    const cardSpices = this.stars.find(
      (ref) => parseInt(ref.nativeElement.getAttribute('data-card-index'), 10) === globalCardIndex
    );
  
    if (cardSpices) {
      // Update the spice visuals
      const spiceElements = cardSpices.nativeElement.querySelectorAll('.spice');
      spiceElements.forEach((spice: HTMLElement, index: number) => {
        if (index < selectedSpiceLevel) {
          spice.classList.add('lit-up');
        } else {
          spice.classList.remove('lit-up');
        }
      });
    }
  }

  unwrapGift(rowIndex: number, cardIndex: number): void {
    console.log(`Unwrapping gift at row ${rowIndex}, card ${cardIndex}`);

    // Calculate the global index of the card
    const globalCardIndex = rowIndex * 3 + cardIndex;
    const card = this.cards[globalCardIndex];

    // Ensure card is in the expected "wrapped" state
    if (card.isWrapped) {
      // Set isWrapped to false for this card locally
      card.isWrapped = false;

      // Find the document by card name (or any other unique identifier)
      const cardName = card.name;
      const cardQuery = query(collection(db, 'AdventCalendarCards'), where('name', '==', cardName));

      getDocs(cardQuery).then(querySnapshot => {
        if (!querySnapshot.empty) {
          const cardDocRef = querySnapshot.docs[0].ref;

          // Update the Firestore document to set isWrapped to false
          updateDoc(cardDocRef, {
            isWrapped: false
          })
          .then(() => {
            console.log('Gift unwrapped in Firestore!');
          })
          .catch((error) => {
            console.error('Error unwrapping gift in Firestore: ', error);
          });
        } else {
          console.error('Card not found with name: ', cardName);
        }
      })
      .catch((error) => {
        console.error('Error querying Firestore: ', error);
      });
    }
  }
}