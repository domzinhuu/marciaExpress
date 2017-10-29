import { MONTHS } from '../../utils/variables.utils';
import { LoadingService } from './../../shared/loading/loading.service';
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

  constructor(private route: ActivatedRoute, private cardService: CardService, private registerService: RegisterService,private loadCtrl:LoadingService) { }

  ngOnInit() {
    this.month = MONTHS[new Date().getMonth()]
    this.year = new Date().getFullYear()
    this.loadCtrl.show()
    this.cardService.getCardById(this.route.snapshot.params['id']).subscribe(result => {
      this.card = result.data
      this.loadCtrl.hide()
    })
  }

  setPeriod(period: any) {
    this.month = period.month
    this.year = period.year
  }

  updateRegisters() {
    this.loadCtrl.show()
    this.total = 0
    this.registerService.getRegisters(this.month, this.year, this.card._id).subscribe(result => {
      this.registers = _.map(_.orderBy(result,['buyAt'],['desc']), (item) => {
        const register = new RegisterView(item, this.month, this.year)

        this.total += register.value
        return register
      })
      this.loadCtrl.hide()
    })
  }
}
