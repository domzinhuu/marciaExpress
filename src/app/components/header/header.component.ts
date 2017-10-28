import { AuthenticationService } from './../../providers/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  islogged:boolean
  constructor(private authService:AuthenticationService) {
  
  }

  ngOnInit() {
   this.authService.checkStatus().subscribe(data =>{
     this.islogged = data
   })
  }

  logout(){
    this.authService.logout()
  }
}
