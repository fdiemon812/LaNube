import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AlumnoService } from 'src/app/panel-admin/services/alumno.service';
import { EstadoAlumnoInterface } from 'src/app/panel-admin/interfaces/asistencia.interface';


@Injectable({
    providedIn: 'root'
})
export class AsistenciaService {
    
   
    constructor( private http:HttpClient, private alumnoService:AlumnoService){}



    /**
     * 
     * @returns Lista todos los tutores
     */
    listarAsistenciaAlumno( dia:number, mes:number, year:number, idAlumno:number):Observable<EstadoAlumnoInterface>{

        let centro=this.alumnoService.centro;

        const url = `${ environment.urlApi }/centro/${centro}/alumno/${idAlumno}/estado/${dia}/${mes}/${year}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        return this.http.get<EstadoAlumnoInterface>(url, {headers});


    }


    updateAsistenciaAlumnos(estado:EstadoAlumnoInterface,  dia:number, mes:number, year:number):Observable<EstadoAlumnoInterface>{



        let centro=this.alumnoService.centro;

        
        const body=
            {
                "horaEntrada": estado.horaEntrada,
                "horaSalida": estado.horaSalida,
                "asistencia": estado.asistencia,
            
            }

        const url = `${ environment.urlApi }/centro/${centro}/alumno/${estado.idAlumno}/estado/${dia}/${mes}/${year}`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        return this.http.put<EstadoAlumnoInterface>(url, body, {headers});


    }

}