import { Component, OnInit } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  private alumnos:AlumnoInterface[]=[];


  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.listarAlumnos();
  }


  listarAlumnos():void{

    return this.alumnoService.listarAlumnos().subscribe({

      next:(),
      error:()
    })

  }

}
