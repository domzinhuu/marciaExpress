import { LoadingService } from './../../shared/loading/loading.service';
import { fail } from 'assert';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { Result } from '../../models/result.model';
import { SyncValidator } from '../../validators/sync-validator';
import { UsuarioService } from './../../providers/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  submited: boolean
  userForm: FormGroup
  editUser: Usuario
  hasSuccess: boolean
  messages: string[]
  error: any

  constructor(private userService: UsuarioService, private fb: FormBuilder, private route: ActivatedRoute,private loadCtrl:LoadingService) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.loadCtrl.show()
      this.prepareToEdit(this.route.snapshot.params['id'])
      this.userForm = this.fb.group({
        _id: this.fb.control('', Validators.required),
        completeName: this.fb.control('', Validators.required),
        cellphone: this.fb.control('', Validators.required),
        username: this.fb.control('', Validators.required),
        password: this.fb.control(''),
        confirmation: this.fb.control('')
      })
    } else {
      this.userForm = this.fb.group({
        completeName: this.fb.control('', Validators.required),
        cellphone: this.fb.control('', Validators.required),
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.compose([Validators.required])),
        confirmation: this.fb.control('', Validators.compose([Validators.required, SyncValidator.passwordMatch]))
      })
    }

  }

  save() {
    this.submited = true
    if (this.userForm.invalid) return;

    this.loadCtrl.show()
    this.userService.save(this.userForm.value)
      .subscribe((result: Result) => {
        this.submited = false
        this.userForm.reset()
        this.hasSuccess = true
        this.messages = result.messages

      }, (fail: Result) => {
        const err = JSON.parse(fail.error)
        this.hasSuccess = false
        this.messages = err.messages
      },()=>{
        this.loadCtrl.hide()
      })
  }

  prepareToEdit(id: string) {
    this.userService.getUsuario(id).subscribe(result => {
      this.editUser = result.data

      this.userForm.patchValue({
        _id: this.editUser._id,
        completeName: this.editUser.completeName,
        cellphone: this.editUser.cellphone,
        username: this.editUser.username
      })
      this.loadCtrl.hide();
    })
  }
}
