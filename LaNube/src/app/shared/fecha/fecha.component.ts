import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

    date=new Date()

   pipe = new DatePipe('en-US');
   fecha:any=this.pipe.transform(Date.now(), 'yyyy-MM-dd');



   @Output() fechaEvento = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

    console.log(this.date.getFullYear()+"-"+this.date.getDate()+"-"+(this.date.getMonth()+1))
    let today: Date = new Date();
   let  pipe = new DatePipe('en-US');
   let todayWithPipe = null;
    todayWithPipe = pipe.transform(Date.now(), 'yyyy-dd-MM');
    console.log(todayWithPipe);


  }

  cambiarFecha(){


    this.fechaEvento.emit(this.fecha);
  }

}
