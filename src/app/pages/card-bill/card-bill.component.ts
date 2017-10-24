import _ from 'lodash'
import { MONTHS } from './../../utils/variables.utils';
import { RegisterView } from './../../models/register.model';
import { RegisterService } from '../../providers/register.service';
import { Register } from '../../models/register.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-bill',
  templateUrl: './card-bill.component.html',
  styleUrls: ['./card-bill.component.css']
})
export class CardBillComponent implements OnInit {

  registers: Register[]
  registersView: RegisterView[] = []
  month:string
  year:number
  cardId:string
  total:number = 0

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.month = MONTHS[new Date().getMonth()]
    this.year = new Date().getFullYear()
  }

  setPeriod(period:any){
    this.month = period.month
    this.year = period.year
  }

  setCard(cardId:string){
    this.cardId = cardId
  }

  doSearch(){
    if(this.cardId){
      this.updateRegister()
    }else{
      alert('Você precisa selecionar o cartao')
    }
  }

  updateRegister() {
    this.total = 0
    this.registerService.getRegisters(this.month,this.year,this.cardId).subscribe(regs => {
      this.registers = regs
      this.registersView = _.map(regs,(item)=>{
        
        this.total += item.installments[0].value
        return new RegisterView(item,this.month,this.year)
      })
    })
  }

}
