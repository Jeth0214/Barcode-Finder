import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-edit-transfer',
  templateUrl: './add-edit-transfer.page.html',
  styleUrls: ['./add-edit-transfer.page.scss'],
})
export class AddEditTransferPage implements OnInit {
  initialTransferData: any = {};
  transferForm: FormGroup;
  itemsErrorMessage: string = '';
  isSaving: boolean = false;
  showBarcode: boolean = false;
  barcode: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private transferService: TransferService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.initialTransferData = this.router.getCurrentNavigation().extras.state['initialTransferData'];
        console.log('Initial data to add:', this.initialTransferData);
      }
    })
  }

  ngOnInit() {
    this.transferForm = this.formBuilder.group({
      gt: [
        '', [Validators.required, Validators.pattern('^[0-9]{6,}$')]],
      items: new FormArray([
        new FormGroup({
          lot: new FormControl('', [Validators.required, Validators.minLength(4)]),
          qty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
        })
      ])
    })
  };

  get items(): FormArray {
    return this.transferForm.get('items') as FormArray;
  }

  addItem() {
    this.itemsErrorMessage = '';
    const itemsGroup = new FormGroup({
      lot: new FormControl('', [Validators.required, Validators.minLength(4)]),
      qty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    this.items.push(itemsGroup);
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
            this.router.navigate([`/supplier/${this.initialTransferData.supplier_id}`]);
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
      message: 'Saving...',
      spinner: 'circles',
    })

    loading.present();

    let data = {
      brand: this.initialTransferData.brand,
      supplier_id: this.initialTransferData.supplier_id,
      ...this.transferForm.value
    }
    this.transferService.addTransfer(data).subscribe(
      async (response: Transfer) => {
        loading.dismiss();
        console.log(response)
        if (!response) {
          this.alertSavingResult('Error', 400, 'Error saving transfer');
          return;
        }
        this.alertSavingResult('Success', 200, 'You have successfully added a transfer. Add new one?');
      },
      async (error: HttpErrorResponse) => {
        loading.dismiss();
        this.alertSavingResult('Error', error.status, error.statusText);
      }
    )

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

  async alertSavingResult(result: string, status: number, resultMessage: string) {
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
            this.router.navigate([`/supplier/${this.initialTransferData.supplier_id}`]);
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



}
