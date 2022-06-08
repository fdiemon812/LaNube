import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelMensajesComponent } from './panel-mensajes/panel-mensajes.component';


const routes: Routes = [
  {
    path:'',
    component:PanelMensajesComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensajesRoutingModule { }
