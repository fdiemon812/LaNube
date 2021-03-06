import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import {DataTablesModule} from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VistaAlumnoComponent } from './vista-alumno/vista-alumno.component';
import { FiltroAlumnoComponent } from './filtro-alumno/filtro-alumno.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { EstadoAlumnoComponent } from './estado-alumno/estado-alumno.component';


import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HomeComponent,
    AlumnoComponent,
    ProfesorComponent,
    RegistroAlumnoComponent,
    VistaAlumnoComponent,
    FiltroAlumnoComponent,
    EditarAlumnoComponent,
    EstadoAlumnoComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTablesModule,
    SharedModule
    
  ],exports:[ 


    FiltroAlumnoComponent

  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],})
export class PanelAdminModule { }
