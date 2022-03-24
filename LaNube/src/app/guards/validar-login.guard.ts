import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import Swal from "sweetalert2";
import { LoginService } from "../login/services/login.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarLogin implements CanActivate {

    constructor(private loginService:LoginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                
        return this.loginService.validarToken().pipe(


            map( resp=>{

                return true;
            }),
            catchError(error =>{

                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Ups... Algo va mal',
                    text: 'Intentalo más tarde',
                    showConfirmButton: false,
                    timer: 2000
                  })
                this.router.navigateByUrl('/login');

                return of(false)
            })
        )
        
    }
    



    
}