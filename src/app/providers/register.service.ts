import { LoadingService } from '../shared/loading/loading.service';
import _ from 'lodash';
import { ME_API } from '../utils/variables.utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Result } from './../models/result.model';
import { Observable } from 'rxjs/Rx';
import { Register } from './../models/register.model';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

const end_point = `${ME_API}/registers`;

@Injectable()
export class RegisterService {
  constructor(private authService: AuthenticationService, private http: HttpClient, private loadCtrl: LoadingService) {}

  addRegister(register: Register): Observable<Result> {
    register.value = register.value.toString();
    return this.http.post<Result>(end_point, register);
  }

  getRegisters(month?: string, year?: number, card?: string, user?: string): Observable<Register[]> {
    const params = this.buildHttpParams(month, year, card, user);
    return this.http.get<Register[]>(end_point, { params });
  }

  getResume(month?: string, year?: number, card?: string, notIncludeCards = false): Promise<any> {
    return new Promise(resolve => {
      const params = this.buildHttpParams(month, year, card, null, notIncludeCards);
      this.http.get<Register[]>(end_point, { params }).subscribe(res => {
        resolve(this.getResumeObject(_.orderBy(res, ['user.completeName'], ['asc'])));
      });
    });
  }

  deleteRegister(registerId: string): Observable<Result> {
    return this.http.delete<Result>(`${end_point}/${registerId}`);
  }

  private buildHttpParams(month?: string, year?: number, card?: string, user?: string, notIncludeCards: boolean = false): HttpParams {
    let params = new HttpParams();
    params = params.append('notIncludeCards', notIncludeCards ? 'true' : 'false');

    if (month) {
      params = params.append('month', month);
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    if (card) {
      params = params.append('card', card);
    }
    if (user) {
      params = params.append('user', user);
    }
    return params;
  }

  private getResumeObject(register: Register[]): any {
    const grupedByUser = _.groupBy(
      _.map(register, item => {
        return {
          user: item.user.completeName,
          value: item.installments[0].value,
          productName: item.productName
        };
      }),
      'user'
    );

    const grupedByUserWithTotal = _.map(grupedByUser, item => {
      const total = _.sumBy(item, o => {
        return o.value;
      });
      item.total = total;
      return item;
    });

    const result = {
      resumes: grupedByUserWithTotal,
      total: _.sumBy(grupedByUserWithTotal, item => item.total)
    };

    return result;
  }
}
