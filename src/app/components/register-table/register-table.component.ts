import { RegisterView } from './../../models/register.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'me-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.css']
})
export class RegisterTableComponent implements OnInit {
  @Input() classes: string;
  @Input() registers: RegisterView[] = [];
  @Input() showCardColumn: boolean;
  @Input() showUserColumn: boolean;
  @Input() showOptionsColumn: boolean;

  @Output() deleteRegister = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  deleteRegisterEmit(registerId: string) {
    this.deleteRegister.emit(registerId);
  }
}
