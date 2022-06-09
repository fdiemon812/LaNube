import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfesorInterface } from "../interfaces/profesor.interface";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {



    centro:any=10001;
    isPrimera:boolean=true;
    constructor(private http:HttpClient, ){

    }



 /**
     *
     * @param idAulaInput Lista los Profesores de un aula determinada en un centro determinada
     * @returns
     */
  listarProfesoresCentro(query:any):Observable<ProfesorInterface[]>{
    if(query==""){
      query="-";
    }
    const url = `${ environment.urlApi }/centro/${this.centro}/profesores/${query}`;
    const headers = new HttpHeaders() .set('Authorization',
     `Bearer ${localStorage.getItem('token')}` );


    return this.http.get<ProfesorInterface[]>(url, {headers});
}




    /**
     *
     * @param idAulaInput Lista los Profesores de un aula determinada en un centro determinada
     * @returns
     */
    listarUsuariosCentro(query:any):Observable<ProfesorInterface[]>{
        if(query==""){
          query="-";
        }
        const url = `${ environment.urlApi }/centro/${this.centro}/usuarios/${query}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );


        return this.http.get<ProfesorInterface[]>(url, {headers});
    }










    cambiarCentro(centro:any){

        if(centro==null){
            this.centro=1;
            this.isPrimera=false;
        }else{
            this.centro= parseInt(centro);
        }

    }




}
