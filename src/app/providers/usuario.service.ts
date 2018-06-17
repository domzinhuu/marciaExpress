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
  endPoint = `${ME_API}/users`;

  constructor(private http: HttpClient) {}

  save(usuario: Usuario): Observable<Result> {
    if (usuario._id) {
      return this.http.put<Result>(this.endPoint, usuario);
    }

    return this.http.post<Result>(this.endPoint, usuario);
  }

  usuarios(query: string = '', active?: boolean): Observable<Result> {
    let params = new HttpParams().set('query', query);
    if (active !== undefined) {
      params = params.append('active', active ? 'true' : 'false');
    }

    return this.http.get<Result>(this.endPoint, { params });
  }

  changeStatus(id: string): Observable<Result> {
    return this.http.put<Result>(`${this.endPoint}/status/${id}`, {});
  }

  getUsuario(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.endPoint}/${id}`);
  }
}
