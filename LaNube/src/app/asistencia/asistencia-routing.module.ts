import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './entrada/entrada.component';
import { CalendarComponent } from './calendar/calendar.component';
import { isAdmin } from '../guards/isAdmin.guard';
import { ValidarLogin } from '../guards/validar-login.guard';


const routes: Routes = [
  {
    path:'',
    component:EntradaComponent,
    children:[

      {
        path:'calendar',
        component:CalendarComponent

      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
