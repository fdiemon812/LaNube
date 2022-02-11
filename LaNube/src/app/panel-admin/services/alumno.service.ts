import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AlumnoInterface } from "../interfaces/alumno.interface";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService{

    constructor(private http:HttpClient){

    }

    listarAlumnos():Observable<AlumnoInterface[]>{

        const url = `${ environment.urlApi }/alumnos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );
                

        return this.http.get<AlumnoInterface[]>(url, {headers});
    }


}