

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AlumnoComponent } from '../alumno/alumno.component';
import { AlumnoService } from './alumno.service';


@Injectable({
    providedIn: 'root'
})
export class CentroService{
    
    idCentro:number=1;
    
    cambiarCentro(idCentro: number ):void {
        this.idCentro=idCentro;
       
       


    }

    get obtenerCentro():number{
        return this.idCentro;
    }
    
   
    constructor(private http:HttpClient, private router:Router){}




}
