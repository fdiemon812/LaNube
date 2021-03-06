import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulasComponent } from './aulas/aulas.component';
import { AulaRoutingModule } from './aula-routing.module';
import {TableModule} from 'primeng/table';
import { DialogModule } from "primeng/dialog";
import { PickListModule } from 'primeng/picklist';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    AulasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AulaRoutingModule,
    TableModule,
    DialogModule,
    PickListModule,
    ConfirmDialogModule





  ], exports:[
    AulasComponent
  ], providers:[ConfirmationService]
})
export class AulaModule { }
