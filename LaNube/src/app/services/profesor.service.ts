import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfesorInterface } from "../interfaces/profesor.interface";
import { AlumnoInterface } from "../panel-admin/interfaces/alumno.interface";

@Injectable({
    providedIn: 'root'
})
export class ProfesorService {


    centro:any=10001;
    isPrimera:boolean=true;
    constructor(private http:HttpClient, ){

    }








    /**
     *
     * @param idAulaInput Lista los Profesores de un aula determinada en un centro determinada
     * @returns
     */
    listarProfesoresAula(idAulaInput:number):Observable<ProfesorInterface[]>{

        const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAulaInput}/profesores`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );


        return this.http.get<ProfesorInterface[]>(url, {headers});
    }




    /**
     *
     * @param idAulaInput Lista los Profesores de un aula determinada en un centro determinada
     * @returns
     */
     listarProfesoresSinAula(idAulaInput:number):Observable<ProfesorInterface[]>{

      const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAulaInput}/profesores`;
      const headers = new HttpHeaders() .set('Authorization',
       `Bearer ${localStorage.getItem('token')}` );


      return this.http.get<ProfesorInterface[]>(url, {headers});
  }



    /**
     *
     * @returns Lista las aulas de un centro
     */
     asignarProfesoresAula(idAula:number, profesores:string):Observable<any>{




        const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAula}/profesores`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        const body=profesores
        return this.http.put<ProfesorInterface[]>(url,body,{headers});
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
