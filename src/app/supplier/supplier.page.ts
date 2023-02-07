import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Transfer } from '../models/transfer.model';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      let id = +param.get('id');
      if (!id) {
        this.router.navigate(['/home']);
        return;
      }
      this.id = id;
      console.log(this.id);

    })
  }

  onEdit() {
    console.log('Edit');
  }


  onDelete() {
    console.log('Delete');
  }

  goToItemDetails(item: any) {
    let transfer: Transfer = {
      id: this.id,
      number: 456789,
      items: [
        {
          id: 1,
          gt: 12345,
          lot: 'm38s',
          qty: 15000
        },
        {
          id: 2,
          gt: 12345,
          lot: 'KN4S',
          qty: 1000
        },
        {
          id: 3,
          gt: 12345,
          lot: 'HF3F',
          qty: 5000
        }
      ],
      brand: '74',
      barcode: 'soon.jpg',
      date: new Date(),
      supplier_id: 1

    }
    let navigationExtras: NavigationExtras = {
      state: {
        transfer: transfer,
      }
    }
    // console.log('Go to items:', transfer);
    this.router.navigate([`supplier/${this.id}/transfer/${transfer.number}`], navigationExtras)
  }

  onAdd() {
    console.log('Add item');

  }

}
