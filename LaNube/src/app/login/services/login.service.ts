import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { LoginResponse } from "../interfaces/loginResponse.interface";
import { Observable } from "rxjs";
import { isAdmin } from '../../guards/isAdmin.guard';

@Injectable({
    providedIn: 'root'
})
export class LoginService{

    rol!:string;
    constructor(private http:HttpClient){}

    /**
     *  Peticion para logarse
     * @param email 
     * @param password 
     * @returns 
     */
    login(email:string, password:string):Observable<LoginResponse>{
        const url = `${environment.urlApi}/login`;
        const body =  {email, password};
                
        return this.http.post<LoginResponse>(url, body);

       
    }
    
    /**
     * 
     * @returns Peticion para comprobar si el token sigue siendo valido
     */
    validarToken():Observable<LoginResponse>{
        const url = `${ environment.urlApi }/home/token`;
        const headers = new HttpHeaders() .set('Authorization', `Bearer ${localStorage.getItem('token')}` );
        return this.http.get<LoginResponse>( url, { headers } )
                    
      }

      /**
       *    Peticion para comprobar el rol
       * @returns 
       */
    isAdmin():Observable<any>{
        
        const url = `${ environment.urlApi }/home/usuario`;
        const headers = new HttpHeaders() .set('Authorization', `Bearer ${localStorage.getItem('token')}` );
       
        return this.http.get<any>( url, { headers } )
       
    }


    cambiarRol(rol:string){
        
        this.rol=rol;
    }

    get obtenerRol(){
       




        return this.rol;
    }



   
    
}