import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMensajesComponent } from './panel-mensajes/panel-mensajes.component';
import { MensajesRoutingModule } from './mensajes-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {OrderListModule} from 'primeng/orderlist';



@NgModule({
  declarations: [
    PanelMensajesComponent
  ],
  imports: [
    CommonModule,
    MensajesRoutingModule,
    TabViewModule,
    OrderListModule  ]
})
export class MensajeriaModule { }
