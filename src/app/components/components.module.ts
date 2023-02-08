import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadBarcodeComponent } from './upload-barcode/upload-barcode.component';



@NgModule({
  declarations: [UploadBarcodeComponent],
  imports: [
    CommonModule
  ],
  exports: [UploadBarcodeComponent]
})
export class ComponentsModule { }
