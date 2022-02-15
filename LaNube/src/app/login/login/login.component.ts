import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isCorrectPass:boolean=false;

  miFormulario: FormGroup = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ] ],
    password: ['', [ Validators.required ]  ]
  });
  
  
  constructor(private router:Router, private loginService:LoginService, private formBuilder:FormBuilder, private validatorService: ValidatorService) { }

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
    } 

    return '';
  }


  submitFormulario() {


    this.miFormulario.markAllAsTouched();


    if(this.miFormulario.valid){
      this.login();
      
    }

  }


  login(){

    let email = this.miFormulario.value.email;
    let password= this.miFormulario.value.password;
    
    
    this.loginService.login(email, password).subscribe({

        next: resp => { 
          localStorage.setItem("token", resp.jwt_token)
          this.router.navigateByUrl('home');

        },
        error: error =>{
          this.isCorrectPass=true;
        }
    })
  }



  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

}
