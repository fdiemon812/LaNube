import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
import { EstadoAlumnoInterface } from '../interfaces/asistencia.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado-alumno',
  templateUrl: './estado-alumno.component.html',
  styleUrls: ['./estado-alumno.component.css']
})
export class EstadoAlumnoComponent implements OnInit {

  constructor(private estadoAlumno: AsistenciaService, private activatedRouter: ActivatedRoute) { }

  descripcion:string="";
  tipo:string="eat";

  fecha:Date=new Date();
  estado:EstadoAlumnoInterface={ 
    id:          0,
    idAlumno:    0,
    bath1:       "",
    bath2:      "",
    bath3:      "",
    eat1:       "",
    eat2:        "",
    eat3:        "",
    horaEntrada: "",
    horaSalida:  "",
    asistencia:  false,
    fecha:      new Date()};


    
  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges() {


    this.getEstadoAlumno(this.fecha.getDate(), this.fecha.getMonth(), this.fecha.getFullYear(), this.activatedRouter.snapshot.params['id'])

  }


  addEstado(){
  
    
    
  }
  procesaFecha(fecha:any){
    
    
    
    let year =fecha.substring(0,4)
    let mes = fecha.substring(5,7)
    let dia = fecha.substring(8,10)
   
    
    
    
    this.fecha=new Date(year+"/"+mes+"/"+dia);

    
    this.ngOnChanges();

  }


  getEstadoAlumno(dia:number, mes:number, year:number, idAlumno:number){


    this.estadoAlumno.listarAsistenciaAlumno(dia, mes, year, idAlumno).subscribe({

      
      next:resp =>{

        this.estado=resp;
        console.log(this.estado);
        


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
