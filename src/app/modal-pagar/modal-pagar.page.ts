import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-modal-pagar',
  templateUrl: './modal-pagar.page.html',
  styleUrls: ['./modal-pagar.page.scss'],
})
export class ModalPagarPage implements OnInit {
  estacionamiento: any;
  codEstacionamiento: string = "";
  txt_placa: string = "";
  txt_modelo: string = "";
  txt_FechaIngreso: string = "";
  txt_HoraIngreso: string = "";
  txt_fechaSalida: string = "";
  txt_horaSalida: string = "";

  tarifa: number = 0; 
  costoTotal: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private acceso: AccesoService
  ) {
    this.acceso.getSession('cod_estacionamiento').then((res: any) => {
      this.codEstacionamiento = res;
      console.log('Valor de codEstacionamiento:', this.codEstacionamiento);
      this.consultar(this.codEstacionamiento);
    });

    this.obtenerTarifa();
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
        this.estacionamiento = res.estacionamiento[0];
        this.txt_placa = res.estacionamiento[0].placa;
        this.txt_modelo = res.estacionamiento[0].modelo;
        this.txt_FechaIngreso = res.estacionamiento[0].fechaIngreso;
        this.txt_HoraIngreso = res.estacionamiento[0].horaIngreso;
      } else {
        this.acceso.showToast(res.mensaje);
      }
    });
  }

  guardadoFinal() {

    let datos = {
      accion: 'N_estacionamiento',
      cod_Est: this.codEstacionamiento,
      placa: this.txt_placa,
      modelo: this.txt_modelo,
      fechaIngreso: this.txt_FechaIngreso,
      horaIngreso: this.txt_HoraIngreso,
      fechaSalida: this.txt_fechaSalida,
      horaSalida: this.txt_horaSalida,

    };
  
    this.acceso.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.acceso.showToast(res.mensaje);

      } else {
        this.acceso.showToast(res.mensaje);
      }
    });
  }

  obtenerTarifa() {
    this.acceso.obtenerTarifa().then((tarifa: number) => {

      sessionStorage.setItem('tarifa', tarifa.toString());
      this.tarifa = tarifa;
    }).catch(error => {
      console.error('Error al obtener la tarifa:', error);
    });
  }

  calcularTarifa() {
    const fechaIngreso = new Date(`${this.txt_FechaIngreso}T${this.txt_HoraIngreso}`);
    const fechaSalida = new Date(`${this.txt_fechaSalida}T${this.txt_horaSalida}`);

    // Calcula la diferencia en milisegundos entre la fecha y hora de salida y la de ingreso
    const diferenciaMs = fechaSalida.getTime() - fechaIngreso.getTime();

    // Convierte la diferencia de milisegundos a horas, minutos y segundos
    const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

    // Obtiene la tarifa almacenada en sessionStorage
    const tarifa = parseFloat(sessionStorage.getItem('tarifa') || '0');

    // Calcula el costo total incluyendo fracciones de hora, minutos y segundos
    let costoTotal = (tarifa * horas) + ((tarifa / 60) * minutos) + ((tarifa / 3600) * segundos);

    // Redondea el costo total a dos decimales
    costoTotal = parseFloat(costoTotal.toFixed(2));

    // Muestra el costo total al usuario
    this.costoTotal = costoTotal;
}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
