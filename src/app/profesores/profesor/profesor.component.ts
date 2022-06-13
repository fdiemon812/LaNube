import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { ConfirmationService } from 'primeng/api';
import { ProfesorService } from '../../services/profesor.service';
import { ProfesorInterface } from '../../interfaces/profesor.interface';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorAlumnoService } from 'src/app/panel-admin/services/validator.alumno.service';

@Component({
    templateUrl: './profesor.component.html'
})
export class ProfesorComponent implements OnInit {

  profesores: ProfesorInterface[]=[];

  nombreProfesor!: string;
  selectedProfesor!: any;
  profesor!: ProfesorInterface;


  formulario: FormGroup = this.formBuilder.group({
       nombre:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)]],
      apellidos:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)],],
      dni:[,[Validators.required, Validators.pattern(this.validatorAlumService.dniPattern)],],
      email:[,[Validators.required, Validators.pattern(this.validatorAlumService.emailPattern)],[this.validatorAlumService]],
      tlf:[,[Validators.required]],
  })



  formularioEditar: FormGroup = this.formBuilder.group({
    nombre:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)]],
   apellidos:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)],],
   dni:[,[Validators.required, Validators.pattern(this.validatorAlumService.dniPattern)],],
   tlf:[,[Validators.required]],
})


    constructor(private confirmationService: ConfirmationService,
       private profesorService:ProfesorService,
       private formBuilder: FormBuilder,
       private validatorAlumService: ValidatorAlumnoService
       ) { }

    ngOnInit() {


        this.listarProfesores();
    }






    listarProfesores(){

        this.profesorService.listarProfesores().subscribe({

            next:resp =>{

              this.profesores=resp;
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




  borrarProfesor(id:number){
    this.confirmationService.confirm({
      key:'confirmBorrar',
      message: '¿Seguro que quieres borrar el profesor?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
           this.profesorService.borrarProfesor(id).subscribe({

            next:resp=>{
              this.listarProfesores();
              Swal.fire({
                icon: 'success',
                title: 'Profesor borrado',
                showConfirmButton: false,
                timer: 1500
              })
            },
            error:err=>{
              Swal.fire({
              icon: 'error',
              title: 'Ups... Es embarazoso, pero algo no funciona',
              showConfirmButton: false,
              timer: 1500
            })}

          })
      },
      reject: () => {
      }
  });  }




  editarProfesor(profe:ProfesorInterface){
    this.profesor=profe;
    this.nombreProfesor=profe.nombre;
    this.selectedProfesor=profe.id;


  this.formularioEditar.reset({

    nombre: profe.nombre ,
    apellidos: profe.apellidos,
    dni: profe.dni,
    tlf: profe.tlf,
    email: profe.email
})


  }

  editarProfesorSubmit(){

const profesorEditado:ProfesorInterface={
  nombre: this.formularioEditar.value.nombre,
  apellidos: this.formularioEditar.value.apellidos,
  dni: this.formularioEditar.value.dni,
  tlf: this.formularioEditar.value.tlf,
  email: this.profesor.email,
  role: 'PROFESOR',
}


    this.profesorService.editarProfesor(profesorEditado, this.selectedProfesor).subscribe({

      next:resp=>{
        this.listarProfesores();
        Swal.fire({
          icon: 'success',
          title: 'Profesor editada',
          showConfirmButton: false,
          timer: 1500
        })
        this.nombreProfesor=""
      },
      error:err=>{
        this.nombreProfesor=""
        Swal.fire({
        icon: 'error',
        title: 'Ups... Es embarazoso, pero algo no funciona',
        showConfirmButton: false,
        timer: 1500
      })}

    })

  }

  campoNoValido( campo: string ) {


    return this.formulario.get(campo)?.invalid
            && this.formulario.get(campo)?.touched;
  }

  get apellidosErrorMsg(): string {

    const errors = this.formulario.get('apellidos')?.errors!;
    if (errors!=null && errors['required'] ) {
      return 'Apellidos es obligatorio';
    } else if (errors!=null && errors['pattern'] ) {
      return 'Solo puede contener letras';
    }

    return '';}

    get tlfErrorMsg(): string {
     const errors = this.formulario.get('tlf')?.errors!;
     if ( errors['required'] ) {
       return 'Tlf obligatorio';

     }

     return '';}


    get nombreErrorMsg(): string {

      const errors = this.formulario.get('nombre')?.errors!;
      if (errors!=null && errors['required'] ) {
        return 'Nombre es obligatorio';
      } else if (errors!=null && errors['pattern'] ) {
        return 'Solo puede contener letras';
      }

      return '';}



  get dniErrorMsg(): string {

    const errors = this.formulario.get('dni')?.errors!;
    if(errors!=null && errors['required']){
      return 'DNI obligatorio';
    }else if (errors!=null && errors['pattern'] ) {
      return 'Formato correcto -> 12345678B';
    }

    return '';
  }


  get emailErrorMsg(): string {
    let cadena
   const errors = this.formulario.get('email')?.errors!;
   if ( errors['required'] ) {
     return 'Correo obligatorio';
   } else if ( errors['emailTomado'] ) {
     return 'El email ya existe';
   }

   return '';}



   campoNoValidoEditar( campo: string ) {


    return this.formularioEditar.get(campo)?.invalid
            && this.formularioEditar.get(campo)?.touched;
  }

  get apellidosEditarErrorMsg(): string {

    const errors = this.formularioEditar.get('apellidos')?.errors!;
    if (errors!=null && errors['required'] ) {
      return 'Apellidos es obligatorio';
    } else if (errors!=null && errors['pattern'] ) {
      return 'Solo puede contener letras';
    }

    return '';}

    get tlfEditarErrorMsg(): string {
     const errors = this.formularioEditar.get('tlf')?.errors!;
     if ( errors['required'] ) {
       return 'Tlf obligatorio';

     }

     return '';}


    get nombreEditarErrorMsg(): string {

      const errors = this.formularioEditar.get('nombre')?.errors!;
      if (errors!=null && errors['required'] ) {
        return 'Nombre es obligatorio';
      } else if (errors!=null && errors['pattern'] ) {
        return 'Solo puede contener letras';
      }

      return '';}



  get dniEditarErrorMsg(): string {

    const errors = this.formularioEditar.get('dni')?.errors!;
    if(errors!=null && errors['required']){
      return 'DNI obligatorio';
    }else if (errors!=null && errors['pattern'] ) {
      return 'Formato correcto -> 12345678B';
    }

    return '';
  }


  get emailEditarErrorMsg(): string {
    let cadena
   const errors = this.formularioEditar.get('email')?.errors!;
   if ( errors['required'] ) {
     return 'Correo obligatorio';
   } else if ( errors['emailTomado'] ) {
     return 'El email ya existe';
   }

   return '';}


  crearProfesor(){

    this.profesorService.crearProfesor(this.formulario.value).subscribe({

      next:resp=>{
        this.listarProfesores();
        Swal.fire({
          icon: 'success',
          title: 'Profesor creado',
          showConfirmButton: false,
          timer: 1500
        })

        this.formulario.reset();
      },
      error:err=>{
        Swal.fire({
        icon: 'error',
        title: 'Ups... Es embarazoso, pero algo no funciona',
        showConfirmButton: false,
        timer: 1500
      })}




    })

  }




}
