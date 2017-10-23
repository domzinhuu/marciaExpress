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
  hasSuccess: boolean
  messages:string[]
  error:any

  constructor(private userService: UsuarioService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      completeName: this.fb.control('', Validators.required),
      cellphone: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.compose([Validators.required])),
      confirmation: this.fb.control('', Validators.compose([Validators.required, SyncValidator.passwordMatch]))
    })
  }

  save() {
    this.submited = true
    if (this.userForm.invalid) return;

    this.userService.save(this.userForm.value)
      .subscribe((result:Result) => {
        this.submited = false
        this.userForm.reset()
        this.hasSuccess = true
        this.messages = result.messages

      }, (fail:Result) => {
        this.hasSuccess = false
        this.messages = fail.messages
      })
  }

}
