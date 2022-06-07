import { Component, OnInit } from '@angular/core';
import { AulaService } from '../../services/aula.service';
import { AulaInterface } from '../../panel-admin/interfaces/aula.interface';
import Swal from 'sweetalert2';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';
import { AlumnoService } from 'src/app/panel-admin/services/alumno.service';
import { ConfirmationService } from 'primeng/api';
import { ProfesorService } from '../../services/profesor.service';
import { ProfesorInterface } from '../../interfaces/profesor.interface';

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
    selectedAula!: number;


    availablesProf:ProfesorInterface[]=[];
    notAvailablesProf:ProfesorInterface[]=[]
    dialogProf!:boolean;
    backupListProf: ProfesorInterface[]=[];




    constructor(private aulaService: AulaService, private alumnoService: AlumnoService,
      private confirmationService: ConfirmationService, private profesorService:ProfesorService) { }

    ngOnInit() {


        this.listarAulas();
    }



    guardarCambios() {




      if(!(JSON.stringify(this.backupList)===JSON.stringify(this.notAvailables))){

      this.confirmationService.confirm({
        key:'confirm',
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


  /**
 * Método para añadir un usuario a una iniciativa
 */
addUser(){
  const listado = JSON.stringify(this.notAvailables)



  this.aulaService.asignarAlumnosAula( this.selectedAula, JSON.parse(listado)).subscribe({
    next: (resp => {


      }),
    error: resp=> {

      Swal.fire(
        '¡Error!', resp.error.mensaje, 'error'
        );
    }
    })
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
  this.selectedAula=aula.id;

  this.loadAddUser();
  this.alumnoService.listarAlumnosSinAula().subscribe((resp) => {
    this.availables = resp;


    this.backupList=this.notAvailables.slice()




  });
  this.alumnoService.listarAlumnosAula(aula.id).subscribe((resp) => {
    this.notAvailables = resp;
    this.backupList=this.notAvailables.slice()



  });
  this.selectedToAddUser = aula;
}



/**
 * Método para abrir el modal con el formulario de añadido de usuarios a una iniciativa
 */
loadAddUser(){
    this.dialogUser = !this.dialogUser;
}

// PROFESORES

/**
 * Método para apuntar al aula  a la que queremos añadir usuarios
 *
 */
 selectToAddProf(aula:AulaInterface){
  this.selectedAula=aula.id;

  this.loadAddProf();
  this.profesorService.listarProfesoresSinAula(10001).subscribe((resp) => {
    this.availablesProf = resp;


    this.backupListProf=this.notAvailablesProf.slice()




  });
  this.profesorService.listarProfesoresAula(this.selectedAula).subscribe((resp) => {
    this.notAvailablesProf = resp;
    this.backupListProf=this.notAvailablesProf.slice()



  });
  this.selectedToAddUser = aula;
}


/**
 * Método para abrir el modal con el formulario de añadido de usuarios a una iniciativa
 */
 loadAddProf(){
  this.dialogProf = !this.dialogProf;
}


guardarCambios2() {


  if(!(JSON.stringify(this.backupListProf)===JSON.stringify(this.notAvailablesProf))){

  this.confirmationService.confirm({
    key:'confirmProf',
    message: '¿Quiere guardar los cambios antes de salir?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Si',
    accept: () => {
         this.addProf();
    },
    reject: () => {
    }
});
}

}


/**
 * Método para añadir un usuario a una iniciativa
 */
 addProf(){
  const listado = JSON.stringify(this.notAvailablesProf)

  this.profesorService.asignarProfesoresAula( this.selectedAula, JSON.parse(listado)).subscribe({
    next: (resp => {


      }),
    error: resp=> {

      Swal.fire(
        '¡Error!', resp.error.mensaje, 'error'
        );
    }
    })
  }

}
