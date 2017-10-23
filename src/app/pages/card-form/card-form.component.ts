import { Result } from './../../models/result.model';
import { fail } from 'assert';
import { CardService } from './../../providers/card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  submited: boolean
  cardForm: FormGroup
  messages: string[]
  hasSuccess: boolean

  constructor(private cardService: CardService, private fb: FormBuilder) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      payday: this.fb.control('', Validators.required),
      limit: this.fb.control(''),
      actualLimit: this.fb.control('')
    })
  }

  addCard() {
    this.submited = true;
    if (this.cardForm.invalid) return;

    this.cardService.addCard(this.cardForm.value).subscribe(result => {
      this.cardForm.reset()
      this.submited = false
      this.messages = result.messages
      this.hasSuccess = true

    }, (fail:Result) => {
      this.hasSuccess = false
      this.messages = fail.messages
    })
  }
}
