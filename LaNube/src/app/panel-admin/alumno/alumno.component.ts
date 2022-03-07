import { ViewChild, Component, Input, OnChanges, OnDestroy, OnInit,  } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import {Subject} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CentroService } from '../services/centro.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit, OnDestroy, OnChanges {

  @Input()  idAulaInput:number=0;

   alumnos:AlumnoInterface[]=[];
  
   isCargado:boolean=false;
   dtOptions: DataTables.Settings ={};
   dtTrigger: Subject<any> = new Subject<any>();

   @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
   
  
  


  constructor(private alumnoService: AlumnoService,
    private centroService:CentroService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      
      responsive: true,
      language: {
        
        url: '/assets/es-ES.json'
      }
    }
    
    this.activatedRoute.queryParams.subscribe({
      next: ((params) => {

        if(params['centro']!=null){
          
          this.changeCentro(parseInt(params['centro']));
        }else{
          // this.changeCentro(parseInt(params['centro']));
        }
          
      })
    })
    this.listarAlumnos();
   
    
    }


  changeCentro(centro:number) {
    this.alumnoService.cambiarCentro(centro);
    console.log("cambiando centro" + centro)
    this.ngOnChanges();
  }
    
 
    ngOnChanges(){
      console.log("OnChanges!")
      if(this.isCargado==true && this.idAulaInput!=0){
        
        this.listarAlumnosAula();     
       
      } else if(this.isCargado == true){

        this.listarAlumnos();
      }

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
 


  listarAlumnos():any{
    console.log("listando alumnos")
    return this.alumnoService.listarAlumnos().subscribe({

      next:resp =>{
        this.alumnos=resp;
        if(!this.isCargado){
          this.dtTrigger.next(this.dtOptions);
          this.isCargado=true;

        }else{

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });       


        }



        
      },
      error: error =>{

      }

    })
  }

  listarAlumnosAula():any{

    console.log("listando Aulas")

    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{
       
        this.alumnos=resp;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(null);
        });        
      },
      error: error =>{
        
      }

    })
  }



}
