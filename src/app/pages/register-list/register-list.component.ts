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

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.updateRegister();
  }

  updateRegister(period?: any) {
    if (!period) {
      period = {
        month: MONTHS[new Date().getMonth()],
        year: new Date().getFullYear()
      }
    }

    this.registerService.getRegisters(period.month, period.year).subscribe(regs => {

      this.total = 0
      this.registers = _.orderBy(regs, ['buyAt'], ['asc'])
      this.registersView = _.map(this.registers, (elem) => {
        let register = this.buildRegisterView(elem, period.month, period.year)

        this.total += register.value

        return register
      })

    })
  }

  private buildRegisterView(register: Register, month: string, year: number) {
    let registerView = new RegisterView(register, month, year);
    return registerView
  }
}
