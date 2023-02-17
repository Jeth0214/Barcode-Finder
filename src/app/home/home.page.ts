import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '../models/supplier.model';
import { SuppliersService } from '../services/suppliers.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  suppliers: Supplier[] = [];

  constructor(
    private router: Router,
    private suppliersService: SuppliersService
  ) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe(
      response => {
        console.log(response);
        this.suppliers = response;
      }
    )
  }

  goToSupplier(supplier: string) {
    console.log(supplier);
    this.router.navigate(['supplier/', { name: supplier }]);
  }

}
