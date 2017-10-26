import { LoadingService } from '../shared/loading/loading.service';
import { Card } from './../models/card.model';
import { ME_API } from './../utils/variables.utils';
import { Usuario } from './../models/usuario.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  constructor(private http:HttpClient,private loadCtrl:LoadingService) { }

  getBestUsers():Observable<Usuario[]>{
    
    return this.http.get<Usuario[]>(`${ME_API}/users/best/users`)
  }

  getBestCards():Observable<Card[]>{
    return this.http.get<Card[]>(`${ME_API}/cards/best/cards`)
  }
}
