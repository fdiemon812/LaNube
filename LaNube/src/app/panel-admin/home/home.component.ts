import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroService } from '../services/centro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  centro!:number;

  constructor(private centroService: CentroService, private router:Router, private activatedRoute:ActivatedRoute) { }
  

  ngOnInit(): void {
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
  



 
}
