import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LaNube';



  idCentro2:number=0;

  procesaCentro(idCentro:any){
    console.log("mi centro es")
    console.log(idCentro);
    this.idCentro2=idCentro;
    
  }
}
