import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import { DialogModule } from "primeng/dialog";
import { PickListModule } from 'primeng/picklist';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorComponent } from './profesor/profesor.component';
import { ProfesorRoutingModule } from './profesores-routing.module';







@NgModule({
  declarations: [
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ProfesorRoutingModule,
  ReactiveFormsModule,

    TableModule,
    DialogModule,
    PickListModule,
    ConfirmDialogModule





  ], exports:[
    ProfesorComponent
  ], providers:[ConfirmationService]
})
export class ProfesorModule { }
