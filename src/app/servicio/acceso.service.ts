import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  server: string = "http://localhost/WsParqueaderoIONIC/ws_parqueadero.php";

  constructor(

    public http: HttpClient,
    public toastCtrl: ToastController
  ) { }

  postData(body: any) {
    let head = new HttpHeaders({ 'Content-Type': 'application/json, charset: utf-8' });
    let options = {
      headers: head
    }
    return this.http.post(this.server, JSON.stringify(body), options);
  }

  async createSession(id: string, value: string) {
    await Storage.set({
      key: id,
      value: value  
    });
  }

  async closeSession() {
    await Storage.clear();
  }

  async getSession(id: string) {
    const item = await Storage.get({
      key: id,
    });
    return item.value;
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top'
    });

    toast.present();
  }

  obtenerTarifa(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const body = { accion: 'obtener_tarifa' };
      this.postData(body).subscribe((response: any) => {
        if (response.estado === true) {
          resolve(response.tarifa);
        } else {
          reject('No se pudo obtener la tarifa');
        }
      }, error => {
        reject(error);
      });
    });
  }
  
}
