import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-barcode',
  templateUrl: './upload-barcode.component.html',
  styleUrls: ['./upload-barcode.component.scss'],
})
export class UploadBarcodeComponent implements OnInit {
  @Output() image = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  captureImage() {
    console.log('capturing image');

    this.image.emit('captureImage');

  }

}
