import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';;
import { Supplier } from '../models/supplier.model';
import { Transfer } from '../models/transfer.model';
import { SuppliersService } from '../services/suppliers.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { TransferService } from 'src/app/services/transfer.service';
import { first } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  id: number = 1;
  transfers: Transfer[];
  supplier: Supplier;
  isLoading: boolean = false;
  searchTerm: string = '';
  hasTransfer: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private alertService: AlertService,
    private transferService: TransferService,
    private toastController: ToastController,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      let id = +param.get('id');
      if (!id) {
        this.returnHome();
        return;
      }
      this.id = id;
      this.getAllTransfersOfSupplier(id);
    });
  }


  returnHome() {
    this.router.navigate(['/home']);
    return;
  }


  getAllTransfersOfSupplier(id: number) {
    this.isLoading = true;
    this.suppliersService.getSupplierTransfers(id).subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.isLoading = false;
          this.supplier = response.supplier;
          this.transfers = response.transfers;
          this.hasTransfer = response.transfers.length <= 0 ? true : false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.alertService.alertError(error.status, `No transfers from this supplier`)

      }
    })
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

    this.transferService.deleteTransfer(transferToDelete.id)
      .pipe(first())
      .subscribe({
        next: async (response: Transfer) => {
          loading.dismiss();
          this.presentToast(transferToDelete.gt);
          this.transfers = this.transfers.filter(transfer => { return transferToDelete.id != transfer.id });
          if (this.transfers.length <= 0) {
            this.hasTransfer = true;
          }
        },
        error: async (error: HttpErrorResponse) => {
          loading.dismiss();
          this.alertService.alertError(error.status, `Having trouble deleting GT-${transferToDelete.gt}`)
        }
      })
  }


  async presentToast(gt: number) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully deleted.`,
      duration: 800,
      position: 'bottom'
    });
    await toast.present();
  }

  goToItemDetails(transfer: Transfer) {

    let navigationExtras: NavigationExtras = {
      state: {
        transfer: transfer,
      }
    }
    //console.log('Go to items:', transfer);
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
