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

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getBestUsers()
    this.getBestCards()
  }


  private getBestUsers() {
    this.homeService.getBestUsers().subscribe(users => {
      if (users.length == 3)
        this.bestUsers = users
    })
  }

  private getBestCards() {
    this.homeService.getBestCards().subscribe(cards => {
      if (cards.length == 3)
        this.bestCards = cards
    })
  }

  private mockupValues() {
    const maique = {
      id: 1,
      name: 'Maique Rosa',
      position: 'text-gold'
    }

    const ingrid = {
      id: 2,
      name: 'Ingrid Azevedo',
      position: 'text-silver'
    }

    const paula = {
      id: 3,
      name: 'Paula Fernandes',
      position: 'text-warning'
    }

    this.bestUsers.push(maique, ingrid, paula)

    const masterItau = {
      id: 1,
      name: 'Mastercard Itau - dia 05',
      position: 'text-gold'
    }

    const santander = {
      id: 2,
      name: 'Santander - dia 12',
      position: 'text-silver'
    }

    const visaGold = {
      id: 3,
      name: 'Visa Gold - dia 23',
      position: 'text-warning'
    }

    this.bestCards.push(masterItau, santander, visaGold)

    const notify = {
      data: '16/10/2017',
      usuario: {
        id: 1,
        name: 'Maique Rosa'
      },
      action: 'realizou uma nova compra'
    }

    const notify2 = {
      data: '16/10/2017',
      usuario: {
        id: 2,
        name: 'Ingrid Azevedo'
      },
      action: 'realizou uma nova compra'
    }

    const notify3 = {
      data: '17/10/2017',
      usuario: {
        id: 3,
        name: 'Maique Rosa'
      },
      action: 'realizou uma nova compra'
    }

    this.notifications.push(notify, notify2, notify3)

  }
}
