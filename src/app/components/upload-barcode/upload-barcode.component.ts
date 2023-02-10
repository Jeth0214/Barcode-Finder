import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-upload-barcode',
  templateUrl: './upload-barcode.component.html',
  styleUrls: ['./upload-barcode.component.scss'],
})
export class UploadBarcodeComponent implements OnInit {
  @Output() capturedBarcode = new EventEmitter();
  barcodeSource: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  constructor(public domSrv: DomSanitizer) { }

  ngOnInit() { }

  async captureBarcode() {
    const barcode = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.barcodeSource = barcode.webPath;
    this.capturedBarcode.emit(barcode);
  }
}
