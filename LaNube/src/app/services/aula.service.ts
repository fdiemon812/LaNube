import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AlumnoInterface } from "../panel-admin/interfaces/alumno.interface";

@Injectable({
    providedIn: 'root'
})
export class AulaService {
  
    
    centro:any=1;
    isPrimera:boolean=true;
    constructor(private http:HttpClient, ){

    }

   
  

    

    /**
     * 
     * @returns Lista todos los alumnos de un centro
     */

    listarAlumnos():Observable<AlumnoInterface[]>{

        

        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<AlumnoInterface[]>(url, {headers});
    }

    /**
     * 
     * @param idAulaInput Lista los alumnos de un aula determinada en un centro determinada
     * @returns 
     */
    listarAlumnosAula(idAulaInput:number):Observable<AlumnoInterface[]>{

        const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAulaInput}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<AlumnoInterface[]>(url, {headers});
    }



    /**
     * 
     * @returns Lista las aulas de un centro
     */
    listarAula():Observable<any>{

        const url = `${ environment.urlApi }/centro/${this.centro}/aulas`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<any>(url, {headers});
    }


    
    /**
     * 
     * @returns Lista las aulas de un centro
     */
     asignarAlumnosAula(idAula:number, alumnos:string):Observable<any>{


        console.log(idAula);


        const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAula}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                
        const body=alumnos
        return this.http.put<AlumnoInterface[]>(url,body,{headers});
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