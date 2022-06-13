import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlumnoService } from '../../panel-admin/services/alumno.service';
import { AlumnoInterface } from '../../panel-admin/interfaces/alumno.interface';
import { AsistenciaService } from '../../panel-admin/services/asistencia.service';
import { EstadoAlumnoInterface } from '../../panel-admin/interfaces/asistencia.interface';
import { UtilesService } from '../../services/utiles.service';


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  public events: any[] = [];
  public options: any;
  allLoad!:boolean;
  cantidadAlumnos=0;
  cantidadEstados=0
  cantidadAlumnosCargados=0
  cantidadEstadosCargados=0


  idAulaInput:number=0;
  fecha:Date=new Date();
  alumnos!:AlumnoInterface[];
  rol!:string;

  constructor(private alumnoService:AlumnoService,
    private utilesService:UtilesService,
    private estadoAlumno: AsistenciaService) { }

  ngOnInit(): void {
  this.rol=this.utilesService.getRol()
  this.ngOnChanges();
  }


  ngOnChanges(){

    if(this.rol=='ADMINISTRADOR' || this.rol=='PROFESOR'){

      if( this.idAulaInput!=0){

        this.listarAlumnosAula();

      } else{

        this.listarAlumnos();
      }

    }else if (this.rol=='TUTOR'){


      this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: new Date(),
        locale: esLocale,
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: false
      };
      this.allLoad=true;


      this.listarAlumnosTutor();





  }




}
  listarAlumnosTutor() {

  let email = this.utilesService.getUserEmail();
  this.alumnoService.listarAlumnosTutor(email).subscribe({

    next:resp =>{

      this.cantidadAlumnos=resp.length;
      this.alumnos=resp;

      resp.forEach(alumno => {

        this.sacarAsistenciaAlumno(alumno.id, alumno.nombre);


      });

    },
    error: error =>{

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ups... Algo va mal',
        text: 'Intentalo más tarde',
        showConfirmButton: false,
        timer: 2000
      })
    }

  })

  }





  procesaAula(idAula:any){

    this.idAulaInput=idAula;
    this.ngOnChanges();
  }

  procesaFecha(fecha:any){



    let year =fecha.substring(0,4)
    let mes = fecha.substring(5,7)
    let dia = fecha.substring(8,10)




    this.fecha=new Date(year+"/"+mes+"/"+dia);


    this.ngOnChanges();

  }

  sacarAsistenciaAlumno(id: number, nombre:string) {

    this.alumnoService.listarAsistenciaAlumno(id).subscribe({

      next:resp =>{
        this.cantidadEstados=resp.length
        let i=1;
        resp.forEach(estado => {

          const newEvent ={

            title: nombre +" " +estado.horaEntrada+"-"+estado.horaSalida,
            start: estado.fecha,
            end:  estado.fecha ,
            description:nombre,
            backgroundColor: "#02a600",
            borderColor: '#02a600'


          }

         this.events.push(newEvent)
         i++;


         if(i==this.cantidadEstados){
          this.cantidadAlumnosCargados++;

         }


        });





      },
      error: error =>{

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }

    })


  }

  listarAlumnosAula():any{


    return this.alumnoService.listarAlumnosAula(this.idAulaInput).subscribe({

      next:resp =>{

        this.alumnos=resp;
        this.introducirDatosAlumno();

      },
      error: error =>{

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }

    })
  }



  listarAlumnos():any{
    return this.alumnoService.listarAlumnos().subscribe({

      next:resp =>{

        this.alumnos=resp;

        this.introducirDatosAlumno();


      },
      error: error =>{


        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })

      }

    })
  }



  cambiarAsistencia(alumno:AlumnoInterface){}


  introducirDatosAlumno(){
    this.alumnos.forEach(alumno => {


      let mes:number =  this.fecha.getMonth()+1;


      this.getEstadoAlumno(this.fecha.getDate(), mes, this.fecha.getFullYear(), alumno.id)



    });
  }

  getEstadoAlumno(dia:number, mes:number, year:number, idAlumno:number){


    this.estadoAlumno.listarAsistenciaAlumno(dia, mes, year, idAlumno).subscribe({


      next:estado =>{



       let idAlumno = estado.idAlumno;
       let asistencia = estado.asistencia;


       if(asistencia){

        //  document.getElementById(idAlumno+"asistencia")?.setAttribute("checked", "true");
        document.getElementById(idAlumno+"asistencia")!.innerHTML='<i class="bi bi-check2-circle"  style="color: green;"></i>'


       }else{
        // document.getElementById(idAlumno+"asistencia")?.removeAttribute("checked");
        document.getElementById(idAlumno+"asistencia")!.innerHTML='<i class="bi bi-x-lg"  style="color: red;"></i>'

       }

        document.getElementById(idAlumno+"entrada")?.setAttribute("value", estado.horaEntrada)
        document.getElementById(idAlumno+"salida")?.setAttribute("value", estado.horaSalida)





      },
      error: error =>{

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ups... Algo va mal',
          text: 'Intentalo más tarde',
          showConfirmButton: false,
          timer: 2000
        })
      }

    })





  }


  submit(){



    let pos=0;
    let alumnosConMaxHoras=0;

    while(document.getElementsByName("fila").length>pos){


    // document.getElementsByName("fila").forEach(estado => {

     let horaEntrada = document.getElementsByName("fila")[pos].getElementsByTagName("input")[0].value
     let horaSalida = document.getElementsByName("fila")[pos].getElementsByTagName("input")[1].value
    //  let asistencia = document.getElementsByName("fila")[pos].getElementsByTagName("input")[2].checked
     let idAlumno = parseInt(document.getElementsByClassName("nombre")[pos].id)
     let nombreAlumno=  document.getElementsByClassName("nombre")[pos].innerHTML
     let mes:number =  this.fecha.getMonth()+1;




      const estado2:EstadoAlumnoInterface ={
        id: 0,
        idAlumno: idAlumno,
        bath1: '',
        bath2: '',
        bath3: '',
        eat1: '',
        eat2: '',
        eat3: '',
        horaEntrada: horaEntrada,
        horaSalida: horaSalida,
        asistencia: true,
        fecha: this.fecha
      }
      this.estadoAlumno.updateAsistenciaAlumnos(estado2, this.fecha.getDate(), mes, this.fecha.getFullYear()).subscribe({


        next:resp =>{




          if(alumnosConMaxHoras==0 && (pos)==document.getElementsByName("fila").length){
            this.introducirDatosAlumno();

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡GUARDADO!',
              showConfirmButton: false,
              timer: 2000

            })

          }


      },
      error: error =>{

        alumnosConMaxHoras=1;

        if((pos)==document.getElementsByName("fila").length){
          this.introducirDatosAlumno();}

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡NO SE HA GUARDADO TODO!',
          text: `${nombreAlumno} - ${error.error.mensaje}`,
          showConfirmButton: true,
        })
      }

    })


      pos++;




    };





  }










  comprobarAsistencia(){



    let pos=0;
    let alumnosSinSalida: string[]=[];


      document.getElementsByName("fila").forEach(estado => {

      let horaEntrada = document.getElementsByName("fila")[pos].getElementsByTagName("input")[0].value
      let horaSalida = document.getElementsByName("fila")[pos].getElementsByTagName("input")[1].value
      // let asistencia = document.getElementsByName("fila")[pos].getElementsByTagName("input")[2].checked
      let idAlumno = parseInt(document.getElementsByClassName("nombre")[pos].id)
      let nombreAlumno=  document.getElementsByClassName("nombre")[pos].innerHTML
      let mes:number =  this.fecha.getMonth()+1;

      if(horaEntrada.length==5 && horaSalida.length!=5){



        alumnosSinSalida.push(nombreAlumno);

      }
      pos++;

  })


   if(alumnosSinSalida.length!=0){


        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡Hay alumnos sin salida!',
          text: this.getAlumnosSinSalida(alumnosSinSalida),
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Guardar',
          confirmButtonColor: '#476eff',
        }).then((result) => {
          if (result.isConfirmed) {
           this.submit()
          } else if (result.isDenied) {
            Swal.fire('No se han guardado los cambios', '', 'info')
          }
        })

      }else{
        this.submit()
      }



}


  getAlumnosSinSalida(alumnos:string[]){

    let texto='  - -   ';
    alumnos.forEach(alumno => {

      texto=texto+alumno+'  - -   '


    });


    return texto;

  }





}
