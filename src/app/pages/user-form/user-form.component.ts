import { MessageService } from './../../shared/message.service';
import { LoadingService } from './../../shared/loading/loading.service';
import { fail } from 'assert';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private userService: UsuarioService, private fb: FormBuilder, private messageService: MessageService,
    private route: ActivatedRoute, private loadCtrl: LoadingService, private router: Router) { }

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
        confirmation: this.fb.control('', SyncValidator.passwordMatch),
        updatePassword: this.fb.control(false)
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
        this.loadCtrl.hide()
        if (result.updated) {
          this.messageService.setMessage('Usuario atualiado com sucesso.')
          this.router.navigate(['users'])
          return;
        }
        this.submited = false
        this.userForm.reset()
        this.hasSuccess = true
        this.messages = result.messages

      }, (fail: Result) => {
        this.loadCtrl.hide()
        const err = JSON.parse(fail.error)
        this.hasSuccess = false
        this.messages = err.messages
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
