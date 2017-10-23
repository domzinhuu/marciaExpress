import { AuthenticationService } from '../../providers/authentication.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthenticationService)
        let myRequest: HttpRequest<any>

        if (authService.isLoggedIn()) {
            myRequest = req.clone({
                headers: authService.putTokenOnHeader()
            })

            return next.handle(myRequest)

        } else {
            return next.handle(req)
        }

    }
}