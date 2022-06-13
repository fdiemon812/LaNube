import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMensajesComponent } from './panel-mensajes/panel-mensajes.component';
import { MensajesRoutingModule } from './mensajes-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {OrderListModule} from 'primeng/orderlist';
import { DialogModule } from "primeng/dialog";
import {ButtonModule} from 'primeng/button';
import { CustomDatePipe } from '../services/custom.datepipe';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import {EditorModule} from 'primeng/editor';


@NgModule({
  declarations: [
    PanelMensajesComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MensajesRoutingModule,
    TabViewModule,
    OrderListModule,
    DialogModule,
    ButtonModule,
    AutoCompleteModule,
    EditorModule
    ]
})
export class MensajeriaModule { }
