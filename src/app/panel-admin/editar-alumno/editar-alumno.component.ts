import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../services/alumno.service';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';
import Swal from 'sweetalert2';
import { TutoresService } from '../services/tutores.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { TutorInterface } from '../interfaces/tutor.interface';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

   alumno!:AlumnoInterface;

   
   tutoresExistentesTotales: number=0;
   tutoresExistentes:number = 0;
   tutoresExistentesArray:any[]=[];
   tutoresAlumno:number[]=[0,0];
  
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
    this.listarTutores()
    this.listarAulas();
    this.getAlumno();

  
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


 

    if(this.tutoresExistentesTotales<2){
      this.tutoresExistentesTotales++;

    let tutorArray= this.formularioAlumno.get('tutores') as FormArray;
  
    tutorArray.push(this.crearTutor());



    }
   
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
         return 'Contrase??a obligatoria';
       
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


 


  // comprueba que campos no est??n validando en el formulario
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

    
    
    this.alumnoService.editarAlumno(alumno).subscribe({
      
      
      next: resp=>{
       this.modificarTutorAlumno()
        
       
       this.formularioAlumno.value.tutores.forEach((tutor: { nombreTutor: string; apellidoTutor: string; dniTutor: string; tlfTutor: string; emailTutor: string; passwordTutor: string; }) => {
        this.registrarTutor(tutor.nombreTutor, tutor.apellidoTutor, tutor.dniTutor, tutor.tlfTutor, tutor.emailTutor, tutor.passwordTutor, resp.id)
      });
      this.router.navigateByUrl('home/alumno');
    

       },
       error: error=>{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo m??s tarde',
          showConfirmButton: false,
          timer: 2000
        })

       }



     })


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
          text: 'Intentalo m??s tarde',
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
          
          //id del tutor
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
          text: 'Intentalo m??s tarde',
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
          text: 'Intentalo m??s tarde',
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
          text: 'Intentalo m??s tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }


  elegirTutor():void{
    
   

    if(this.tutoresExistentesTotales<2 && this.tutoresExistentes<2){

      this.tutoresExistentes=this.tutoresExistentes+1;
      this.tutoresExistentesTotales++;
      // this.listarTutores();
      
    }
    
  }


  getAlumno(){


    this.alumnoService.getAlumno(this.activatedRoute.snapshot.params['id']).subscribe({

      next:resp =>{
      
        this.alumno=resp;

        this.getTutores();
       
        
      },
      error:error=>{


        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo m??s tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })

  }



  getTutores(){
    this.tutoresService.listarTutoresAlumno(this.activatedRoute.snapshot.params['id']).subscribe({


      next:resp =>{
       

        if(resp.length==2){

          this.tutoresAlumno=[resp[0].id, resp[1].id];
        }else if(resp.length==1){
          this.tutoresAlumno=[resp[0].id, 0];

        }
        this.tutoresExistentes=resp.length;
        this.tutoresExistentesTotales=resp.length;

      
        this.formularioAlumno.reset({


          
          nombre: this.alumno.nombre ,
          apellidos: this.alumno.apellidos,
          dni: this.alumno.dni,
          nacimiento:this.alumno.fechaNacimiento , 
          direccion: this.alumno.direccion,
          aula: this.alumno.aula.id, 
          comida: this.alumno.comida,   
          observaciones:this.alumno.observaciones,
          horaEntrada:this.alumno.horaEntrada,
          horaSalida:this.alumno.horaSalida,
          comeEnCentro:this.alumno.comeEnCentro,
          tutoresExistentesArray1: this.tutoresAlumno[0],
          tutoresExistentesArray2:this.tutoresAlumno[1],
          tutores: this.formBuilder.array([
    
          ])
    


      })


      },



      error:err=>{ Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo m??s tarde',
          showConfirmButton: false,
          timer: 2000
        })}
    })
  }

  
      modificarTutorAlumno(){


    

        if(this.tutoresExistentes>=0){

          let body;
          if(this.tutoresExistentes==2){

          
          body=[

            {
              "id":this.formularioAlumno.value.tutoresExistentesArray1
            },
            {
              "id":this.formularioAlumno.value.tutoresExistentesArray2
            }
  
          ]  


            }else if(this.tutoresExistentes==1){
             body=[

              {
                "id":this.formularioAlumno.value.tutoresExistentesArray1
              }
    
            ]  
          }else{

            body=[{}]
          }
         
          
          this.tutoresService.actualizarTutoresAlumno(this.alumno.id, body).subscribe({

            next: resp=>{
              
            },
            error: err =>{



              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Ups... Algo va mal',
                text: 'Intentalo m??s tarde',
                showConfirmButton: false,
                timer: 2000
              })
            }
          })



        }
      }



      quitarTutor(){

      
        
        
        if(this.tutoresExistentesTotales>0 && this.tutoresExistentes>0 ){
          
          this.tutoresExistentes--;
          this.tutoresExistentesTotales--;
        

      

        }
        

        

      }

}