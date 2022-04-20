import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlumnoService } from '../../panel-admin/services/alumno.service';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';
import { AsistenciaService } from '../../panel-admin/services/asistencia.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  idAulaInput:number=0;
  fecha:Date=new Date();
  alumnos!:AlumnoInterface[];

  
  constructor(private alumnoService:AlumnoService, private estadoAlumno: AsistenciaService) { }
  
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
    this.ngOnChanges();
  }

  procesaFecha(fecha:any){
    
    
    
    let year =fecha.substring(0,4)
    let mes = fecha.substring(5,7)
    let dia = fecha.substring(8,10)
   
    
    
    
    this.fecha=new Date(year+"/"+mes+"/"+dia);

    
    this.ngOnChanges();

  }
  
  
  listarAlumnosAula():any{


    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{
       
        this.alumnos=resp;

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


        this.alumnos.forEach(alumno => {
      
          
          let mes:number =  this.fecha.getMonth()+1;
          

          this.getEstadoAlumno(this.fecha.getDate(), mes, this.fecha.getFullYear(), alumno.id)
          
          
    
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



  cambiarAsistencia(alumno:AlumnoInterface){}


  

  getEstadoAlumno(dia:number, mes:number, year:number, idAlumno:number){


    this.estadoAlumno.listarAsistenciaAlumno(dia, mes, year, idAlumno).subscribe({

      next:estado =>{
       
       

       let idAlumno = estado.idAlumno;
       let asistencia = estado.asistencia;

       if(asistencia){

         document.getElementById(idAlumno+"asistencia")?.setAttribute("checked", "true");
       }

        document.getElementById(idAlumno+"entrada")?.setAttribute("value", estado.horaEntrada)
        document.getElementById(idAlumno+"salida")?.setAttribute("value", estado.horaSalida)
        
        
       


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


  submit(){

    let pos=0;
    document.getElementsByName("fila").forEach(estado => {
      
     let horaEntrada = document.getElementsByName("fila")[pos].getElementsByTagName("input")[0].value
     let horaSalida = document.getElementsByName("fila")[pos].getElementsByTagName("input")[1].value
    //  let asistencia = document.getElementsByName("fila")[pos].getElementsByTagName("input")[0].value
     
       
      pos++;

    });

    
  }


}
