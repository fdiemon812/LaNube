import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulasComponent } from './aulas/aulas.component';
import { AulaRoutingModule } from './aula-routing.module';



@NgModule({
  declarations: [
    AulasComponent
  ],
  imports: [
    CommonModule,
    AulaRoutingModule
  ]
})
export class AulaModule { }
