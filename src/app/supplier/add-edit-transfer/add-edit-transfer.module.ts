import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditTransferPageRoutingModule } from './add-edit-transfer-routing.module';

import { AddEditTransferPage } from './add-edit-transfer.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditTransferPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxBarcodeModule
  ],
  declarations: [AddEditTransferPage]
})
export class AddEditTransferPageModule { }
