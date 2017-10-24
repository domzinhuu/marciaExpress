import { Observable } from 'rxjs/Rx';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'me-combo-usuario',
  templateUrl: './combo-usuario.component.html',
  styleUrls: ['./combo-usuario.component.css']
})
export class ComboUsuarioComponent implements OnInit {
  @Output() setUser = new EventEmitter()
  @Input() classes:string
  
  users:Usuario[]
  userId:string
  

  constructor(private userService:UsuarioService) { }

  ngOnInit() {
    this.userService.usuarios('',true).subscribe(result=>{
      this.users = result.data
    })
  }
  
  changeUser(){
    this.setUser.emit(this.userId)
  }
}
