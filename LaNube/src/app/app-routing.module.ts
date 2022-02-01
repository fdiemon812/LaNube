import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './panel-admin/home/home.component';

const routes: Routes = [

  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent},
  {path: '**',redirectTo:'login'}



];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
