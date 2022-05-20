import { Component, OnInit } from '@angular/core';
import { AulaService } from '../../services/aula.service';
import { AulaInterface } from '../../panel-admin/interfaces/aula.interface';
import Swal from 'sweetalert2';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';
import { AlumnoService } from 'src/app/panel-admin/services/alumno.service';

@Component({
    templateUrl: './aulas.component.html'
})
export class AulasComponent implements OnInit {

    aulas: AulaInterface[]=[];

    availables:AlumnoInterface[]=[];
    notAvailables:AlumnoInterface[]=[]
    dialogUser!:boolean;
    selectedToAddUser!:AulaInterface





    constructor(private aulaService: AulaService, private alumnoService: AlumnoService) { }

    ngOnInit() {

        // this.productService.getProductsSmall().then(data => this.products = data);

        this.listarAulas();
    }



    listarAulas(){

        this.aulaService.listarAula().subscribe({

            next:resp =>{
            
              this.aulas=resp.slice(1);
            },
            error:error=>{
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Ups... Algo va mal',
                text: 'Intentalo más tarde',
                showConfirmButton: false,
                timer: 2000
              })
            }
          })
        }




/**
 * Método para apuntar al aula  a la que queremos añadir usuarios
 * 
 */
 selectToAddUser(aula:AulaInterface){
   console.log("holaaa");
   
  this.loadAddUser();
  this.alumnoService.listarAlumnos().subscribe((resp) => {
    this.notAvailables = resp;
  });
  this.alumnoService.listarAlumnosAula(aula.id).subscribe((resp) => {
    this.availables = resp;
  });
  this.selectedToAddUser = aula;
}



/**
 * Método para abrir el modal con el formulario de añadido de usuarios a una iniciativa
 */
loadAddUser(){
    this.dialogUser = !this.dialogUser;
}

}