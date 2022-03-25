import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../services/alumno.service';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';
import Swal from 'sweetalert2';
import { TutoresService } from '../services/tutores.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlumnoInterface } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

   alumno!:AlumnoInterface;

   tutoresExistentes:number = 0;
   tutoresExistentesArray:any[]=[];
  
   aulas!:any[];


    formularioAlumno: FormGroup = this.formBuilder.group({
      nombre: [  , [ Validators.required, Validators.maxLength(100), Validators.pattern(this.validatorAlumService.nombrePattern)]   ],
      apellidos: [ , [ Validators.required, Validators.maxLength(100),Validators.pattern(this.validatorAlumService.nombrePattern)] ],
      dni: [ , [ Validators.pattern(this.validatorAlumService.dniPattern)] ],
      nacimiento: [ , [ Validators.required,this.validatorAlumService.fechaValida]  ], 
      direccion:[],
      aula:[1, [Validators.required]], 
      comida:[ 'Comida',[Validators.required]],   
      observaciones:[,],
      horaEntrada:[],
      horaSalida:[],
      comeEnCentro:[,],
      tutoresExistentesArray1:[0,],
      tutoresExistentesArray2:[0,],
      tutores: this.formBuilder.array([



        //AQUI SE CREAN NUEVOS GRUPOS DE FORMULARIOS

        // this.formBuilder.group({

        //   nombreTutor:[],
        //   apellidoTutor:[],
        //   dniTutor:[]

        // })
      ])



    })

  constructor(private formBuilder:FormBuilder, private router:Router,  private activatedRoute:ActivatedRoute,
    private validatorAlumService: ValidatorAlumnoService,
    private jwt :JwtHelperService,
    private tutoresService:TutoresService,
    private alumnoService:AlumnoService) { }

  ngOnInit(): void {
    this.listarAulas();
    this.getAlumno( );


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
  // public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
  //   var invalidControls:string[] = [];
  //   let recursiveFunc = (form:FormGroup|FormArray) => {
  //     Object.keys(form.controls).forEach(field => { 
  //       const control = form.get(field);
  //       if (control?.invalid) invalidControls.push(field);
  //       if (control instanceof FormGroup) {
  //         recursiveFunc(control);
  //       } else if (control instanceof FormArray) {
  //         recursiveFunc(control);
  //       }        
  //     });
  //   }
  //   recursiveFunc(formToInvestigate);
   
  //   return invalidControls;
  // }


   
  async submitForm(){
    this.formularioAlumno.markAllAsTouched();

    if(this.formularioAlumno.valid){

      const alumnoModificado:AlumnoInterface={

        nombre:          this.formularioAlumno.value.nombre,
        apellidos:       this.formularioAlumno.value.apellidos,
        id:              this.activatedRoute.snapshot.params["id"],
        dni:             this.formularioAlumno.value.dni,
        direccion:       this.formularioAlumno.value.direccion,
        fechaNacimiento: this.formularioAlumno.value.nacimiento,
        horaEntrada:     this.formularioAlumno.value.horaEntrada,
        horaSalida:      this.formularioAlumno.value.horaSalida,
        comida:          this.formularioAlumno.value.comida,
        alta:            this.alumno.alta,
        comeEnCentro:    this.formularioAlumno.value.comeEnCentro,
        observaciones:   this.formularioAlumno.value.observaciones,
        aula:           { "id":parseInt(this.formularioAlumno.value.aula)} };


        
        
        
        
        let tutores= this.formularioAlumno.value.tutores;
        
        
        this.editarAlumnoDatos(alumnoModificado);
      }


    
     

    }
  
  

  editarAlumnoDatos(alumno: AlumnoInterface){



    console.log(alumno)

    // this.alumnoService.editarAlumno(alumno).subscribe({


    //   next: resp=>{
    //     console.log(resp)

    //   },
    //   error: error=>{


    //   }



    // })


  }



  


  agregarTutorAlumno(id:number, idAlumno:number){


    this.alumnoService.agregarTutorAlumno(id, idAlumno).subscribe({


      next: resp=>{
        this.router.navigateByUrl('home');
      },
      error: error=>{


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


  registrarTutor(nombre:string, apellido:string, dni:string, tlf:string, email:string, password:string, idAlumno:number){
    this.alumnoService.registrarTutor(nombre, apellido, dni, tlf, email, password).subscribe({


      next: resp=>{

        if(resp.jwt_token!= null){
          
         let id= this.jwt.decodeToken(resp.jwt_token!).id;
      
         this.agregarTutorAlumno(id, idAlumno);
        }

        // this.router.navigateByUrl('home');
      },
      error: error=>{

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


  listarTutores():void{

    this.tutoresService.listarTutores().subscribe({

      next:resp =>{
      
        
        this.tutoresExistentesArray=resp;
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


  elegirTutor():void{
    
  

      this.tutoresExistentes=this.tutoresExistentes+1;
      this.listarTutores();
    
    
  }


  getAlumno(){


    this.alumnoService.getAlumno(this.activatedRoute.snapshot.params['id']).subscribe({

      next:resp =>{
      
        this.alumno=resp;
        this.formularioAlumno.reset({


          
            nombre: resp.nombre ,
            apellidos: resp.apellidos,
            dni: resp.dni,
            nacimiento:resp.fechaNacimiento , 
            direccion: resp.direccion,
            aula: resp.aula.id, 
            comida: resp.comida,   
            observaciones:resp.observaciones,
            horaEntrada:resp.horaEntrada,
            horaSalida:resp.horaSalida,
            comeEnCentro:resp.comeEnCentro,
            // tutoresExistentesArray1:,
            // tutoresExistentesArray2:,
            tutores: this.formBuilder.array([
      
      
      
              //AQUI SE CREAN NUEVOS GRUPOS DE FORMULARIOS
      
              // this.formBuilder.group({
      
              //   nombreTutor:[],
              //   apellidoTutor:[],
              //   dniTutor:[]
      
              // })
            ])
      


        })
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