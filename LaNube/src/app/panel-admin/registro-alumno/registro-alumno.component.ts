import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../services/alumno.service';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';

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
      tutores: this.formBuilder.array([

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


  // get tutoresArr() {
  //   return this.formularioAlumno.get('tutores') as FormArray;
  // }

  get tutoresArr():any{
    return this.formularioAlumno.get('tutores') as FormArray ;
  }

  crearTutor(){
    return this.formBuilder.group({

      nombreTutor:[,Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)],
      apellidoTutor:[,Validators.required, Validators.pattern(this.validatorAlumService.nombrePattern)],
      dniTutor:[,Validators.required, Validators.pattern(this.validatorAlumService.dniPattern)],
      emailTutor:[,[Validators.required, Validators.pattern(this.validatorAlumService.emailPattern)],[this.validatorAlumService]],
      tlfTutor:[,Validators.required],
      passwordTutor:[,Validators.required]


      
    })
  }

  agregarTutor() {


    // const tutor = this.formBuilder.group({
    //   nombreTutor: new FormControl('', Validators.required),
    //   apellidoTutor: new FormControl('',Validators.required),
    //   dniTutor: new FormControl('',Validators.required)
      
    // });
    let tutorArray= this.formularioAlumno.get('tutores') as FormArray;
  
    tutorArray.push(this.crearTutor());
  

  }



  campoNoValido( campo: string ) {


    return this.formularioAlumno.get(campo)?.invalid
            && this.formularioAlumno.get(campo)?.touched;
  }


  campoNoValidoArray( campo: string, i:number ) {

    return this.formularioAlumno.get('tutores.0.emailTutor')?.invalid
            && this.formularioAlumno.get('tutores.0.emailTutor')?.touched;
  }


 


  


  get nombreErrorMsg(): string {
    
    const errors = this.formularioAlumno.get('nombre')?.errors!;
    if ( errors['required'] ) {
      return 'Nombre es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'Solo puede contener letras';
    } 

    return '';}

    get emailErrorMsg(): string {
    
      const errors = this.formularioAlumno.get('tutores.0.emailTutor')?.errors!;
      if ( errors['required'] ) {
        return 'Correo obligatorio';
      } else if ( errors['emailTomado'] ) {
        return 'El email ya existe';
      } 
  
      return '';}
  
      



  get apellidosErrorMsg(): string {
  
    const errors = this.formularioAlumno.get('apellidos')?.errors!;
    if ( errors['required'] ) {
      return 'Apellidos es obligatorio';
    } else if ( errors['pattern'] ) {
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

    console.log("comprobando errores")

    const errors = this.formularioAlumno.get('nacimiento')?.errors!;
    if ( errors['required'] ) {
      console.log("comprobando error1")

      return 'Fecha obligatoria';
    } else if(errors['fechaMayor']){
      console.log("comprobando error2")
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
    // console.log("hola")
    console.log(this.formularioAlumno.valid)
    console.log(this.formularioAlumno.value)
    this.formularioAlumno.markAllAsTouched();

    // this.findInvalidControlsRecursive(this.formularioAlumno)
    if(this.formularioAlumno.valid){

     let nombreAlumno = this.formularioAlumno.value.nombre;
     let apellidoAlumno = this.formularioAlumno.value.apellidos;
     console.log(apellidoAlumno);
     let dniAlumno = this.formularioAlumno.value.dni;
     let direccion = this.formularioAlumno.value.direccion;
     
     let fechaNacimiento = this.formularioAlumno.value.nacimiento;
     let aula = this.formularioAlumno.value.aula;
    //  let salida = this.formularioAlumno.value.horaSalida;

   

    let tutores= this.formularioAlumno.value.tutores;


    this.crearAlumno(nombreAlumno, apellidoAlumno, dniAlumno,
       fechaNacimiento, direccion, aula, tutores);


    
     

    }
  }
  

  crearAlumno(nombre:string, apellido:string, dni:string, fecha:Date, direccion:string, aula:number, tutores:any[]){

    this.alumnoService.registrarAlumno(nombre, apellido, dni, fecha, direccion).subscribe({


      next: resp=>{
        this.agregarAula(aula, resp.id);
        tutores.forEach((tutor: { nombreTutor: string; apellidoTutor: string; dniTutor: string; tlfTutor: string; emailTutor: string; passwordTutor: string; }) => {
          console.log(tutor)
           this.registrarTutor(tutor.nombreTutor, tutor.apellidoTutor, tutor.dniTutor, tutor.tlfTutor, tutor.emailTutor, tutor.passwordTutor, resp.id)
        });
      },
      error: error=>{

        console.log(error)

      }



    })


  }



  agregarAula(aula: number, idAlumno:number) {


    this.alumnoService.agregarAula(aula, idAlumno).subscribe({


      next: resp=>{
        this.router.navigateByUrl('home');
      },
      error: error=>{

        console.log(error)

      }

  })}


  agregarTutorAlumno(email:string, idAlumno:number){


    this.alumnoService.agregarTutorAlumno(email, idAlumno).subscribe({


      next: resp=>{
        this.router.navigateByUrl('home');
      },
      error: error=>{

        console.log(error)

      }

  })
  }


  registrarTutor(nombre:string, apellido:string, dni:string, tlf:string, email:string, password:string, idAlumno:number){
    console.log(password)
    this.alumnoService.registrarTutor(nombre, apellido, dni, tlf, email, password).subscribe({


      next: resp=>{
        console.log(resp)
        this.agregarTutorAlumno(email, idAlumno);
        // this.router.navigateByUrl('home');
      },
      error: error=>{

        console.log(error)

      }



    })


  }



  listarAulas(){

    this.alumnoService.listarAula().subscribe({

      next:resp =>{
        console.log(resp)
        console.log(this.aulas)
        this.aulas=resp;
      },
      error:error=>{

        console.log(error);
      }
    })
  }


  


}