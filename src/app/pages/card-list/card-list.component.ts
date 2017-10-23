import { CardService } from './../../providers/card.service';
import { Card } from './../../models/card.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cards: Card[]

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.searchCard()
  }

  searchCard(query?: string) {
    this.cardService.getCards(query).subscribe(result => {
      this.cards = result.data
    })
  }
}
