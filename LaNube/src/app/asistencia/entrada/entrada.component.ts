import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlumnoService } from '../../panel-admin/services/alumno.service';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  idAulaInput:number=0;
  fecha!:string;
  alumnos!:AlumnoInterface[];

  
  constructor(private alumnoService:AlumnoService) { }
  
  ngOnInit(): void {
  this.ngOnChanges();
  }


  ngOnChanges(){
    if( this.idAulaInput!=0){
      
      this.listarAlumnosAula();     
     
    } else{

      this.listarAlumnos();
    }

}
  
  
  
  
  procesaAula(idAula:any){
    
    this.idAulaInput=idAula;
    
  }

  procesaFecha(fecha:any){
    
    this.fecha=fecha;
    
  }
  
  
  listarAlumnosAula():any{


    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{
       
        this.alumnos=resp;
        console.log(resp);

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



  listarAlumnos():any{
    return this.alumnoService.listarAlumnos().subscribe({

      next:resp =>{

        this.alumnos=resp;
        console.log(resp);

      },
      error: error =>{

        console.log(error);

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



  cambiarAsistencia(alumno:AlumnoInterface){}
}
