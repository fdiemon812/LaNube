import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradaComponent } from './entrada/entrada.component';
import { FormsModule } from '@angular/forms';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { SharedModule } from '../shared/shared.module';
import { FullCalendarModule } from 'primeng/fullcalendar'




@NgModule({
  declarations: [
    EntradaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PanelAdminModule,
    SharedModule,
    FullCalendarModule

  ],
  exports:[EntradaComponent]
})
export class AsistenciaModule { }
