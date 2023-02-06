import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierPageRoutingModule } from './supplier-routing.module';

import { SupplierPage } from './supplier.page';
import { ItemDetailsPageModule } from './item-details/item-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierPageRoutingModule,
    ItemDetailsPageModule
  ],
  declarations: [SupplierPage]
})
export class SupplierPageModule { }
