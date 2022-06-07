import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

   fecha!:String;
   date=new Date()



   @Output() fechaEvento = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  cambiarFecha(){


    this.fechaEvento.emit(this.fecha);
  }

}
