import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'me-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() messages: string[]
  @Input() hasSuccess: boolean

  constructor() { }

  ngOnInit() {
  }

}
