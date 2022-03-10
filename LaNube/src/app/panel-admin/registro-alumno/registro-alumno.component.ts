import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../services/alumno.service';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';
import { AulaInterface } from '../interfaces/aula.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {

  private idAlumno!:number;
   aulas!:any[];


    formularioAlumno: FormGroup = this.formBuilder.group({
      nombre: [ , [ Validators.required, Validators.maxLength(100), Validators.pattern(this.validatorAlumService.nombrePattern)]   ],
      apellidos: [ , [ Validators.required, Validators.maxLength(100),Validators.pattern(this.validatorAlumService.nombrePattern)] ],
      dni: [ , [ Validators.pattern(this.validatorAlumService.dniPattern)] ],
      nacimiento: [ , [ Validators.required,this.validatorAlumService.fechaValida]  ], 
      direccion:[],
      aula:[, [Validators.required]], 
      comida:[ ,[Validators.required]],   
      observaciones:[],
      horaEntrada:[],
      horaSalida:[],
      comeEnCentro:[,],
      tutores: this.formBuilder.array([



        //AQUI SE CREAN NUEVOS GRUPOS DE FORMULARIOS

        // this.formBuilder.group({

        //   nombreTutor:[],
        //   apellidoTutor:[],
        //   dniTutor:[]

        // })
      ])



    })

  constructor(private formBuilder:FormBuilder, private router:Router,  private validatorAlumService: ValidatorAlumnoService, private alumnoService:AlumnoService) { }

  ngOnInit(): void {
    this.formularioAlumno.reset({});
    this.listarAulas();
  }



  get tutoresArr():any{
    return this.formularioAlumno.get('tutores') as FormArray ;
  }

  //CREA UN NUEVO FORMULARIO TUTOR
  crearTutor(){
    return this.formBuilder.group({

      nombreTutor:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)]],
      apellidoTutor:[,[Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)],],
      dniTutor:[,[Validators.required, Validators.pattern(this.validatorAlumService.dniPattern)],],
      emailTutor:[,[Validators.required, Validators.pattern(this.validatorAlumService.emailPattern)],[this.validatorAlumService]],
      tlfTutor:[,],
      passwordTutor:[,Validators.required] 
      
    })
  }

  agregarTutor() {


    let tutorArray= this.formularioAlumno.get('tutores') as FormArray;
  
    tutorArray.push(this.crearTutor());
  

  }



  campoNoValido( campo: string ) {


    return this.formularioAlumno.get(campo)?.invalid
            && this.formularioAlumno.get(campo)?.touched;
  }

