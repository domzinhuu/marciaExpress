import { NotifyContainer } from './../models/notify.model';
import { ME_API } from '../utils/variables.utils';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class NotifyService {

  notifies: any
  notifiesObserver: any
  url_api = `${ME_API}/registers`

  constructor(private http: HttpClient) {
    this.notifies = Observable.create(observer => {
      this.notifiesObserver = observer
    })
  }

  getNotifies(daysAgo: number = 10, read?: boolean): Observable<NotifyContainer> {
    let params = new HttpParams().set('daysAgo', daysAgo.toString())

    if (read != undefined) {
      params = params.append('read', read ? 'true' : 'false')
    }

    return this.http.get<NotifyContainer>(`${this.url_api}/notify/all`, { params }).do(notifies => {
      this.notifies = notifies
    })
  }

  markNotify(id: string): Observable<any> {
    return this.http.put(`${this.url_api}/notify/${id}`, {});
  }

  markAllNotify(): Observable<any> {
    return this.http.put(`${this.url_api}/notify/check/all`, {})
  }

  checkNotifyUpdate(): Observable<NotifyContainer> {
    return this.notifies
  }
}
