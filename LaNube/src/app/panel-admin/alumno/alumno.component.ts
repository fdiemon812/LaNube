import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit,  } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit, OnDestroy, OnChanges {

  @Input()  idAulaInput:number=0;

   alumnos:AlumnoInterface[]=[];
  
   dtOptions: DataTables.Settings ={};
   dtTrigger: Subject<any> = new Subject<any>();
   
  
  


  constructor(private alumnoService: AlumnoService, private router:Router) { }
  
  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      
      responsive: true,
      language: {
        
        url: '/assets/es-ES.json'
      }
    }
    this.listarAlumnos();
   
    
    }
    
 
    ngOnChanges(){
     
      
             
      if(this.idAulaInput!=0){
        this.listarAlumnosAula();
        
      }

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
 


  listarAlumnos():any{

    return this.alumnoService.listarAlumnos().subscribe({

      next:resp =>{
        this.alumnos=resp;
          this.dtTrigger.next(null);
        
      },
      error: error =>{

      }

    })
  }

  listarAlumnosAula():any{
    console.log("entra en funcion")
    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{
       
        this.alumnos=resp;
          // this.dtTrigger.next(null)

        
      },
      error: error =>{
        
      }

    })
  }



}
