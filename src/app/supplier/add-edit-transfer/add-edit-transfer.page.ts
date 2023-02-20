import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from 'src/app/models/item.model';


@Component({
  selector: 'app-add-edit-transfer',
  templateUrl: './add-edit-transfer.page.html',
  styleUrls: ['./add-edit-transfer.page.scss'],
})
export class AddEditTransferPage implements OnInit {
  transferForm: FormGroup;
  itemsErrorMessage: string = '';
  isSaving: boolean = false;
  showBarcode: boolean = false;
  barcode: string = '';
  title: string = '';
  action: string = '';
  transfer: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private transferService: TransferService,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let initialTransferData = this.router.getCurrentNavigation().extras.state['data'];
        this.action = initialTransferData.action;
        this.transfer = initialTransferData.transfer
        this.title = this.action === 'add' ? 'Add Transfer' : `Edit GT-${this.transfer.gt}`
      }
    })
  }

  ngOnInit() {
    if (this.transfer.gt) {
      this.setTransferForm();
      this.showBarcode = true;
      this.barcode = this.transfer.gt;
      this.getTransfer(this.transfer.id);
    } else {
      this.setTransferForm();
    }
  };

  setTransferForm() {
    let transfer = this.transfer;
    this.transferForm = this.formBuilder.group({
      gt: [
        transfer.gt ? transfer.gt : '', [Validators.required, Validators.pattern('^[0-9]{6,}$')]],
    })
    this.addItem();
  };

  get items(): FormArray {
    return this.transferForm.get('items') as FormArray;
  };

  async getTransfer(id: number) {
    this.items.removeAt(0);
    this.transferService.getTransfer(id).subscribe(
      async (response) => {
        console.log(response);
        if (response) {
          let items = response.items;
          items.forEach(item => {
            this.addItem(item)
          })
        } else {
          this.alertResult('Error', 500, `Error loading data for this transfer.`);
        }
      },
      async (error: HttpErrorResponse) => {
        console.log('Error', error);
        this.alertResult('Error', error.status, error.statusText);
      }
    )
  }

  addItem(item?: Item) {
    this.itemsErrorMessage = '';
    if (!this.transferForm.contains('items')) {
      this.transferForm.addControl('items',
        this.formBuilder.array([
          this.insertNewItemForm(),
        ])
      );
    } else {
      this.items.push(this.insertNewItemForm(item));
    }
  }

  removeItem(index: number) {
    if (this.items.length <= 1) {
      this.itemsErrorMessage = 'Please provide at least one item';
      return;
    }
    this.items.removeAt(index);
  }



  async onCancel() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to cancel?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.reset();
            this.goBack();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => { }
        }

      ]
    });

    await alert.present();

  }


  async onSubmit() {

    this.isSaving = true;
    const loading = await this.loadingController.create({
      message: this.action === 'add' ? 'Adding Transfer' : `Editing GT-${this.transfer.gt}`,
      spinner: 'circles',
    })

    loading.present();

    let data = {
      brand: this.transfer.brand,
      supplier_id: this.transfer.supplier_id,
      ...this.transferForm.value
    }

    if (this.action === 'add') {

      this.transferService.addTransfer(data).subscribe(
        async (response: Transfer) => {
          loading.dismiss();
          console.log(response)
          if (!response) {
            this.alertResult('Error', 400, 'Error saving transfer');
            return;
          }
          this.alertResult('Success', 200, 'You have successfully added a transfer. Add new one?');
        },
        async (error: HttpErrorResponse) => {
          loading.dismiss();
          this.alertResult('Error', error.status, error.statusText);
        }
      )
    } else {
      this.transferService.updateTransfer(this.transfer.id, data).subscribe(
        async (response: Transfer) => {
          loading.dismiss();
          console.log('Updated transfer', response);
          if (!response) {
            this.alertResult('Error', 400, 'Error saving transfer');
            return;
          }
          this.router.navigate([`/supplier/${response.supplier_id}`])
          this.presentToast(response.gt);
        },
        async (error: HttpErrorResponse) => {
          loading.dismiss();
          this.alertResult('Error', error.status, `${error.statusText}. Try again?`);
        }
      )
    }

  }

  reset() {
    this.transferForm.reset();
    this.items.clear();
    this.addItem();
    this.itemsErrorMessage = '';
    this.isSaving = false;
    this.showBarcode = false;
    this.barcode = ''
  }

  async alertResult(result: string, status: number, resultMessage: string) {
    const alert = await this.alertController.create({
      header: result,
      subHeader: status.toString(),
      message: resultMessage,
      buttons: [
        {
          text: 'No',
          role: 'confirm',
          handler: () => {
            this.reset();
            this.goBack();
          }
        },
        {
          text: 'Yes',
          role: 'cancel',
          handler: () => {
            this.reset();
          }
        }
      ]
    });

    await alert.present();
  }

  showBarcodePreview(value) {
    if (value === '') {
      return;
    } else {

      let barcode = value.toString();
      if (barcode.length >= 6) {
        this.showBarcode = true;
        this.barcode = barcode;
      } else {
        this.showBarcode = false;
      }
    }
  }

  goBack(): void {
    this.router.navigate([`/supplier/${this.transfer.supplier_id}`]);
  }

  insertNewItemForm(item?: Item): FormGroup {

    return new FormGroup({
      lot: new FormControl(item ? item.lot : '', [Validators.required, Validators.minLength(4)]),
      qty: new FormControl(item ? item.qty : '', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  async presentToast(gt: number) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully updated.`,
      duration: 1000,
      position: 'middle'
    });
    await toast.present();
  }

}
