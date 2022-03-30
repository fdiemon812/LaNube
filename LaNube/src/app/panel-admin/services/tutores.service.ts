import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CentroInterface } from '../interfaces/centro.interface';
import { AlumnoService } from './alumno.service';
import { TutorInterface } from '../interfaces/tutor.interface';


@Injectable({
    providedIn: 'root'
})
export class TutoresService {
    
   
    constructor( private http:HttpClient, private alumnoService:AlumnoService){}



    /**
     * 
     * @returns Lista todos los tutores
     */
    listarTutores():Observable<TutorInterface[]>{

        let centro=this.alumnoService.centro;

        const url = `${ environment.urlApi }/centro/${centro}/tutores`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        return this.http.get<TutorInterface[]>(url, {headers});


    }



    listarTutoresAlumno(idAlumno:number){
        
        let centro=this.alumnoService.centro;

        const url = `${ environment.urlApi }/centro/${centro}/tutores`;

        const params = new HttpParams({}).set("idAlumno", idAlumno)

        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );


        return this.http.get<TutorInterface[]>(url,{params, headers});

    }

}