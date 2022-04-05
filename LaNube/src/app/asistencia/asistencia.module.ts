import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradaComponent } from './entrada/entrada.component';
import { FormsModule } from '@angular/forms';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { FechaComponent } from './fecha/fecha.component';



@NgModule({
  declarations: [
    EntradaComponent,
    FechaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PanelAdminModule
  ],
  exports:[EntradaComponent]
})
export class AsistenciaModule { }
