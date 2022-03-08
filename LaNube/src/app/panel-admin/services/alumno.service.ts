import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AlumnoInterface } from "../interfaces/alumno.interface";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    
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
     * Registra un alumno 
     * @param nombre 
     * @param apellidos 
     * @param dni 
     * @param fechaNacimiento 
     * @param direccion 
     * @param comida 
     * @param horaEntrada 
     * @param horaSalida 
     * @param observaciones 
     * @param aula 
     * @param comeEnCentro 
     * @returns 
     */
    registrarAlumno(nombre:string, apellidos:string, dni:string,
         fechaNacimiento:Date, direccion:string, comida:string, 
         horaEntrada:string, horaSalida:string, observaciones:string, aula:any, comeEnCentro:boolean):Observable<AlumnoInterface>{

         
       
        const url = `${ environment.urlApi }/centro/${this.centro}/alumno`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {nombre, apellidos, dni, fechaNacimiento, direccion, comida,  observaciones, horaEntrada, horaSalida, aula, comeEnCentro}
       


        return this.http.post<AlumnoInterface>(url, body, {headers});
    }




    /**
     * 
     * @param nombre Registra un tutor
     * @param apellidos 
     * @param dni 
     * @param tlf 
     * @param email 
     * @param password 
     * @returns 
     */
    registrarTutor(nombre: string, apellidos: string, 
        dni: string, tlf: string, email: string, password: string):Observable<any> {


        const url = `${ environment.urlApi }/register`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {nombre, apellidos, dni, tlf, email, password, role:"TUTOR"}
         return this.http.post<any>(url, body, {headers});


    }



    /**
     * Agrega un aluno-tutor
     * @param email 
     * @param idAlumno 
     * @returns 
     */
    agregarTutorAlumno(email:string, idAlumno:number ):Observable<any>{


        const url = `${ environment.urlApi }/alumno/${idAlumno}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {email}
         return this.http.put<any>(url, body, {headers});


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


    cambiarCentro(centro:any){
        
        if(centro==null){
            this.centro=1;
            this.isPrimera=false;
        }else{
            this.centro= parseInt(centro);
        }
        
    }


}