import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from 'src/app/models/transfer.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  transfer: Transfer;
  id: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (this.router.getCurrentNavigation().extras.state) {
        this.transfer = this.router.getCurrentNavigation().extras.state['transfer'];
        console.log('details from supplier:', this.transfer);
      }
    })
  }

}
