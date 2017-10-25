import { ActivatedRoute } from '@angular/router';
import { Card } from './../../models/card.model';
import { Result } from './../../models/result.model';
import { fail } from 'assert';
import { CardService } from './../../providers/card.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  submited: boolean
  cardForm: FormGroup
  card: Card
  messages: string[]
  hasSuccess: boolean

  constructor(private cardService: CardService, private fb: FormBuilder, private router: ActivatedRoute) { }

  ngOnInit() {
    this.initCardForm()
    const cardSlug = this.router.snapshot.params['slug']

    if (cardSlug) {
      this.cardService.getCardBySlug(cardSlug).subscribe(result => {
        this.card = result.data
        this.fillCardForm()
      })
    }
  }

  addCard() {
    this.submited = true;
    if (this.cardForm.invalid) return;

    this.cardService.saveCard(this.cardForm.value).subscribe(result => {
      this.cardForm.reset()
      this.submited = false
      this.messages = result.messages
      this.hasSuccess = true

    }, (fail: Result) => {
      this.hasSuccess = false
      this.messages = fail.messages
    })
  }

  private initCardForm() {
    this.cardForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      payday: this.fb.control('', Validators.required),
      limit: this.fb.control(''),
      actualLimit: this.fb.control('')
    })
  }
  private fillCardForm() {
    this.cardForm.addControl('_id',new FormControl())
    this.cardForm.setValue({
      _id: this.card._id,
      name: this.card.name,
      number: this.card.number,
      payday: this.card.payday,
      limit: this.card.limit,
      actualLimit: this.card.actualLimit
    })
  }
}
