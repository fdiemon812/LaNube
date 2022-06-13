import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CentroInterface } from '../interfaces/centro.interface';


@Injectable({
    providedIn: 'root'
})
export class CentroService {
    
   
    constructor( private http:HttpClient){}


    /**
     * 
     * @returns Lista todos los centros
     */
    listarCentros():Observable<CentroInterface[]>{


        const url = `${ environment.urlApi }/centros`;
        const headers = new HttpHeaders() .set('Authorization',
         `Bearer ${localStorage.getItem('token')}` );

        return this.http.get<CentroInterface[]>(url, {headers});


    }

}