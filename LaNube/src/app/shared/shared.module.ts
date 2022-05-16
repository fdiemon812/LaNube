import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FechaComponent } from './fecha/fecha.component';



@NgModule({
  declarations: [
    FechaComponent
    
  ],
  imports: [
    CommonModule,
   
    FormsModule
  ],
  exports:[FechaComponent]
})
export class SharedModule { }
