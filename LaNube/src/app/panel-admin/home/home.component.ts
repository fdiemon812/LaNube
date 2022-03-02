import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  idCentro!:number;
  constructor() { }

  ngOnInit(): void {
  }


  @Output() centro = new EventEmitter();




  cambiarCentro(){
    console.log("emitiendo");
    console.log(this.idCentro);


    this.centro.emit(this.idCentro);


    
    console.log(this.centro);
    
  }
}
