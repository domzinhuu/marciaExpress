import { map } from 'rxjs/operator/map';
import { Result } from '../models/result.model';
import { ME_API } from './../utils/variables.utils';
import { Card } from './../models/card.model';
import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const END_POINT = `${ME_API}/cards`

@Injectable()
export class CardService {

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    saveCard(card: Card): Observable<Result> {
        if (card._id) {
            return this.http.put<Result>(END_POINT, card)
        }

        return this.http.post<Result>(END_POINT, card)
    }

    getCards(query: string = '',active?:boolean): Observable<Result> {
        let params = new HttpParams().set('query', query)
        if(active != undefined){
            params = params.append('active',active ? 'true':'false')
        }

        return this.http.get<Result>(END_POINT, { params })
    }

    getCardBySlug(cardSlug: string): Observable<Result> {
        return this.http.get<Result>(`${END_POINT}/${cardSlug}`)
    }

    changeStatus(cardId:string):Observable<Result>{
        return this.http.put<Result>(`${END_POINT}/${cardId}`,{})
    }
}