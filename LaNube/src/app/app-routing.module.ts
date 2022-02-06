import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './panel-admin/home/home.component';
import { ValidarLogin } from './guards/validar-login.guard';
import { ProfesorComponent } from './panel-admin/profesor/profesor.component';
import { AlumnoComponent } from './panel-admin/alumno/alumno.component';


const routes: Routes = [

  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate:[ValidarLogin], children:[

    {path: 'profesor',component:ProfesorComponent},
    {path: 'alumno',component:AlumnoComponent}


  ]},{path: '**',redirectTo:'login'}



];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
