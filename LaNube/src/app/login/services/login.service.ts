import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { LoginResponse } from "../interfaces/loginResponse.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService{


    constructor(private http:HttpClient){}


    login(email:string, password:string){
        //Habra que llamar a la api 
        const url = `${environment.urlApi}/login`;
        const body =  {email, password};
        
        
        return this.http.post<LoginResponse>(url, body);

       
    }


    validarToken():Observable<LoginResponse>{
        const url = `${ environment.urlApi }/home/prueba`;
        const headers = new HttpHeaders() .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
    
        return this.http.get<LoginResponse>( url, { headers } )
        
        console.log('valida token');
        
        // return of(false)
            
      }

    
}