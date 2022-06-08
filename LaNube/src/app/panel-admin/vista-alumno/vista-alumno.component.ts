import { Component, OnInit } from '@angular/core';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.component.html',
  styleUrls: ['./vista-alumno.component.css']
})
export class VistaAlumnoComponent implements OnInit {

  constructor(private utilService:UtilesService) { }

  rol!:string;

  ngOnInit(): void {
    this.rol=this.utilService.getRol()
  }


   idAulaInput:number=0;

  procesaAula(idAula:any){

    this.idAulaInput=idAula;

  }

}
