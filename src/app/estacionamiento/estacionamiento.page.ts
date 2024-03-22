import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { ModalPagarPage } from '../modal-pagar/modal-pagar.page';

interface Estacionamiento {
  idEst: string;
  estado: string; // Agregar la propiedad 'estado'
}

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.page.html',
  styleUrls: ['./estacionamiento.page.scss'],
})
export class EstacionamientoPage implements OnInit {
  cod_parqueadero: string = "";
  est: Estacionamiento[] = [];

  constructor(
    private navCtrl: NavController,
    public acceso: AccesoService,
    private modalController: ModalController
  ) {
    this.est = [];
    this.acceso.getSession('idParqueadero').then((res: any) => {
      this.cod_parqueadero = res;
      console.log('Valor de idParqueadero:', this.cod_parqueadero);
      this.lestacionamientos(this.cod_parqueadero);
    });
  }

  ngOnInit() {
  }

  lestacionamientos(cod_parqueadero: string) {
    let datos = {
      accion: "listar_estacionamientos",
      id_parqueadero: this.cod_parqueadero
    };

    this.acceso.postData(datos).subscribe((res: any) => {
      console.log('Datos recibidos del servicio:', res.datos);

      if (res.estado == true) {
        this.est = res.datos.map((estacionamiento: Estacionamiento) => {
          return { ...estacionamiento, color: estacionamiento.estado === '1' ? 'azul' : 'normal' };
        });
      } else {
        this.acceso.showToast(res.mensaje);
      }
    });
  }

  irEstacionamiento(index: number) {
    if (this.est && this.est.length > index) {
      const codigo = this.est[index].idEst;
      this.acceso.createSession("cod_estacionamiento", codigo).then(() => {
        this.navCtrl.navigateRoot(['form-estacionamiento']);
      });
    } else {
      console.error('No se encontró el estacionamiento con el índice especificado.');
    }
  }

  async abrirModalPagar(idEstacionamiento: string) {
    const codigo = await this.acceso.getSession("cod_estacionamiento"); // Obtenemos el valor de cod_estacionamiento
    console.log('Valor de cod_estacionamiento en abrirModalPagar:', codigo); // Comprobante
    const modal = await this.modalController.create({
      component: ModalPagarPage,
      componentProps: {
        idEstacionamiento: idEstacionamiento,
        codEstacionamiento: codigo // Pasamos el valor de cod_estacionamiento al modal
      }
    });
    return await modal.present();
  }

  async limpiarEstacionamiento(idEstacionamiento: string) {
    let datos = {
      accion: 'limpiar_estacionamiento',
      idEstacionamiento: idEstacionamiento
    };

    this.acceso.postData(datos).subscribe((res: any) => {
        if (res.estado) {
            this.acceso.showToast(res.mensaje);
            // Lógica adicional si es necesario
        } else {
            this.acceso.showToast(res.mensaje);
        }
    });
}

}
