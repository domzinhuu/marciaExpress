import { AuthenticationService } from './providers/authentication.service';
import { Result } from './models/result.model';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private injector: Injector, private zone: NgZone) { super() }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {

            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 403:
                    case 401:
                        sessionStorage.clear()
                        const authService = this.injector.get(AuthenticationService)
                        authService.redirectToLogin()
                        break
                }
            })
        }

        super.handleError(errorResponse)
    }
}