import { AuthenticationService } from '../providers/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate{

    constructor(private authService:AuthenticationService){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        const isLogged = this.authService.isLoggedIn()

        
        if(!isLogged){
            this.authService.redirectToLogin(state.url);
            
        }

        return isLogged
    }
}