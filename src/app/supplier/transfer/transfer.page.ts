import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  transfer: Transfer;
  id: number;
  gt: number;
  isloading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!this.router.getCurrentNavigation().extras.state) {
        this.isloading = true;
        this.AlertError(404, 'No transfer found.');
        return;
      }
      let stateData = this.router.getCurrentNavigation().extras.state['transfer'];
      this.id = stateData['id'];
      this.gt = stateData['gt'];
      this.getTransfer(this.id);
    });
  }

  async getTransfer(id: number) {
    this.isloading = true;
    const loading = await this.loadingController.create({
      message: `Loading transfer..`,
      spinner: 'circles'
    });

    loading.present();
    this.transferService.getTransfer(id).subscribe(
      async (response) => {
        console.log('Response Transfer', response)
        this.isloading = false;
        await loading.dismiss();
        if (!response) {
          this.isloading = true
          this.AlertError(400, 'Bad request');
        }
        this.transfer = response;

      },
      async (error: HttpErrorResponse) => {
        console.log('Error', error);
        this.isloading = true;
        await loading.dismiss();
        this.AlertError(error.status, error.statusText);
      }
    )
  }

  async AlertError(status: number, message: string) {
    const alert = await this.alertController.create({
      'header': 'Error',
      'subHeader': `status:  ${status}`,
      'message': message,
      'buttons': [
        {
          text: 'Try Again',
          role: 'confirm',
          handler: () => {
            this.getTransfer(this.id)
          }
        },
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            this.returnHomePage()
          }
        }
      ]
    });

    alert.present();
  }

  returnHomePage() {
    this.router.navigate(['/home']);
    return;
  }

  onEdit() {
    console.log('Edit transfer', this.transfer);
  }

  async onDelete(transferToDelete: Transfer) {
    console.log('Delete', transferToDelete);

    const loading = await this.loadingController.create({
      message: `Deleting GT-${transferToDelete.gt} ...`,
      spinner: 'circles',
    })
    loading.present();

    this.transferService.deleteTransfer(transferToDelete.id).subscribe(
      async (response: Transfer) => {
        loading.dismiss();

        if (!response) {
          this.AlertError(400, 'Delete Transfer failed');
          return;
        }
        this.router.navigate([`/supplier/${transferToDelete.supplier_id}`])
        this.presentToast(transferToDelete.gt);
        // setTimeout(() => {
        // }, 1500)
      },
      async (error: HttpErrorResponse) => {
        loading.dismiss();
        this.AlertError(error.status, error.statusText);
      }
    )
  }

  async presentToast(gt: number) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully deleted.`,
      duration: 1000,
      position: 'middle'
    });
    await toast.present();
  }



}
