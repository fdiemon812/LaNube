import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
import { EstadoAlumnoInterface } from '../interfaces/asistencia.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-estado-alumno',
  templateUrl: './estado-alumno.component.html',
  styleUrls: ['./estado-alumno.component.css']
})
export class EstadoAlumnoComponent implements OnInit {

  constructor(private asistenciaAlumno: AsistenciaService,private estadoService:EstadoService,  private activatedRouter: ActivatedRoute) { }

  descripcion:string="";
  tipo:string="eat";
  fila:string="";

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


    this.getEstadoAlumno(this.fecha.getDate(), this.fecha.getMonth()+1, this.fecha.getFullYear(), this.activatedRouter.snapshot.params['id'])
    
    
    
  }



  maxEstados(){
    
  }

  addEstado(){

    if((document.getElementsByName("eat").length==3 && this.tipo=="eat") ||
    (document.getElementsByName("bath").length==3 && this.tipo=="bath") ){

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Has llegado al máximo de ese tipo`,
        text: 'Prueba a editar alguno',
        showConfirmButton: false,
        timer: 2500
      })
    }

    let hora= new Date();
    let cadenaTime = hora.getHours() +":"+hora.getMinutes()+" - ";

  


    if(this.tipo=="eat"){

      if(this.estado.eat1.length==0){
        this.estado.eat1=cadenaTime+this.descripcion;
      }else if(this.estado.eat2.length==0){
        this.estado.eat2=cadenaTime+this.descripcion;
      }else if(this.estado.eat3.length==0){        
        this.estado.eat3=cadenaTime+this.descripcion;

      }
    }else if(this.tipo=="bath"){
      if(this.estado.bath1.length==0){
        this.estado.bath1=cadenaTime+this.descripcion;
      }else if(this.estado.bath2.length==0){
        this.estado.bath2=cadenaTime+this.descripcion;
      }else if(this.estado.bath3.length==0){
        this.estado.bath3=cadenaTime+this.descripcion;

      }


    }

    
  
    this.estadoService.createEstadoAlumnos(this.estado,this.fecha.getDate(), this.fecha.getMonth()+1, 
    this.fecha.getFullYear()).subscribe({

      
      next:resp =>{

       this.estado=resp;
        


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
  procesaFecha(fecha:any){
    
    
    
    let year =fecha.substring(0,4)
    let mes = fecha.substring(5,7)
    let dia = fecha.substring(8,10)
   
    
    
    
    this.fecha=new Date(year+"/"+mes+"/"+dia);

    
    this.ngOnChanges();

  }


  getEstadoAlumno(dia:number, mes:number, year:number, idAlumno:number){


    this.asistenciaAlumno.listarAsistenciaAlumno(dia, mes, year, idAlumno).subscribe({

      
      next:resp =>{

        this.estado=resp;
        
        


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

  selectFila(fila:string){
    
    
    this.descripcion=(document.getElementById(fila)!.innerHTML).substring(7,20);
    this.fila=fila;
  }
  editarEstado(){
    let hora= new Date();
    let cadenaTime = hora.getHours() +":"+hora.getMinutes()+" - ";


  

    if(this.fila=="bath1"){
      this.estado.bath1=cadenaTime+this.descripcion;

    }else  if(this.fila=="bath2"){
      this.estado.bath2=cadenaTime+this.descripcion;

    }else  if(this.fila=="bath3"){
      this.estado.bath3=cadenaTime+this.descripcion;

    }else  if(this.fila=="eat1"){
      
      this.estado.eat1=cadenaTime+this.descripcion;
      
    }else  if(this.fila=="eat2"){
      this.estado.eat2=cadenaTime+this.descripcion;

    }else  if(this.fila=="eat3"){
      this.estado.eat3=cadenaTime+this.descripcion;

    }

    
    this.estadoService.createEstadoAlumnos(this.estado,this.fecha.getDate(), this.fecha.getMonth()+1, 
    this.fecha.getFullYear()).subscribe({

      
      next:resp =>{

       this.estado=resp;
        
       this.descripcion="";

      },
      error: error =>{
        this.descripcion="";
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


  borrarEstado(){

    let hora= new Date();
    let cadenaTime = hora.getHours() +":"+hora.getMinutes()+" - ";

        this.estado.eat1=cadenaTime+this.descripcion;


      if(this.fila=="bath1"){
      this.estado.bath1="";

    }else  if(this.fila=="bath2"){
      this.estado.bath2="";

    }else  if(this.fila=="bath3"){
      this.estado.bath3=""; 

    }else  if(this.fila=="eat1"){
      this.estado.eat1="";

    }else  if(this.fila=="eat2"){
      this.estado.eat2="";

    }else  if(this.fila=="eat3"){
      this.estado.eat3="";

    }
    this.descripcion="";

    this.estadoService.createEstadoAlumnos(this.estado,this.fecha.getDate(), this.fecha.getMonth()+1, 
    this.fecha.getFullYear()).subscribe({

      
      next:resp =>{

       this.estado=resp;
        


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