//ESTO DEVUELVE TRUE SI FALLA UN CAMPO CONCRETO DEL TUTOR i;
  campoNoValidoArray( campo: string, i:number ) {
    let cadena =`tutores.${i}.${campo}`
    
    return this.formularioAlumno.get(cadena)?.invalid
            && this.formularioAlumno.get(cadena)?.touched;
  }


 
  get comidaErrorMsg(): string {
    
    const errors = this.formularioAlumno.get('comida')?.errors!;
    if ( errors['required'] ) {
      return 'Comida es obligatorio';
    } 

    return '';}

  
  get nombreArrayErrorMsg(): string {
    
    const errors = this.formularioAlumno.get('nombreTutor')?.errors!;
    if ( errors['required'] ) {
      return 'Comida es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'Solo puede contener letras';
    } 

    return '';}

  get nombreErrorMsg(): string {
    
    const errors = this.formularioAlumno.get('nombre')?.errors!;
    if (errors!=null &&  errors['required'] ) {
      return 'Nombre es obligatorio';
    } else if (errors!=null && errors['pattern'] ) {
      return 'Solo puede contener letras';
    } 

    return '';}

    get emailErrorMsg(): string {
       let cadena
      const errors = this.formularioAlumno.get('tutores.0.emailTutor')?.errors!;
      if ( errors['required'] ) {
        return 'Correo obligatorio';
      } else if ( errors['emailTomado'] ) {
        return 'El email ya existe';
      } 
  
      return '';}

      get tlfErrorMsg(): string {
        let cadena
       const errors = this.formularioAlumno.get('tutores.0.tlfTutor')?.errors!;
       if ( errors['required'] ) {
         return 'Tlf obligatorio';
       
       } 
   
       return '';}
  
       
       get passwordErrorMsg(): string {
       
       const errors = this.formularioAlumno.get('tutores.0.passwordTutor')?.errors!;
       if (errors!=null &&  errors['required'] ) {
         return 'Contraseña obligatoria';
       
       } 
   
       return '';}
   
  
      
  get dniTutorErrorMsg(): string {

    const errors = this.formularioAlumno.get('tutores.0.dniTutor')?.errors!;
    if(errors!=null && errors['required']){
      return 'DNI obligatorio';
    }else if (errors!=null && errors['pattern'] ) {
      return 'Formato correcto -> 12345678B';
    } 

    return '';
  }



  get apellidosErrorMsg(): string {
  
    const errors = this.formularioAlumno.get('apellidos')?.errors!;
    if (errors!=null && errors['required'] ) {
      return 'Apellidos es obligatorio';
    } else if (errors!=null && errors['pattern'] ) {
      return 'Solo puede contener letras';
    } 

    return '';}

  get dniErrorMsg(): string {

    const errors = this.formularioAlumno.get('dni')?.errors!;
    if ( errors['pattern'] ) {
      return 'Formato correcto -> 12345678B';
    } 

    return '';
  }


  get fechaErrorMsg(): string {

 
    const errors = this.formularioAlumno.get('nacimiento')?.errors!;
    if ( errors['required'] ) {

      return 'Fecha obligatoria';
    } else if(errors['fechaMayor']){
       return 'Debe ser inferior a la fecha actual'
    }

    return '';
  }


  get aulaErrorMsg(): string {


    const errors = this.formularioAlumno.get('aula')?.errors!;
    if ( errors['required'] ) {

      return 'Aula obligatoria';
    
    }

    return '';
  }


 


  // comprueba que campos no están validando en el formulario
  public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
    var invalidControls:string[] = [];
    let recursiveFunc = (form:FormGroup|FormArray) => {
      Object.keys(form.controls).forEach(field => { 
        const control = form.get(field);
        if (control?.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }        
      });
    }
    recursiveFunc(formToInvestigate);
   
    return invalidControls;
  }


   
  async submitForm(){
    
    this.formularioAlumno.markAllAsTouched();

    if(this.formularioAlumno.valid){

     let nombreAlumno = this.formularioAlumno.value.nombre;
     let apellidoAlumno = this.formularioAlumno.value.apellidos;
     let dniAlumno = this.formularioAlumno.value.dni;
     let direccion = this.formularioAlumno.value.direccion;
     
     let fechaNacimiento = this.formularioAlumno.value.nacimiento;
     const aula = {"id":parseInt(this.formularioAlumno.value.aula)};
    //  let salida = this.formularioAlumno.value.horaSalida;
     let comida = this.formularioAlumno.value.comida;
     let horaEntrada = this.formularioAlumno.value.horaEntrada;
     let horaSalida = this.formularioAlumno.value.horaSalida;
     let observaciones = this.formularioAlumno.value.observaciones;
     let comeEnCentro = this.formularioAlumno.value.comeEnCentro;

    let tutores= this.formularioAlumno.value.tutores;


    this.crearAlumno(nombreAlumno, apellidoAlumno, dniAlumno,
       fechaNacimiento, direccion, tutores, comida, horaEntrada, horaSalida, observaciones,aula, comeEnCentro );


    
     

    }
  }
  

  crearAlumno(nombre:string, apellido:string, dni:string, fecha:Date, direccion:string,  tutores:any[],
     comida:string, horaEntrada:string, horaSalida:string, observaciones:string, aula:any, comeEnCentro:boolean){


    this.alumnoService.registrarAlumno(nombre, apellido, dni, fecha, 
      direccion, comida, horaEntrada, horaSalida, observaciones, aula, comeEnCentro).subscribe({


      next: resp=>{
        tutores.forEach((tutor: { nombreTutor: string; apellidoTutor: string; dniTutor: string; tlfTutor: string; emailTutor: string; passwordTutor: string; }) => {
          this.registrarTutor(tutor.nombreTutor, tutor.apellidoTutor, tutor.dniTutor, tutor.tlfTutor, tutor.emailTutor, tutor.passwordTutor, resp.id)
        });
        this.router.navigateByUrl('home/alumno');
      },
      error: error=>{


      }



    })


  }



  


  agregarTutorAlumno(email:string, idAlumno:number){


    this.alumnoService.agregarTutorAlumno(email, idAlumno).subscribe({


      next: resp=>{
        this.router.navigateByUrl('home');
      },
      error: error=>{


      }

  })
  }


  registrarTutor(nombre:string, apellido:string, dni:string, tlf:string, email:string, password:string, idAlumno:number){
    this.alumnoService.registrarTutor(nombre, apellido, dni, tlf, email, password).subscribe({


      next: resp=>{
        this.agregarTutorAlumno(email, idAlumno);
        // this.router.navigateByUrl('home');
      },
      error: error=>{


      }



    })


  }



  listarAulas(){

    this.alumnoService.listarAula().subscribe({

      next:resp =>{
      
        this.aulas=resp;
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


  


}