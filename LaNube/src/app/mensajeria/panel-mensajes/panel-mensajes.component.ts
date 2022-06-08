import { Component, OnInit } from '@angular/core';
import { MensajeInterface } from 'src/app/interfaces/mensaje.interface';
import Swal from 'sweetalert2';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-panel-mensajes',
  templateUrl: './panel-mensajes.component.html',
  styleUrls: ['./panel-mensajes.component.css']
})
export class PanelMensajesComponent implements OnInit {

  mensajes!:MensajeInterface[];

  constructor(private mensajeService:MensajeService) { }

  ngOnInit(): void {
    this.getMensajesRecibidos();
  }


  getMensajesRecibidos(){

    this.mensajeService.listarMensajesRecibidos().subscribe({

      next: resp=>{
        this.mensajes=resp;


      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }
    })
  }


}
