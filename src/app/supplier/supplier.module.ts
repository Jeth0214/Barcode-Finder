import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierPageRoutingModule } from './supplier-routing.module';

import { SupplierPage } from './supplier.page';
import { TransferPageModule } from './transfer/transfer.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierPageRoutingModule,
    TransferPageModule,
    NgxBarcodeModule,
    Ng2SearchPipeModule
  ],
  declarations: [SupplierPage]
})
export class SupplierPageModule { }
