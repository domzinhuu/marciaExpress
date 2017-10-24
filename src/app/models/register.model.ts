import { Installment } from './installment.model';
export class Register {

    _id: string
    productName: string
    local: string
    registeredAt: Date
    buyAt: Date
    value: string
    creditCard: string
    user: string
    paymentMonth: string
    installmentNumber: number
    installments: Installment[]
}

export class RegisterView {
    id:string
    buyAt: Date
    productName: string
    local: string
    value: number
    valueString:string
    actual: string

    constructor(register: Register, month, year) {
        let installment = register.installments.find(item => item.paymentMonth === month && item.paymentYear == year)
        this.id = register._id
        this.buyAt = register.buyAt
        this.productName = register.productName
        this.local = register.local
        this.value = (installment.value / 100)
        this.valueString = (installment.value / 100).toFixed(2)
        this.actual = `(${installment.number}/${register.installmentNumber})`
    }
}