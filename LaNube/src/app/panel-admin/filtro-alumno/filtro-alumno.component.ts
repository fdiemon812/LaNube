import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { AulaInterface } from '../interfaces/aula.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-alumno',
  templateUrl: './filtro-alumno.component.html',
  styleUrls: ['./filtro-alumno.component.css']
})
export class FiltroAlumnoComponent implements OnInit {

  idAula!:number;
  aulas!:AulaInterface[];
  constructor(private alumnoService:AlumnoService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next: ((params) => {
        this.changeCentro((params['centro']));
      })
    })

  }



  @Output() aulaEvento = new EventEmitter();



   changeCentro(centro:string) {
    
    this.alumnoService.cambiarCentro(centro);
    this.listarAulas();

   }

  cambiarAula(){
    

    this.aulaEvento.emit(this.idAula);    
  }

  listarAulas(){

    this.alumnoService.listarAula().subscribe({

      next:resp =>{
      
        this.aulas=resp;
      },
      error:error=>{

      }
    })
  }
}
