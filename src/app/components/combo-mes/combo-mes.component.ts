import { MONTHS } from '../../utils/variables.utils';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'me-combo-mes',
  templateUrl: './combo-mes.component.html',
  styleUrls: ['./combo-mes.component.css']
})
export class ComboMesComponent implements OnInit {

  @Output() setPeriod = new EventEmitter()
  @Input() classes: string
  @Input() idElement: string
  @Input() showYearBox:boolean

  actualYear: number
  selectedMonth: string
  months: string[] = MONTHS

  constructor() { }

  ngOnInit() {
    this.actualYear = new Date().getFullYear()
    this.selectedMonth = MONTHS[new Date().getMonth()]
  }

  changeMonthEmit() {
    const period = { month: this.selectedMonth, year: this.actualYear }
    this.setPeriod.emit(period)
  }

  yearUp() {
    this.actualYear++
    this.changeMonthEmit()
  }

  yearDown() {
    this.actualYear--
    this.changeMonthEmit()
  }
}
