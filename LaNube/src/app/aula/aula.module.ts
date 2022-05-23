import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulasComponent } from './aulas/aulas.component';
import { AulaRoutingModule } from './aula-routing.module';
import {TableModule} from 'primeng/table';
import { DialogModule } from "primeng/dialog";
import { PickListModule } from 'primeng/picklist';







@NgModule({
  declarations: [
    AulasComponent
  ],
  imports: [
    CommonModule,
    AulaRoutingModule,
    TableModule,
    DialogModule,
    PickListModule


    

    
  ], exports:[
    AulasComponent
  ]
})
export class AulaModule { }
