import { LoadingService } from '../../shared/loading/loading.service';
import { MONTHS } from '../../utils/variables.utils';
import { Router } from '@angular/router';
import { Result } from './../../models/result.model';
import { fail } from 'assert';
import { RegisterService } from '../../providers/register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  submited: boolean;
  registerForm: FormGroup;
  messages: string[];
  hasSucess: boolean;
  actualYear: number;
  yearCombo: any[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private loadCtrl: LoadingService) {}

  ngOnInit() {
    const actualYear = new Date().getFullYear();
    this.actualYear = actualYear;
    const nextYear = actualYear + 1;

    this.yearCombo.push(actualYear);
    this.yearCombo.push(nextYear);

    this.registerForm = this.fb.group({
      productName: this.fb.control('', Validators.required),
      local: this.fb.control('', Validators.required),
      buyAt: this.fb.control('', Validators.required),
      value: this.fb.control('', Validators.required),
      creditCard: this.fb.control('', Validators.required),
      user: this.fb.control('', Validators.required),
      paymentMonth: this.fb.control(MONTHS[new Date().getMonth()], Validators.required),
      payYear: this.fb.control(2017, Validators.required),
      installmentNumber: this.fb.control(1, Validators.required)
    });
  }

  addRegister() {
    this.loadCtrl.show();
    this.submited = true;
    if (this.registerForm.invalid) {
      this.loadCtrl.hide();
      return;
    }

    this.registerService.addRegister(this.registerForm.value).subscribe(
      result => {
        this.router.navigate(['/saved']);
      },
      (failError: Result) => {
        this.loadCtrl.hide();
        this.messages = failError.messages;
        this.hasSucess = false;
      },
      () => {
        this.loadCtrl.hide();
      }
    );
  }

  changeUser(userId: string) {
    this.registerForm.patchValue({
      user: userId
    });
  }

  changeCard(cardId: string) {
    this.registerForm.patchValue({
      creditCard: cardId
    });
  }

  changeMonth(period: any) {
    this.registerForm.patchValue({
      paymentMonth: period.month
    });
  }
}
