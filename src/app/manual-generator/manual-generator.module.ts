import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualGeneratorPageRoutingModule } from './manual-generator-routing.module';

import { ManualGeneratorPage } from './manual-generator.page';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualGeneratorPageRoutingModule,
    NgxBarcodeModule,
    ReactiveFormsModule
  ],
  declarations: [ManualGeneratorPage]
})
export class ManualGeneratorPageModule { }
