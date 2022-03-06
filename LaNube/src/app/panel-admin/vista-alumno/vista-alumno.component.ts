import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.component.html',
  styleUrls: ['./vista-alumno.component.css']
})
export class VistaAlumnoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


   idAulaInput:number=0;

  procesaAula(idAula:any){
    
    this.idAulaInput=idAula;
    
  }

}
