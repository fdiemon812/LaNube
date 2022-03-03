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




@NgModule({
  declarations: [
    HomeComponent,
    AlumnoComponent,
    ProfesorComponent,
    RegistroAlumnoComponent,
    VistaAlumnoComponent,
    FiltroAlumnoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTablesModule
    
  ],exports:[]
})
export class PanelAdminModule { }
