import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { LoginService } from "../login/services/login.service";





@Injectable({
    providedIn: 'root'
})
export class isAdmin implements CanActivate {

    constructor(private loginService:LoginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
        return this.loginService.isAdmin().pipe(


            map( resp=>{
                let respuesta:boolean=false;
              
               if(resp.role == "ADMINISTRADOR"){

                respuesta = true;
               }


                return respuesta;
            }),
            catchError(error =>{

                

                return of(false)
            })
        )
        
    }

    
    



    
}