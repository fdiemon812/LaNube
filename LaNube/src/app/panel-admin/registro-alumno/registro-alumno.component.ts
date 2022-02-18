import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {


  // tutoresExistentes:any[]=[{nombre:"JuanaPaca"},{nombre:"2"},{nombre:"JuanaPaca3"},{nombre:"Arbol"},]

  // tutoresExistentesLength:any[]=[1]


  // tutores:any[]=[];

    formularioAlumno: FormGroup = this.formBuilder.group({
      nombre: [ , [ Validators.required, Validators.maxLength(100), Validators.pattern(this.validatorAlumService.nombrePattern)]   ],
      apellidos: [ , [ Validators.required, Validators.maxLength(100),Validators.pattern(this.validatorAlumService.nombrePattern)] ],
      dni: [ , [ Validators.pattern(this.validatorAlumService.dniPattern)] ],
      nacimiento: [ , [ Validators.required,this.validatorAlumService.fechaValida]  ],
      
      
      tutores: this.formBuilder.array([])



      // horario: [ '', [ Validators.required, Validators.minLength(3) ] ],
      // favoritos: this.formBuilder.array([], Validators.required )
    })

  constructor(private formBuilder:FormBuilder,  private validatorAlumService: ValidatorAlumnoService) { }

  ngOnInit(): void {
    this.formularioAlumno.reset({})
  }

  // nuevoTutor: FormControl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)] );

  get tutoresArr() {
    return this.formularioAlumno.get('tutores') as FormArray;
  }

  agregarTutor() {
    const tutor = this.formBuilder.group({
      nombreTutor: new FormControl('', Validators.required),
      apellidoTutor: new FormControl('',Validators.required),
      dniTutor: new FormControl('',Validators.required)
      
    });
  
    this.tutoresArr.push(tutor);
  

  }



  campoNoValido( campo: string ) {


    return this.formularioAlumno.get(campo)?.invalid
            && this.formularioAlumno.get(campo)?.touched;
  }


  // addTutor(){

  //   const tutor = {
  //     id: this.tutores.length+1,
  //     nombre:"",
  //     apellidos:"",
  //     dni:'',
  //     tlf:'',
  //     email:'',
  //     password:''
  //   }

  //   this.tutores.push(tutor);
  // }

  // addTutorExistente(){

    

  //   this.tutoresExistentesLength.push(1);
  // }


  get nombreErrorMsg(): string {
    
    const errors = this.formularioAlumno.get('nombre')?.errors!;
    if ( errors['required'] ) {
      return 'Nombre es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'Solo puede contener letras';
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


  
  submitForm(){
    console.log("hola")
    console.log(this.formularioAlumno.valid)
    console.log(this.formularioAlumno.value)
    this.findInvalidControlsRecursive(this.formularioAlumno)
    if(this.formularioAlumno.valid){

      console.log("enviando!!!")
    }
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
    console.log(invalidControls)
    console.log(this.formularioAlumno.valid + "gfgdfgdgdfgfdgfdgdfg")
    return invalidControls;
  }


}


