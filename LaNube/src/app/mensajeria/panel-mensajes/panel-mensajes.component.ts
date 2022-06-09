import { Component, OnInit } from '@angular/core';
import { MensajeInterface } from 'src/app/interfaces/mensaje.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MensajeService } from '../../services/mensaje.service';
import { ProfesorInterface } from '../../interfaces/profesor.interface';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-panel-mensajes',
  templateUrl: './panel-mensajes.component.html',
  styleUrls: ['./panel-mensajes.component.css']
})
export class PanelMensajesComponent implements OnInit {

  mensajes!:MensajeInterface[];
  dialogCorreo!:boolean
  profesores!:ProfesorInterface[];
  dialogCrear!:boolean
  mensajeSelected!: MensajeInterface;
  recibidos:boolean=true;

  text: any="";
  textEditor: string="";
  textAsunto: string="";


  results!: ProfesorInterface[];

  rol!:string;




  constructor(private mensajeService:MensajeService, private usuarioService:UsuarioService, private utilService:UtilesService) { }

  ngOnInit(): void {
    this.rol=this.utilService.getRol();
    this.getMensajesRecibidos();
  }

  search(event: any) {
    if(this.rol=='ADMINISTRADOR' || this.rol=='PROFESOR'){
      this.listarUsuariosCentro(event);
    }else if(this.rol=='TUTOR' ){
      this.listarProfesoresCentro(event);
    }


  }

  listarProfesoresCentro(event:any){
    this.usuarioService.listarProfesoresCentro(event.query).subscribe({

      next: resp=>{
        this.profesores = resp;

        this.profesores.forEach(profesor => {
          profesor.nombreApellidos=profesor.nombre+", "+profesor.apellidos
        });
        this.results =this.profesores;


      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }
    })
  }

  listarUsuariosCentro(event:any){
    this.usuarioService.listarUsuariosCentro(event.query).subscribe({

      next: resp=>{
        this.profesores = resp;

        this.profesores.forEach(profesor => {
          profesor.nombreApellidos=profesor.nombre+", "+profesor.apellidos
        });
        this.results =this.profesores;


      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }
    })
  }


  getMensajesRecibidos(){

    this.mensajeService.listarMensajesRecibidos().subscribe({

      next: resp=>{

        this.mensajes=resp;
        this.recibidos=true;

      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }
    })
  }

  getMensajesEnviados(){

    this.mensajeService.listarMensajesEnviados().subscribe({

      next: resp=>{

        this.mensajes=resp;
        this.recibidos=false;



      },
      error: err=>{

        Swal.fire(
          '¡Error!', err.error.mensaje, 'error'
          );
      }
    })
  }


    /**
   * Formatea los objetivos para controlar el tamaño de las cadenas que se muestran
   * @param objetives
   * @returns
   */
     formatTexto(texto:string){

      texto=texto.replace( /(<br>)/ig, ' ')
      texto=texto.replace( /(<([^>]+)>)/ig, '')






      let result:string='';
      let cont:number=0;
      if(texto.length<=60){
        result=texto;
      }else{
        while(result.length<60){
          result+=texto[cont];
          cont++;
        }
        result+= " ...";
      }
      return result;
    }

    abrirCorreo(mensaje:MensajeInterface){
      this.mensajeSelected=mensaje;
      this.dialogCorreo=true;

    }


    handleChange(e:  any) {
      var index = e.index;
      if(index==0){
        this.getMensajesRecibidos();
      }else{
        this.getMensajesEnviados();
      }

    }

    crearCorreo(){
      this.text="";
      this.dialogCrear=true;

    }

    enviarCorreo(){

      if(this.text==""){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¿A quién se lo mando?',
          text: 'Escoge destinatario',
          showConfirmButton: false,
          timer:2500
        })

      }else{



      this.dialogCrear=false;
      let user=this.text

      const body={
        "asunto":this.textAsunto,
        "texto":this.textEditor
      }

      this.mensajeService.enviarMensaje(user.id, body).subscribe({

        next: resp=>{

          this.textAsunto=""
          this.textEditor=""
          this.text=""



        },
        error: err=>{

          Swal.fire(
            '¡Error!', err.error.mensaje, 'error'
            );
        }
      })




    }
   }

}
