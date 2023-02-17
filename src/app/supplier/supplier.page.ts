import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Response } from '../models/response.model';
import { Supplier } from '../models/supplier.model';
import { Transfer } from '../models/transfer.model';
import { SuppliersService } from '../services/suppliers.service';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

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
    private alertController: AlertController

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
        if (response) {
          this.isloading = false;
          console.log('Transfers', response);
          this.supplier = response.data;
          this.transfers = response.data.transfers;
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error', error);
        this.AlertError(error.status, error.statusText);
      }
    )
  }


  onEdit() {
    console.log('Edit');
  }


  onDelete() {
    console.log('Delete');
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
    console.log('Add item');
    let initialTransferData = {
      brand: this.supplier.code,
      supplier_id: this.id,
      action: 'Add',
    };
    let navigationExtras: NavigationExtras = {
      state: {
        initialTransferData: initialTransferData
      }
    }
    this.router.navigate([`supplier/${this.id}/add-edit-transfer`], navigationExtras)
  }

}
