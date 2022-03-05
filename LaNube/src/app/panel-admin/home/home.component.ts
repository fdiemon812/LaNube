import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CentroService } from '../services/centro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  idCentro!:number;

  constructor(private centroService: CentroService) { }
  

  ngOnInit(): void {
  }


  cambiarCentro(): void {

    this.centroService.cambiarCentro(this.idCentro);
    console.log(this.idCentro);
  }
  



 
}
