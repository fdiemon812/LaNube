import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { LoginService } from "../login/services/login.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarLogin implements CanActivate {

    constructor(private loginService:LoginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        

        
        //Llamar a la api y suscribirse (pasando por el servicio)

        
        return this.loginService.validarToken().pipe(


            map( resp=>{

                console.log(resp + "ha comprobado el token")
                return true;
            }),
            catchError(error =>{
                console.log(error);

                this.router.navigateByUrl('/login');

                return of(false)
            })
        )
        
        return false;
    }
    



    
}