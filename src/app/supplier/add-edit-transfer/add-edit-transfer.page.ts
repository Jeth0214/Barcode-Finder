import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { Transfer } from 'src/app/models/transfer.model';
import { BarcodeService } from "../../services/barcode.service";

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
  showBarcodeMessage: string = '';
  barcodeImage: Photo = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private barcodeService: BarcodeService,
    private alertController: AlertController,
    private loadingController: LoadingController
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
        '', [Validators.required, Validators.pattern('^[0-9]{5,5}$')]],
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

  barcodeToSave(photo: Photo) {
    this.showBarcodeMessage = '';
    this.barcodeImage = photo;
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
    if (!this.barcodeImage) {
      this.showBarcodeMessage = 'Please capture the barcode image';
      return;
    }
    this.isSaving = true;
    const loading = await this.loadingController.create({
      message: 'Saving...',
      spinner: 'circles',
    })

    loading.present();

    let barcode = await this.barcodeService.saveBarcodeImage(this.barcodeImage);
    let data = {
      barcode: barcode,
      brand: this.initialTransferData.brand,
      supplier_id: this.initialTransferData.supplier_id,
      ...this.transferForm.value
    }

    // TODO: Save the barcode image
    console.log('submit', data);
    //TODO: send data to server 
    setTimeout(async () => {
      this.reset(),
        loading.dismiss();
    }, 2000);
    setTimeout(async () => {
      this.alertSavingResult('Success', 'Would you like to add  new transfer?')
    }, 4000);

  }

  reset() {
    this.transferForm.reset();
    this.items.clear();
    this.addItem();
    this.itemsErrorMessage = '';
    this.showBarcodeMessage = '';
    this.isSaving = false;
  }

  async alertSavingResult(result: string, resultMessage: string) {
    const alert = await this.alertController.create({
      header: 'result',
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
          handler: () => { }
        }
      ]
    });

    await alert.present();
  }



}
