import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit, OnDestroy {

  
  idCentro2:number=0;

   alumnos:AlumnoInterface[]=[];
  
   dtOptions: DataTables.Settings = {  };
   dtTrigger: Subject<any> = new Subject<any>();


  constructor(private alumnoService: AlumnoService) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        url: '/assets/es-ES.json'
      }}
      this.listarAlumnos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  procesaCentro(idCentro:any){
    console.log("mi centro es")
    console.log(idCentro);
    this.idCentro2=idCentro;
    
  }


  listarAlumnos():any{

    return this.alumnoService.listarAlumnos().subscribe({

      next:resp =>{
        this.alumnos=resp;
        this.dtTrigger.next(this.alumnos);
        
      },
      error: error =>{

      }

    })

   

  }

}
