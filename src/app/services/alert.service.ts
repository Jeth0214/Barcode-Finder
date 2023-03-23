import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert;

  constructor(private alertController: AlertController) { }

  async alertError(subHeader, message) {
    this.alert = await this.alertController.create({
      header: 'Error',
      subHeader,
      message,
      cssClass: 'errorAlertHeader',
      buttons: ['OK']
    })
    await this.alert.present()
  }
}
