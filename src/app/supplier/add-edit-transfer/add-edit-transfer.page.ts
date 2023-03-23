import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from 'src/app/models/item.model';
import { Branch } from 'src/app/models/branch.model';
import { BranchesService } from 'src/app/services/branches.service';
import { Location } from "@angular/common";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { first } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';


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
  transfer: Transfer;
  branches: Branch[] = [];
  user: User


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private transferService: TransferService,
    private branchesService: BranchesService,
    private alertService: AlertService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.getTransferData();
    this.getBranches();
    this.setTransferForm();
  };




  getTransferData() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let initialTransferData = this.router.getCurrentNavigation().extras.state['data'];
        this.action = initialTransferData.action;
        this.transfer = initialTransferData.transfer;
        this.title = this.action === 'add' ? 'Add Transfer' : `Edit GT-${this.transfer.gt}`;
      }
    })
  }

  setTransferForm() {
    let transfer = this.transfer;
    this.transferForm = this.formBuilder.group({
      gt: [transfer.gt ? transfer.gt : '', [Validators.required, Validators.pattern('^[0-9]{6,}$')]],
      bt: [transfer.bt ? transfer.bt : '', [Validators.required, Validators.pattern('^[0-9]{6,}$')]],
      branch_id: [transfer.branch_id ? transfer.branch_id : '', Validators.required],
      items: this.formBuilder.array([
        this.insertNewItemForm(),
      ])
    });

    if (this.action == 'edit') {
      this.items.removeAt(0);
      this.showBarcodePreview(transfer.bt, transfer.branch);
      this.addItem(transfer.items);
    }

  };

  get items(): FormArray {
    return this.transferForm.get('items') as FormArray;
  };

  getBranches() {
    this.branchesService.getAllBranches().subscribe(
      (branches: Branch[]) => {
        this.branches = branches;
      },
      (error: HttpErrorResponse) => {
        this.alertService.alertError(error.status, error.statusText);
      }
    );
  }




  addItem(items?: Item[]) {
    this.itemsErrorMessage = '';
    if (!items) {
      this.items.push(this.insertNewItemForm());
    } else {
      items.forEach(item => {
        this.items.push(this.insertNewItemForm(item));
      })
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
    if (this.transferForm.invalid) return;
    this.isSaving = true;
    const loading = await this.loadingController.create({
      message: this.action === 'add' ? 'Adding Transfer' : `Editing GT-${this.transfer.gt}`,
      spinner: 'circles',
    });

    loading.present();

    let data = {
      user_id: this.user.id,
      supplier_id: this.transfer.supplier_id,
      ...this.transferForm.value
    };

    if (this.action === 'add') {
      this.onAddToServer(data, 'add');
    } else {
      this.onEditToServer(data, 'edit');
    }
  }

  onAddToServer(data, action) {
    this.transferService.addTransfer(data).pipe(first()).subscribe({
      next: (response: Transfer) => {
        this.onSuccessSave(response, action)
      },
      error: (error: HttpErrorResponse) => {
        this.onErrorSave(error);
      }
    })
  };

  onEditToServer(data, action) {
    this.transferService.updateTransfer(this.transfer.id, data).pipe(first()).subscribe({
      next: (response: Transfer) => {
        this.onSuccessSave(response, action)
      },
      error: (error: HttpErrorResponse) => {
        this.onErrorSave(error);
      }
    })
  }

  onSuccessSave(response: Transfer, action: string) {
    this.loadingController.dismiss();
    this.isSaving = false;
    this.presentToast(response.gt, action);
    this.reset();
    this.router.navigate([`/supplier/${response.supplier_id}`]);
  };

  onErrorSave(error: HttpErrorResponse) {
    this.loadingController.dismiss();
    this.isSaving = false;
    this.alertService.alertError(error.status, error.statusText);
  }

  reset() {
    this.transferForm.reset();
    this.items.clear();
    this.itemsErrorMessage = '';
    this.isSaving = false;
    this.showBarcode = false;
    this.barcode = ''
  }



  showBarcodePreview(bt: number, branch: Branch) {
    if (this.transferForm.controls['bt'].valid && this.transferForm.controls['branch_id'].valid) {
      this.showBarcode = true;
      this.barcode = `NA${branch.branch_code}-BT-${bt}`;
    }
    else {
      this.showBarcode = false;
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

  async presentToast(gt: number, action: string) {
    const toast = await this.toastController.create({
      message: `GT-${gt} was successfully ${action}ed.`,
      duration: 800,
      position: 'bottom'
    });
    await toast.present();
  }
}
