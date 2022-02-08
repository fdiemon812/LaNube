import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ]  ]
  });
  
  
  constructor(private router:Router,  private formBuilder:FormBuilder, private validatorService: ValidatorService) { }

  ngOnInit(): void {
  }


  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'El valor ingresado no tiene formato de correo';
    } 

    return '';
  }

  get passwordErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'La contraseña es obligatoria';
    } else if ( errors['minLength'] ) {
      return 'Deben ser más de 6 dígitos';
    } 

    return '';
  }


  submitFormulario() {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();

  }


  login(){
     this.router.navigateByUrl('home')

  }



  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

}
