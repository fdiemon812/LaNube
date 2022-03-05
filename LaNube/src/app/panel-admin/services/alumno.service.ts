import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AlumnoInterface } from "../interfaces/alumno.interface";
import { CentroService } from './centro.service';

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    
    centro:number= this.centroService.obtenerCentro;
    constructor(private http:HttpClient, private centroService: CentroService){

    }

   
  

    



    listarAlumnos():Observable<AlumnoInterface[]>{

        

        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<AlumnoInterface[]>(url, {headers});
    }


    listarAlumnosAula(idAulaInput:number):Observable<AlumnoInterface[]>{

        const url = `${ environment.urlApi }/centro/${this.centro}/aula/${idAulaInput}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<AlumnoInterface[]>(url, {headers});
    }

    registrarAlumno(nombre:string, apellidos:string, dni:string,
         fechaNacimiento:Date, direccion:string, comida:string, 
         horaEntrada:string, horaSalida:string, observaciones:string, aula:any, comeEnCentro:boolean):Observable<AlumnoInterface>{

         
       
        const url = `${ environment.urlApi }/centro/${this.centro}/alumno`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {nombre, apellidos, dni, fechaNacimiento, direccion, comida,  observaciones, horaEntrada, horaSalida, aula, comeEnCentro}
       


        return this.http.post<AlumnoInterface>(url, body, {headers});
    }





    registrarTutor(nombre: string, apellidos: string, 
        dni: string, tlf: string, email: string, password: string):Observable<any> {


        const url = `${ environment.urlApi }/register`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {nombre, apellidos, dni, tlf, email, password, role:"TUTOR"}
        console.log(body )
         return this.http.post<any>(url, body, {headers});


    }


    agregarTutorAlumno(email:string, idAlumno:number ):Observable<any>{


        const url = `${ environment.urlApi }/alumno/${idAlumno}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {email}
         return this.http.put<any>(url, body, {headers});


    }


    listarAula():Observable<any>{


        const url = `${ environment.urlApi }/centro/${this.centro}/aulas`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<any>(url, {headers});
    }


}