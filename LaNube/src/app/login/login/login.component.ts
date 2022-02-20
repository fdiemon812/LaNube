import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isCorrectPass:boolean=false;
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  @ViewChild('miFormulario') miFormulario!: NgForm;
  
  initForm = {
    email: "",
    password: ""
  }
  
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }


  emailValido(): boolean {
    return  this.miFormulario?.controls['email']?.touched && this.miFormulario?.controls['email']?.invalid;
  }

  passValido():boolean {
    return this.miFormulario?.controls['password']?.touched && this.miFormulario?.controls['password']?.invalid
  }


  submitFormulario() {
    

   


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

  camposVacios(){

    if(this.miFormulario.value.email=="" && this.miFormulario.value.password==""){

      this.isCorrectPass=true;
    }
  }

  

}
