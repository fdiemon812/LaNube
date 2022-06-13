import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AlumnoInterface } from "../interfaces/alumno.interface";
import { EstadoAlumnoInterface } from '../interfaces/asistencia.interface';

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {



    centro:any=10001;
    isPrimera:boolean=true;
    constructor(private http:HttpClient, ){

    }




    /**
     *
     * @returns Lista todos los alumnos de un centro
     */

     listarAsistenciaAlumno(id:number):Observable<EstadoAlumnoInterface[]>{



      const url = `${ environment.urlApi }/centro/${this.centro}/alumno/${id}`;
      const headers = new HttpHeaders() .set('Authorization',
       `Bearer ${localStorage.getItem('token')}` );


      return this.http.get<EstadoAlumnoInterface[]>(url, {headers});
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
     * @returns Lista todos los alumnos de un centro
     */

       listarAlumnosSinAula():Observable<AlumnoInterface[]>{



        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos/aulas/10001`;
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



        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos`;
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


        const url = `${ environment.urlApi }/centro/${this.centro}/register`;
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
    agregarTutorAlumno(id:number, idAlumno:number ):Observable<any>{


        const url = `${ environment.urlApi }/alumnos/${idAlumno}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
        const body= {id}

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



    borrarAlumno(idAlumno:number ):Observable<any>{


        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos/${idAlumno}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

         return this.http.delete<any>(url, {headers});


    }


    cambiarCentro(centro:any){

        if(centro==null){
            this.centro=10001;
            this.isPrimera=false;
        }else{
            this.centro= parseInt(centro);
        }

    }


    editarAlumno(alumno: AlumnoInterface) {

        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos/${alumno.id}`;

        const body= alumno;
        const headers = new HttpHeaders() .set('Authorization',

         `Bearer ${localStorage.getItem('token')}` );

         return this.http.put<AlumnoInterface>(url, body,{headers});

      }


      getAlumno(idAlumno:number) {

        const url = `${ environment.urlApi }/centro/${this.centro}/alumnos/${idAlumno}`;

        const headers = new HttpHeaders() .set('Authorization',

         `Bearer ${localStorage.getItem('token')}` );

         return this.http.get<AlumnoInterface>(url,{headers});

      }


      listarAlumnosTutor(email: string) {

        const url = `${ environment.urlApi }/centro/${this.centro}/tutores/${email}/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',

         `Bearer ${localStorage.getItem('token')}` );

         return this.http.get<AlumnoInterface[]>(url,{headers});

      }


}
