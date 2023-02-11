import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalFile } from 'src/app/models/local-file.model';
import { Transfer } from 'src/app/models/transfer.model';
import { BarcodeService } from 'src/app/services/barcode.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  transfer: Transfer;
  id: number;
  sourceImage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private barcodeService: BarcodeService
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (this.router.getCurrentNavigation().extras.state) {
        this.transfer = this.router.getCurrentNavigation().extras.state['transfer'];
        console.log('details from supplier:', this.transfer);
      }
    })
    this.sourceImage = await this.barcodeService.loadImageBase64Data(this.transfer.barcode);
  }



  async getImageFromLocalFile() {

  }

}
