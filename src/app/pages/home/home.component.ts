import { LoadingService } from './../../shared/loading/loading.service';
import _ from 'lodash'
import { HomeService } from './../../providers/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestUsers: any[] = []
  bestCards: any[] = []
  notifications: any[] = []

  constructor(private homeService: HomeService, private loadingCtrl: LoadingService) { }

  ngOnInit() {
    this.loadingCtrl.show()
    this.loadInitialData().then(()=>{
      this.loadingCtrl.hide()
    })
  }


  private loadInitialData(): Promise<any> {
    return new Promise(resolve => {
      this.getBestUsers().then(() => {
        this.getBestCards().then(() => {
          resolve()
        })
      })
    })
  }
  private getBestUsers(): Promise<any> {
    return new Promise(resolve => {
      this.homeService.getBestUsers().subscribe(users => {
        if (users.length == 3)
          this.bestUsers = users

        resolve()
      })
    })
  }

  private getBestCards(): Promise<any> {
    return new Promise(resolve => {
      this.homeService.getBestCards().subscribe(cards => {
        if (cards.length == 3)
          this.bestCards = cards

        resolve()
      })
    })

  }

}
