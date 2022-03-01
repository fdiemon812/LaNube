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

   alumnos:AlumnoInterface[]=[];
   dtOptions: DataTables.Settings = {
     language: {
       url: "../../../assets/espa.json"
     }
   };
   dtTrigger: Subject<any> = new Subject<any>();


  constructor(private alumnoService: AlumnoService) { }
  
  ngOnInit(): void {
    this.listarAlumnos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
