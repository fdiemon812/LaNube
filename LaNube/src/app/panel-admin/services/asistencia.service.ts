import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoService } from './alumno.service';
import { TutorInterface } from '../interfaces/tutor.interface';
import { EstadoAlumnoInterface } from '../interfaces/asistencia.interface';
import { Observable } from 'rxjs';


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

}