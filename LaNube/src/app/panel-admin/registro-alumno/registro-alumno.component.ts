import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorAlumnoService } from '../services/validator.alumno.service';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {

  tutores:any[]=[{id: 1,
    nombre:"",
    apellidos:"",
    dni:'',
    tlf:'',
    email:'',
    password:''}];

    formularioAlumno: FormGroup = this.formBuilder.group({
      nombre: [ , [ Validators.required, Validators.maxLength(100), Validators.pattern(this.validatorAlumService.nombrePattern)]   ],
      apellidos: [ , [ Validators.required, Validators.maxLength(1),Validators.pattern(this.validatorAlumService.nombrePattern)] ],
      dni: [ , [ Validators.pattern(this.validatorAlumService.dniPattern)] ],
      nacimiento: [ '', [ Validators.required ] ],
      // horario: [ '', [ Validators.required, Validators.minLength(3) ] ],
      // favoritos: this.formBuilder.array([], Validators.required )
    })

  constructor(private formBuilder:FormBuilder, private validatorAlumService: ValidatorAlumnoService) { }

  ngOnInit(): void {
    this.formularioAlumno.reset({})
  }

  


  campoNoValido( campo: string ) {
    return this.formularioAlumno.get(campo)?.invalid
            && this.formularioAlumno.get(campo)?.touched;
  }


  addTutor(){

    const tutor = {
      id: this.tutores.length+1,
      nombre:"",
      apellidos:"",
      dni:'',
      tlf:'',
      email:'',
      password:''
    }

    console.log("addTutor")
    this.tutores.push(tutor);
  }



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

    return '';}


  get fechaErrorMsg(): string {

    const errors = this.formularioAlumno.get('nacimiento')?.errors!;
    if ( errors['required'] ) {
      return 'Fecha obligatoria';
    } else if( errors['fechaValida'] ){
      return 'La fecha debe ser inferior al día de hoy';

    }

    return '';}


   

  
}


