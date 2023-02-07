import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditTransferPageRoutingModule } from './add-edit-transfer-routing.module';

import { AddEditTransferPage } from './add-edit-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditTransferPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddEditTransferPage]
})
export class AddEditTransferPageModule { }
