import { AulaInterface } from "./aula.interface";

export interface  AlumnoInterface{
    nombre:          string;
    apellidos:       string;
    id:              number;
    dni:             string;
    direccion:       string;
    fechaNacimiento: Date;
    horaEntrada:     string;
    horaSalida:      string;
    comida:          string;
    comeEnCentro:    boolean;
    observaciones:   string;
    aula:           AulaInterface;
}
