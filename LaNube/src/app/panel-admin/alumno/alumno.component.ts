import { ViewChild, Component, Input, OnChanges, OnDestroy, OnInit,  } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import {Subject} from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { isAdmin } from '../../guards/isAdmin.guard';
import { LoginService } from '../../login/services/login.service';
import Swal from 'sweetalert2';

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
    private activatedRoute: ActivatedRoute,
     private isAdmin:isAdmin, private loginService:LoginService,
     private router:Router) { }
  
  ngOnInit(): void {
   
    this.comprobarTutor();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      autoWidth:true,
      
      responsive: true,
      language: {
        
        url: 'http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    }
    
    this.activatedRoute.queryParams.subscribe({
      next: ((params) => {

        if(params['centro']!=null){
          
          this.changeCentro(parseInt(params['centro']));
        }
          
      })
    })
    this.listarAlumnos();
   
    
    }


  changeCentro(centro:number) {
    this.alumnoService.cambiarCentro(centro);
    this.ngOnChanges();
  }
    
 
    ngOnChanges(){
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

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })

      }

    })
  }

  listarAlumnosAula():any{


    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{
       
        this.alumnos=resp;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(null);
        });        
      },
      error: error =>{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }

    })
  }


  comprobarTutor():boolean{
    

    let respuesta: boolean=false;

    

    if(this.loginService.obtenerRol == "ADMINISTRADOR" ){

      respuesta = true;

    } else if(this.loginService.obtenerRol== null){

      localStorage.removeItem("token");
      this.router.navigateByUrl("/login");

    }

    return respuesta;

  }


  confirmarBorradoAlumno(idAlumno:number){

    Swal.fire({
      title: '¿Lo tienes claro?',
      text: "El alumno desaparecerá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.borrarAlumno(idAlumno);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Borrado',
          text: 'El alumno ha sido eliminado',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })


  }


  borrarAlumno(idAlumno:number):any{
    

    return this.alumnoService.borrarAlumno(idAlumno).subscribe({

      next:resp =>{
        
        this.ngOnChanges();
      },
      error: error =>{

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })

      }

    })
  }

}
