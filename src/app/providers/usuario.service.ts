import { AuthenticationService } from './authentication.service';
import { LoggedUser } from './../models/logged-user.model';
import { map } from 'rxjs/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApplicationErrorHandler } from './../app.error-handler';
import { Result } from './../models/result.model';
import { ME_API } from '../utils/variables.utils';
import { Usuario } from './../models/usuario.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  endPoint = `${ME_API}/users`

  constructor(private http: HttpClient) {
  }

  save(usuario: Usuario): Observable<Result> {
    return this.http.post<Result>(this.endPoint, usuario)
  }

  usuarios(query: string = ''): Observable<Result> {
    let params = new HttpParams().set('query', query)
    return this.http.get<Result>(this.endPoint, { params})
  }

  getUsuario(id:string):Observable<Result>{
    return this.http.get<Result>(`${this.endPoint}/${id}`)
  }

}
