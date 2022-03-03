import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { AulaInterface } from '../interfaces/aula.interface';

@Component({
  selector: 'app-filtro-alumno',
  templateUrl: './filtro-alumno.component.html',
  styleUrls: ['./filtro-alumno.component.css']
})
export class FiltroAlumnoComponent implements OnInit {

  idAula!:number;
  aulas!:AulaInterface[];
  constructor(private alumnoService:AlumnoService) { }

  ngOnInit(): void {

    this.listarAulas();
  }



  @Output() aulaEvento = new EventEmitter();




  cambiarAula(){
    console.log("emitiendo");
    console.log(this.idAula);


    this.aulaEvento.emit(this.idAula);


    
    console.log(this.idAula);
    
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
