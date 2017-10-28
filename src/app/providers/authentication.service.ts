import { NotifyService } from './notify.service';
import { LoggedUser } from './../models/logged-user.model';
import { Router } from '@angular/router';
import { Result } from '../models/result.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { ME_API } from './../utils/variables.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    isLogged:any
    isLoggedObserver:any

    constructor(private http: HttpClient, private router: Router,private notifyService:NotifyService) {
        this.isLogged = Observable.create(observer =>{
            this.isLoggedObserver = observer
        })
     }


    checkStatus():Observable<any>{
        return this.isLogged
    }

    isLoggedIn():boolean {
        let result = this.getUserLogged() != undefined
        if(this.isLogged != result){
            this.isLogged = result;
        }
        return result

    }

    redirectToLogin(path: string = '/home') {
        this.router.navigate(['/login', path])
    }

    login(credentials: any): Observable<Result> {
        return this.http.post<Result>(`${ME_API}/users/login`, credentials)
            .do(data => {
                this.setLoggedUser(data.data)
            })

    }

    logout(): void {
        sessionStorage.clear()
        this.isLogged = false
        this.redirectToLogin()
    }

    getUserLogged(): LoggedUser {
        return JSON.parse(sessionStorage.getItem('loggedUser')) || undefined
    }

    putTokenOnHeader(): HttpHeaders {
        return new HttpHeaders().set('Authorization', `Bearer ${this.getUserLogged().accessToken}`)
    }

    private setLoggedUser(user) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user))
    }
}