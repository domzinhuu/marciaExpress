import { LoadingService } from './../../shared/loading/loading.service';
import { MONTHS } from './../../utils/variables.utils';
import _ from 'lodash'
import { Register, RegisterView } from './../../models/register.model';
import { RegisterService } from './../../providers/register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit {

  registers: Register[]
  registersView: any[]
  total: number
  actualYear = new Date().getUTCFullYear()
  actualMonth: string

  constructor(private registerService: RegisterService, private loadCtrl: LoadingService) { }

  ngOnInit() {
    this.actualMonth = MONTHS[new Date().getMonth()]
    this.actualYear = new Date().getFullYear()

    this.updateRegisters();
  }

  setPeriod(period: any) {
    this.actualMonth = period.month
    this.actualYear = period.year
  }

  updateRegisters() {
    this.loadCtrl.show()
    this.registerService.getRegisters(this.actualMonth, this.actualYear).subscribe(regs => {

      this.total = 0
      this.registers = _.orderBy(regs, ['buyAt'], ['asc'])
      this.registersView = _.map(this.registers, (elem) => {
        let register = new RegisterView(elem, this.actualMonth, this.actualYear)
        this.total += register.value
        return register
      })
      this.loadCtrl.hide()
    })
  }

  deleteRegister(registerId: string) {
    const resp = confirm("Se deletar está compra todas as parcelas referentes a ela tambem serão deletadas.\n\nDeseja realmente fazer isto?")

    if (resp) {
      this.loadCtrl.show()
      this.registerService.deleteRegister(registerId).subscribe(result => {
        this.updateRegisters()
      })
    }

  }
}
