import { LoadingService } from './../../shared/loading/loading.service';
import { CardService } from './../../providers/card.service';
import { Card } from './../../models/card.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cards: Card[] = []

  constructor(private cardService: CardService,private loadCtrl:LoadingService) { }

  ngOnInit() {
    this.searchCard()
  }

  searchCard(query: string = '') {
    this.loadCtrl.show()
    this.cardService.getCards(query).subscribe(result => {
      this.cards = result.data
      this.loadCtrl.hide()
    })
  }

  activate(cardId: string) {
    const resp = confirm('Deseja reativar este cartão novamente? (você pode desativa-lo depois)')
    this.changeStatus(cardId,resp)
  }

  deactivate(cardId: string) {
    const resp = confirm('Deseja realmente desativar este cartão? (você poderá reativa-lo depois)')
    this.changeStatus(cardId,resp)
  }

  changeStatus(cardId: string, change) {
    if (change) {
      this.loadCtrl.show()
      this.cardService.changeStatus(cardId).subscribe(result=>{
        this.searchCard()
      })
    }
  }
}
