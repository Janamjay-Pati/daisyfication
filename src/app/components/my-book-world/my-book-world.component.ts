import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-book-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-book-world.component.html',
  styleUrl: './my-book-world.component.scss'
})
export class MyBookWorldComponent {

  booksList = [
    { name: 'Aura' },
    { name: 'Amor'},
    { name: 'SanSan'},
    { name: 'Riene'},
    { name: 'Romy'},
    { name: 'Vargya'},
    { name: 'Manthan-Unknown'},
    { name: 'Aadeesh-Unknown'},
    { name: 'Lamha-Mafia Guy'},
    { name: 'Daniel-Ashley'},
    { name: 'Zeneith-Aelinor'},
    { name: 'Ray-Unkown'},
  ]

}
