import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadBarcodeComponent } from './upload-barcode/upload-barcode.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [UploadBarcodeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [UploadBarcodeComponent]
})
export class ComponentsModule { }
