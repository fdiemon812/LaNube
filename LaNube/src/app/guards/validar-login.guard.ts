import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";





@Injectable({
    providedIn: 'root'
})
export class ValidarLogin implements CanActivate {



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        

        //Llamar a la api y suscribirse (pasando por el servicio)
        return true;
    }
    



    
}