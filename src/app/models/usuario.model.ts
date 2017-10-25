export class Usuario {

    _id:string
    slug:string
    completeName:string
    cellphone:string
    username:string
    password:string
    spendTotal:number
    profileImg:string
    active:boolean
    isAdmin:boolean

    constructor(user:any){
        this._id = user._id
        this.slug = user.slug
        this.completeName = user.completeName
        this.cellphone = user.cellphone
        this.username = user.username
        this.spendTotal = user.spendTotal /100
        this.profileImg = user.profileImg
        this.active = user.active
        this.isAdmin = user.isAdmin
    }
}
