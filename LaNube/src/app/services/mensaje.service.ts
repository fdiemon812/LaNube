import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MensajeInterface } from "../interfaces/mensaje.interface";
import { AlumnoInterface } from "../panel-admin/interfaces/alumno.interface";

@Injectable({
    providedIn: 'root'
})
export class MensajeService {


    constructor(private http:HttpClient){

    }






    /**
     *
     * @returns Lista todos los alumnos de un centro
     */

    listarMensajesRecibidos():Observable<MensajeInterface[]>{

        const url = `${ environment.urlApi }/mensajes/recibidos`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );


        return this.http.get<MensajeInterface[]>(url, {headers});
    }






}
