import { AuthenticationService } from './../../providers/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../providers/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submited: boolean
  loginForm: FormGroup
  navigateTo: string

  constructor(private authService: AuthenticationService, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/home'
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  login() {
    this.submited = true
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe(result => result,
      fail => console.log(fail),
      () => {
        this.router.navigate([this.navigateTo])
      })
  }

}
