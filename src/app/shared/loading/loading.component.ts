import { LoadingService } from './loading.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'me-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('loading-present', [
      state('hide', style({ display: 'none' })),
      state('show', style({ display: 'flex' })),
      transition('hide=>show', animate('500ms .3s ease-in')),
      transition('show=>hide', animate('500ms .3s ease-out')),
    ])
  ]
})
export class LoadingComponent implements OnInit {

  @Input() message: string

  present: string = 'hide'

  constructor(private loadCtrl: LoadingService) { }

  ngOnInit() {
    if (!this.message) this.message = 'Aguarde...'

    this.loadCtrl.present.subscribe(status => {
      console.log("cheogu no subscribe",status);
      this.present = status;
    })
  }

}
