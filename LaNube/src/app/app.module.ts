import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { LoginModule } from './login/login.module';
import { PanelAdminModule } from './panel-admin/panel-admin.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AsistenciaModule,
    RouterModule,
    LoginModule,
    PanelAdminModule,
    BrowserAnimationsModule
   ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
