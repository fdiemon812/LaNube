
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})
export class UtilesService {




    constructor(private jwt :JwtHelperService ){}



  getRol():string{
    let rol ="";
    if(localStorage.getItem("token")!= null){

    rol= this.jwt.decodeToken(localStorage.getItem("token")!).rol;

    }
    return rol;
  }


  getUserEmail():string{

    let email="";
    if(localStorage.getItem("token")!= null){

      email= this.jwt.decodeToken(localStorage.getItem("token")!).email;

      }
      return email;

  }


}
