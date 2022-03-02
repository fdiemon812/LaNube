import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { LoginModule } from './login/login.module';
import { PanelAdminModule } from './panel-admin/panel-admin.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    LoginModule,
    PanelAdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
