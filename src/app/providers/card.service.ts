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

    addCard(card: Card): Observable<Result> {
        return this.http.post<Result>(END_POINT, card)
    }

    getCards(query?: string): Observable<Result> {
        const params = new HttpParams().set('query', query)

        return this.http.get<Result>(END_POINT, { params})
    }
}