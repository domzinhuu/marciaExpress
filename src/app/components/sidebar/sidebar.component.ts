import { NotifyService } from './../../providers/notify.service';
import { AuthenticationService } from './../../providers/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthenticationService,public notifyService:NotifyService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
  }
}
