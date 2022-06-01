import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AlumnoService } from 'src/app/panel-admin/services/alumno.service';
import { EstadoAlumnoInterface } from 'src/app/panel-admin/interfaces/asistencia.interface';


@Injectable({
    providedIn: 'root'
})
export class EstadoService {
    
   
    constructor( private http:HttpClient, private alumnoService:AlumnoService){}





   createEstadoAlumnos(estado:EstadoAlumnoInterface,  dia:number, mes:number, year:number):Observable<EstadoAlumnoInterface>{



        let centro=this.alumnoService.centro;

        
        const body=
            {
                "horaEntrada": estado.horaEntrada,
                "horaSalida": estado.horaSalida,
                "asistencia": estado.asistencia,
                bath1:        estado.bath1,

                bath2:        estado.bath2,
                bath3:        estado.bath3,
                eat1:         estado.eat1,
                eat2:         estado.eat2,
                eat3:         estado.eat3
               
            
            }


        const url = `${ environment.urlApi }/centro/${centro}/alumno/${estado.idAlumno}/estado/${dia}/${mes}/${year}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        return this.http.put<EstadoAlumnoInterface>(url, body, {headers});


    }

}