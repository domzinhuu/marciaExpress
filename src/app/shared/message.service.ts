import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message: string
  constructor() { }

  setMessage(msg: string) {
    this.message = msg
  }

  getMessage(): string {
    return this.message
  }

  hasMessage():boolean{
    return this.message != '' || this.message != undefined
  }

  clearMessages(){
    this.message = ''
  }
}
