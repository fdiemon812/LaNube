import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorAlumnoService implements AsyncValidator {
  

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public nombrePattern: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]+$";
  public dniPattern:  string ="^[0-9]{8}[A-Z]$";

  constructor(private http:HttpClient) { }

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

  validate( control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    
    const url = `${ environment.urlApi }/usuario?email=${ email}`;
    const headers = new HttpHeaders() .set('Authorization',
     `Bearer ${localStorage.getItem('token')}` );
            

    return this.http.get<any>(url, {headers})
                .pipe(
                  //Timpo de respuesta en comprobar el resultado
                   delay(600),
                  map( resp => {

                    console.log(resp)
                    if(resp == false ){
                                control.get("email")?.setErrors({ emailTomado: true });
                          return { emailTomado: true }
                              }
                              else{
                      
                               control.get("email")?.setErrors(null);


                         return null;
                              }
                  })
                );

  }
    
}
 


