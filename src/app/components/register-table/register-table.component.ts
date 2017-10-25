import { RegisterView } from './../../models/register.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'me-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.css']
})
export class RegisterTableComponent implements OnInit {

  @Input() classes:string
  @Input() registers:RegisterView[] = []
  @Input() showCardColumn:boolean
  @Input() showUserColumn:boolean
  
  constructor() { }

  ngOnInit() {
  }

}
