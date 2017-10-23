import { Card } from '../../models/card.model';
import { Observable } from 'rxjs/Rx';
import { CardService } from './../../providers/card.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'me-combo-cartao',
  templateUrl: './combo-cartao.component.html',
  styleUrls: ['./combo-cartao.component.css']
})
export class ComboCartaoComponent implements OnInit {

  @Output() setCard = new EventEmitter()
  @Input() classes:string
  @Input() idElement: string

  cardId:string
  cards:Card[]

  constructor(private cardService:CardService) { }

  ngOnInit() {
    this.cardService.getCards().subscribe(result =>{
      this.cards = result.data
    })
  }

  changeCardEmit(){
    this.setCard.emit(this.cardId)
  }

}
