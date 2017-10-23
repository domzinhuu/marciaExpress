import { Component,OnInit,EventEmitter,Output,Input } from '@angular/core'

@Component({
    selector:'me-search-form',
    templateUrl:'./search-form-component.html',
    styleUrls:['./search-form-component.css']
})

export class SearchForm implements OnInit{

    @Input() placeholder:string = ''
    @Output() search =  new EventEmitter()
    query:string

    constructor(){}

    ngOnInit(){
        
    }

    emitSearchEvent(){
        this.search.emit(this.query)
    }
}