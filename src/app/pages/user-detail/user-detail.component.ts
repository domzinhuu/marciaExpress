import { map } from 'rxjs/operator/map';
import { LoadingService } from './../../shared/loading/loading.service';
import _ from 'lodash'
import { RegisterService } from './../../providers/register.service';
import { MONTHS } from '../../utils/variables.utils';
import { RegisterView } from './../../models/register.model';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../providers/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: Usuario
  month: string
  year: number
  card: string
  total: number = 0
  registers: RegisterView[] = []

  constructor(private route: ActivatedRoute, private userService: UsuarioService, private registerService: RegisterService, private loadCtrl: LoadingService) { }

  ngOnInit() {
    this.loadCtrl.show()
    this.month = MONTHS[new Date().getMonth()]
    this.year = new Date().getFullYear()

    this.userService.getUsuario(this.route.snapshot.params['id']).subscribe(result => {
      this.user = new Usuario(result.data)
      this.loadCtrl.hide()
      this.updateRegister()
    })
  }

  setPeriod(period: any) {
    this.month = period.month
    this.year = period.year
  }

  setCard(cardId: string) {
    this.card = cardId
  }


  updateRegister() {
    this.loadCtrl.show()
    this.total = 0
    this.registerService.getRegisters(this.month, this.year, undefined, this.user._id)
      .subscribe(result => {

        this.registers = _.map(_.orderBy(result, ['buyAt'], ['desc']), register => {
          let registerView = new RegisterView(register, this.month, this.year)
          this.total += registerView.value
          return registerView
        })

        let agrupped = _.groupBy(this.registers, 'cardName')
        this.registers = _.map(agrupped, (list) => {
          return {
            cardName: list[0].cardName,
            total: _.sumBy(list, 'value'),
            itens: list
          }
        })
        this.registers = _.values(_.groupBy(this.registers, 'cardName'))
        this.loadCtrl.hide()
      })
  }

}
