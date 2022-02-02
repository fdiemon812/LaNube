import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';



@NgModule({
  declarations: [
    HomeComponent,
    AlumnoComponent,
    ProfesorComponent
  ],
  imports: [
    CommonModule,AppRoutingModule,
    RouterModule
    
  ],exports:[]
})
export class PanelAdminModule { }
