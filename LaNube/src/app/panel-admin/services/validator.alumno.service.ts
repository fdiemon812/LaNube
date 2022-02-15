import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorAlumnoService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public nombrePattern: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]+$";
  public dniPattern:  string ="^[0-9]{8}[A-Z]$";

  constructor() { }


 

}
