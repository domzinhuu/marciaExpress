import { LoadingService } from './../../shared/loading/loading.service';
import _ from 'lodash'
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios: Usuario[]

  constructor(private usuarioService: UsuarioService,private loadCtrl:LoadingService) { }

  ngOnInit() {
    
    this.searchUser();
  }

  searchUser(query?: string) {
    this.loadCtrl.show()
    this.usuarioService.usuarios(query).subscribe(result => {
      this.usuarios = result.data
      this.loadCtrl.hide()
    });
  }

  deactivateUser(id: string) {
    const result = confirm('Ao desativar o usuario, não será posivel lançar compras para ele. Deseja realmente fazer isso?')
    this.changeStatus(id, result)
  }

  activateUser(id: string) {
    const result = confirm('Deseja realmente reativar este usuario?')
    this.changeStatus(id, result)
  }


  private changeStatus(id: string, change: boolean) {
    if (change) {
      this.loadCtrl.show()
      this.usuarioService.changeStatus(id).subscribe(result => {
        this.searchUser()
      })
    }

  }
}
