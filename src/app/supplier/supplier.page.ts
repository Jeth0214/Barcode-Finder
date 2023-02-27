import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';;
import { Supplier } from '../models/supplier.model';
import { Transfer } from '../models/transfer.model';
import { SuppliersService } from '../services/suppliers.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  id: number = 1;
  transfers: Transfer[];
  supplier: Supplier;
  isloading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private alertController: AlertController,
    private transferService: TransferService,
    private toastController: ToastController,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      let id = +param.get('id');
      if (!id) {
        this.returnHome();
      }
      this.id = id;
      this.getAllTransfers(id);
    });

  }

  returnHome() {
    this.router.navigate(['/home']);
    return;
  }


  getAllTransfers(id: number) {
    this.isloading = true;
    this.suppliersService.getSupplierTransfers(this.id).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.isloading = false;
          this.supplier = response;
          this.transfers = response.transfers;
        }
      },
      (error: HttpErrorResponse) => {

        this.AlertError(error.status, error.statusText);
      }
    )
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
        this.presentToast(transferToDelete.gt);
        this.transfers = this.transfers.filter(transfer => { return transferToDelete.id != transfer.id });

      },
      async (error: HttpErrorResponse) => {
        loading.dismiss();
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
            this.getAllTransfers(this.id)
          }
        },
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            this.returnHome()
          }
        }
      ]
    });

    alert.present();
  }

  async presentToast(gt: number) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully deleted.`,
      duration: 1500,
      position: 'middle'
    });
    await toast.present();
  }

  goToItemDetails(transfer: Transfer) {

    let navigationExtras: NavigationExtras = {
      state: {
        transfer: transfer,
      }
    }
    // console.log('Go to items:', transfer);
    this.router.navigate([`supplier/${this.id}/transfer/${transfer.id}`], navigationExtras)
  }

  onAdd() {
    let data = {
      transfer: {
        brand: this.supplier.brand,
        supplier_id: this.id,
      },
      action: 'add',
    };
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
      }
    }
    this.router.navigate([`supplier/${this.id}/add-edit-transfer`], navigationExtras)
  }



}
