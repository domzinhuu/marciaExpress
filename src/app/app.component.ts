import { AuthenticationService } from './providers/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'me-root',
  templateUrl: './app.component.html',
})

export class AppComponent {

  constructor(public autheService:AuthenticationService){}
}
