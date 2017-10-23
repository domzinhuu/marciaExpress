import _ from 'lodash'
import { MONTHS } from '../../utils/variables.utils';
import { RegisterService } from '../../providers/register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-register-resume',
  templateUrl: './register-resume.component.html',
  styleUrls: ['./register-resume.component.css']
})
export class RegisterResumeComponent implements OnInit {

  cardId:string
  month:string
  year:number
  resumeData:any

  constructor(private registerService:RegisterService) { }

  ngOnInit() {
    this.month = MONTHS[new Date().getMonth()]
    this.year = new Date().getFullYear()
  }

  setCard(cardId:string){
    this.cardId = cardId
  }

  setPeriod(period:any){
    this.month = period.month
    this.year = period.year
  }

  doSearch(){
    if(!this.cardId){
      alert('Selecione um cartão primeiro')
      return;
    }
    
    this.registerService.getResume(this.month,this.year,this.cardId)
    .then(result =>{
        this.resumeData = result
    })
  }
}
