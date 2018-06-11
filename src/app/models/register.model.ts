import { Installment } from './installment.model';
export class Register {
  _id: string;
  productName: string;
  local: string;
  registeredAt: Date;
  buyAt: Date;
  value: string;
  creditCard: any;
  user: any;
  paymentMonth: string;
  installmentNumber: number;
  installments: Installment[];
}

export class RegisterView {
  id: string;
  buyAt: Date;
  productName: string;
  username: string;
  cardName: string;
  cardPayDay: number;
  local: string;
  value: number;
  valueString: string;
  actual: string;

  constructor(register: Register, month, year) {

    const installment = register.installments.find(item => item.paymentMonth === month && item.paymentYear === year);
    this.id = register._id;
    this.buyAt = register.buyAt;
    this.productName = register.productName;
    this.username = register.user.completeName;
    this.cardName = `${register.creditCard.name} / ${register.creditCard.description}`;
    this.cardPayDay = register.creditCard.payday;
    this.local = register.local;
    this.value = installment.value / 100;
    this.valueString = installment.value.toFixed(2);
    this.actual = `(${installment.number}/${register.installmentNumber})`;
  }
}
