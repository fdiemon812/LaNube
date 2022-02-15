import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { HomeComponent } from './home/home.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';

const routes: Routes = [
  {
    // path: '',
    // component: HomeComponent,
    // children: [
    //   { path: 'alumno', component: AlumnoComponent },
    //   { path: 'registro', component: RegistroAlumnoComponent },
    //   { path: 'profesor', component: ProfesorComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
