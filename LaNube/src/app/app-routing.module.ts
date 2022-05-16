import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './panel-admin/home/home.component';
import { ValidarLogin } from './guards/validar-login.guard';
import { ProfesorComponent } from './panel-admin/profesor/profesor.component';
import { AlumnoComponent } from './panel-admin/alumno/alumno.component';
import { RegistroAlumnoComponent } from './panel-admin/registro-alumno/registro-alumno.component';
import { isAdmin } from './guards/isAdmin.guard';
import { VistaAlumnoComponent } from './panel-admin/vista-alumno/vista-alumno.component';
import { EditarAlumnoComponent } from './panel-admin/editar-alumno/editar-alumno.component';
import { EntradaComponent } from './asistencia/entrada/entrada.component';
import { EstadoAlumnoComponent } from './panel-admin/estado-alumno/estado-alumno.component';


const routes: Routes = [

  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate:[ValidarLogin], children:[

    {path: 'profesor',canActivate:[ValidarLogin], component:ProfesorComponent},
    {path: 'alumno',canActivate:[ValidarLogin],component:VistaAlumnoComponent},
    {path: 'registro', canActivate:[ValidarLogin, isAdmin], component: RegistroAlumnoComponent },
    {path: 'editar/:id', canActivate:[ValidarLogin, isAdmin], component: EditarAlumnoComponent },
    {path: 'alumno/:id', canActivate:[ValidarLogin], component: EstadoAlumnoComponent },
    {path: 'asistencia', canActivate:[ValidarLogin, isAdmin], component: EntradaComponent }
  


  ]}
  ,{
    path: '**',redirectTo:'login'
  }



];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
