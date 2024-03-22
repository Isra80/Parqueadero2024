import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.page.html',
  styleUrls: ['./parqueadero.page.scss'],
})
export class ParqueaderoPage implements OnInit {
  cod_usuario: string="";
  user:   string="";
  txt_nombre: string = "";
  txt_capacidad: string = "";
  txt_tarifa: string = "";
  guardarExitoso: boolean = false;

  constructor(
    private navCtrl:NavController,
    public acceso:AccesoService
  ) { 

    this.acceso.getSession('usuario').then((res:any)=>{
      this.user=res;
    })

    this.acceso.getSession('ID_usuario').then((res:any)=>{
      this.cod_usuario=res;
    })

  }

  async guardarParqueadero() {
    if (!this.txt_nombre || !this.txt_capacidad || !this.txt_tarifa) {
      this.acceso.showToast("Por favor, complete todos los campos");
      return;
    }

    let datos = {
      accion: "guardar_parqueadero",
      nombre: this.txt_nombre,
      capacidad: parseInt(this.txt_capacidad),
      tarifa: parseFloat(this.txt_tarifa),
      id_usuario: this.cod_usuario 
    };

    try {
      const res: any = await this.acceso.postData(datos).toPromise();
      if (res.estado) {


        this.guardarExitoso = true;
        this.acceso.showToast(res.mensaje);

        ///
        this.acceso.createSession('idParqueadero', res.idParqueadero);
        ///console.log('ID del parqueadero:', res.idParqueadero);
        ///

      } else {
        this.acceso.showToast(res.mensaje);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      await this.acceso.showToast("Error al comunicarse con el servidor");
    }
  }

  irParqueadero(){
    this.navCtrl.navigateRoot(['/estacionamiento', { idParqueadero: this.cod_usuario }]);
  }

  ngOnInit() {
  }

}
