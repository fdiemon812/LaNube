import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorAlumnoService {
  

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public nombrePattern: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]+$";
  public dniPattern:  string ="^[0-9]{8}[A-Z]$";

  constructor() { }

  fechaValida(){
    console.log("validando")

    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      console.log("return")
      const fechaNacimiento = new Date(formGroup.get("nacimiento")?.value);
      const fechaSistema =new Date();

      if ( fechaSistema<fechaNacimiento ) {
        formGroup.get("nacimiento")?.setErrors({ fechaMayor: true });
        return { fechaMayor: true }
      } 



      formGroup.get("nacimiento")?.setErrors(null);

      return null
    }


  }
 

}
