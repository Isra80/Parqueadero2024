import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  txt_usuario: string = "";
  txt_clave: string = "";
  constructor(
    private acceso: AccesoService,
    private navCtrl: NavController,
  ) {}

  loggin() {
    let datos = {
      accion: "loggin",
      usuario: this.txt_usuario,
      clave: this.txt_clave
    };

    this.acceso.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        // Manejar la respuesta exitosa
        this.acceso.createSession('ID_usuario', res.usuario[0].codigo);
        this.acceso.createSession('usuario', res.usuario[0].nombre+" "+res.usuario[0].apellido);
        this.navCtrl.navigateRoot('/parqueadero');
      } else {
        // Manejar la respuesta de error
        this.acceso.showToast(res.mensaje);
      }
    });
    
  }


}
