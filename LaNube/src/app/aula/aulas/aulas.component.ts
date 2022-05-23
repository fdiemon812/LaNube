import { Component, OnInit } from '@angular/core';
import { AulaService } from '../../services/aula.service';
import { AulaInterface } from '../../panel-admin/interfaces/aula.interface';
import Swal from 'sweetalert2';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';
import { AlumnoService } from 'src/app/panel-admin/services/alumno.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    templateUrl: './aulas.component.html'
})
export class AulasComponent implements OnInit {

    aulas: AulaInterface[]=[];

    availables:AlumnoInterface[]=[];
    notAvailables:AlumnoInterface[]=[]
    dialogUser!:boolean;
    selectedToAddUser!:AulaInterface
    backupList: AlumnoInterface[]=[];





    constructor(private aulaService: AulaService, private alumnoService: AlumnoService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

        // this.productService.getProductsSmall().then(data => this.products = data);

        this.listarAulas();
    }



    cargarBackup(){
      console.log(this.notAvailables);
      console.log(this.availables);
      this.backupList=this.notAvailables.slice()
      console.log(this.backupList);

    }


    guardarCambios() {
      if(!(JSON.stringify(this.backupList)===JSON.stringify(this.notAvailables))){   
   
      this.confirmationService.confirm({
        key:'confirm2',
        message: '¿Quiere guardar los cambios antes de salir?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
            this.addUser();
        },
        reject: () => {
        }
    });
    }

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
   
  this.loadAddUser();
  this.alumnoService.listarAlumnos().subscribe((resp) => {
    this.notAvailables = resp;
    this.backupList=this.notAvailables.slice()

    
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