import { NotifyContainer } from './../../models/notify.model';
import { NotifyService } from './../../providers/notify.service';
import { RegisterService } from './../../providers/register.service';
import { AuthenticationService } from './../../providers/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  islogged: boolean;
  notifyContainer: NotifyContainer;

  constructor(public authService: AuthenticationService, public notfiyService: NotifyService) {}

  ngOnInit() {
    this.authService.checkStatus().subscribe(data => {
      this.islogged = data;
    });
    this.notfiyService.checkNotifyUpdate().subscribe(notifies => {
      this.notfiyService.getNotifies(120, false).subscribe(notifiesRes => {
        this.notifyContainer = notifiesRes;
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
