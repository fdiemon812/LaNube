import { CompileEntryComponentMetadata } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilesService } from 'src/app/services/utiles.service';
import Swal from 'sweetalert2';
import { CentroInterface } from '../interfaces/centro.interface';
import { CentroService } from '../services/centro.service';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  centro:number=10001;
  centros!:CentroInterface[];
  rol!:string;
  aviso:boolean=false;


  constructor( private router:Router,
     private activatedRoute:ActivatedRoute,
     private centroService:CentroService,
     private utilesService:UtilesService,
     private mensajeService:MensajeService) { }


  ngOnInit(): void {
    this.checkMensaje();
    this.getRol();


    if(this.rol!='TUTOR'){

      this.listarCentros();
    }
  }


  cambiarCentro(): void {

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { centro: this.centro },
        queryParamsHandling: 'merge'
      });
  }


  cerrarSesion(){

    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }


  listarCentros(){


    return this.centroService.listarCentros().subscribe({

      next:resp =>{

        this.centros=resp;


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

  getRol(){
    this.rol=this.utilesService.getRol();
  }




  checkMensaje(){

    this.mensajeService.listarMensajesNoLeidos().subscribe({

      next: resp=>{
        if(resp.length>0){
          this.aviso=true;
        }else{
          this.aviso=false;

        }




      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }


    })


  }

}
