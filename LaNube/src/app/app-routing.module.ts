import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './panel-admin/home/home.component';
import { ValidarLogin } from './guards/validar-login.guard';


const routes: Routes = [

  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate:[ValidarLogin]}
  // {path: '**',redirectTo:'login'}



];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
