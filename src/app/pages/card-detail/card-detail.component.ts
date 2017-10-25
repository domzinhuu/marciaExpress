import _ from 'lodash'
import { RegisterService } from './../../providers/register.service';
import { RegisterView } from './../../models/register.model';
import { Card } from './../../models/card.model';
import { CardService } from './../../providers/card.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  month: string
  year: number
  card: Card
  registers: RegisterView[] = []
  total: number = 0

  constructor(private route: ActivatedRoute, private cardService: CardService, private registerService: RegisterService) { }

  ngOnInit() {
    this.cardService.getCardBySlug(this.route.snapshot.params['slug']).subscribe(result => {
      this.card = result.data
    })
  }

  setPeriod(period: any) {
    this.month = period.month
    this.year = period.year
  }

  updateRegisters() {
    this.total = 0
    this.registerService.getRegisters(this.month, this.year, this.card._id).subscribe(result => {
      this.registers = _.map(result,(item)=>{
        const register = new RegisterView(item,this.month,this.year)
        
        this.total += register.value
        return register
      })
    })
  }
}
