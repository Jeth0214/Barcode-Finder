import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Branch } from 'src/app/models/branch.model';
import { first } from 'rxjs';

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
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      if (!this.router.getCurrentNavigation().extras.state) {
        this.isloading = true;
        this.AlertError(404, 'No transfer found or transfer id mismatch.');
        return;
      }
      this.transfer = this.router.getCurrentNavigation().extras.state['transfer'];
      // console.log(this.transfer);
    });
  }

  async getTransfer(id: number) {
    this.isloading = true;
    const loading = await this.loadingController.create({
      message: `Loading transfer..`,
      spinner: 'circles'
    });

    loading.present();
    this.transferService.getTransfer(id).pipe(first()).subscribe({
      next: async (response) => {
        this.isloading = false;
        await loading.dismiss();
        //console.log(response);
        if (!response) {
          this.isloading = true
          this.AlertError(400, 'Bad request');
        }
        this.transfer = response;
      },
      error: async (error: HttpErrorResponse) => {
        this.isloading = true;
        await loading.dismiss();
        this.AlertError(error.status, error.statusText);
      }
    })

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
            this.location.back();
            this.location.back();
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

  onEdit(transfer: Transfer) {
    let data = {
      action: 'edit',
      transfer: transfer
    }
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
      }
    }
    this.router.navigate([`supplier/${this.id}/add-edit-transfer`], navigationExtras)

  }

  async onDelete(transferToDelete: Transfer) {
    // console.log('Delete', transferToDelete);

    const loading = await this.loadingController.create({
      message: `Deleting GT-${transferToDelete.gt} ...`,
      spinner: 'circles',
    })
    loading.present();

    this.transferService.deleteTransfer(transferToDelete.id)
      .pipe(first())
      .subscribe({
        next: async (response: Transfer) => {
          loading.dismiss();
          if (!response) {
            this.AlertError(400, 'Delete Transfer failed');
            return;
          }
          this.router.navigate([`/supplier/${transferToDelete.supplier_id}`])
          this.presentToast(transferToDelete.gt);
        },
        error: async (error: HttpErrorResponse) => {
          loading.dismiss();
          this.AlertError(error.status, error.statusText);
        }
      })
  }

  async presentToast(gt: number) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully deleted.`,
      duration: 800,
      position: 'middle'
    });
    await toast.present();
  }



}
