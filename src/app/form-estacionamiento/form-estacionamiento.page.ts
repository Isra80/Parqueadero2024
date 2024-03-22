// form-estacionamiento.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

interface Estacionamiento {
  idEst: string;
  estado: string;
  color: string; // Agrega la propiedad 'color' a la interfaz
}

@Component({
  selector: 'app-form-estacionamiento',
  templateUrl: './form-estacionamiento.page.html',
  styleUrls: ['./form-estacionamiento.page.scss'],
})
export class FormEstacionamientoPage implements OnInit {
  cod_Est: string = "";
  txt_placa: string = "";
  txt_modelo: string = "";
  txt_fechaIngreso: string = "";
  txt_horaIngreso: string = "";
  estadoEstacionamiento: number = 0;
  est: Estacionamiento | null = null;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public acceso: AccesoService
  ) {
    this.acceso.getSession('cod_estacionamiento').then((res: any) => {
      this.cod_Est = res;
      console.log('Valor de cod_Est:', this.cod_Est);
      this.consultar(this.cod_Est);
    });
  }

  ngOnInit() {
  }

  consultar(codigo: string) {
    let datos = {
      accion: "Datos_Estacionamiento",
      cod_Est: codigo
    };
    this.acceso.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        // Asigna los datos del estacionamiento al objeto 'est'
        this.est = {
          idEst: res.estacionamiento[0].idEst,
          estado: res.estacionamiento[0].estado,
          color: res.estacionamiento[0].estado === '1' ? 'azul' : 'normal' // Define el color según el estado
        };
        // Asigna los demás datos del estacionamiento a las variables correspondientes
        this.txt_placa = res.estacionamiento[0].placa;
        this.txt_modelo = res.estacionamiento[0].modelo;
        this.txt_fechaIngreso = res.estacionamiento[0].fechaIngreso;
        this.txt_horaIngreso = res.estacionamiento[0].horaIngreso;
      } else {
        this.acceso.showToast(res.mensaje);
      }
    });
  }
  

  guardar() {
    let datos = {
      accion: 'n_estacionamiento',
      cod_Est: this.cod_Est,
      placa: this.txt_placa,
      modelo: this.txt_modelo,
      fechaIngreso: this.txt_fechaIngreso,
      horaIngreso: this.txt_horaIngreso,
    };

    this.acceso.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.acceso.showToast(res.mensaje);
        if (this.est) {
          this.est.estado = '1';
          this.est.color = 'azul'; // Actualiza el color a 'azul' cuando el estado cambia a '1'
          this.actualizarEstadoEstacionamiento(this.cod_Est, 1);
        }
        this.navCtrl.back();
      } else {
        this.acceso.showToast(res.mensaje);
      }
    });
  }

  actualizarEstadoEstacionamiento(cod_Est: string, estado: number) {
    let datos = {
      accion: 'actualizar_estado_estacionamiento',
      cod_Est: cod_Est,
      estado: estado
    };
    this.acceso.postData(datos).subscribe((res: any) => {
      if (!res.estado) {
        this.acceso.showToast(res.mensaje);
      }
    });
  }
}
