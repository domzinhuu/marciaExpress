import { Output, EventEmitter } from '@angular/core';

export class LoadingService{
    present = new EventEmitter()

    show(){
        setTimeout(()=>{
            this.present.emit('show');
        },0);
    }

    hide(){
        setTimeout(()=>{
            this.present.emit('hide');
        },0);
    }

}