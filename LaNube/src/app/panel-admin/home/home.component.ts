import { CompileEntryComponentMetadata } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CentroInterface } from '../interfaces/centro.interface';
import { CentroService } from '../services/centro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  centro:number=1;
  centros!:CentroInterface[];
  constructor( private router:Router, private activatedRoute:ActivatedRoute, private centroService:CentroService) { }
  

  ngOnInit(): void {

    this.listarCentros();
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
 
}
