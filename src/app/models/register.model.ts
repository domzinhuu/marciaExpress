import { Installment } from './installment.model';
export class Register {

    _id: string
    productName: string
    local: string
    registeredAt: Date
    buyAt: Date
    value: number
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
    actual: string

    constructor(register: Register, month, year) {
        let installment = register.installments.find(item => item.paymentMonth === month && item.paymentYear == year)
        this.id = register._id
        this.buyAt = register.buyAt
        this.productName = register.productName
        this.local = register.local
        this.value = installment.value
        this.actual = `(${installment.number}/${register.installmentNumber})`
    }
}