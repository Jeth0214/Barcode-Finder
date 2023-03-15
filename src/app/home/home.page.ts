import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '../models/supplier.model';
import { SuppliersService } from '../services/suppliers.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { first } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  suppliers: Supplier[] = [];
  hasSuppliers: boolean = false;
  user: User;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private suppliersService: SuppliersService,
    private loadingController: LoadingController,
    private alertService: AlertService,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.getSuppliers();
  }


  getSuppliers() {
    this.isLoading = true;
    this.user = this.authService.currentUserValue;
    this.suppliersService.getAllSuppliers().pipe(first()).subscribe({
      next: async (response: Supplier[]) => {
        this.isLoading = false;
        this.suppliers = response;
        this.hasSuppliers = response.length <= 0;
      }, error: (error: HttpErrorResponse) => {
        console.log(error.status)
        this.isLoading = false;
        this.alertService.alertError(error.status, 'No Suppliers Found')
      }
    })
  }

  goToSupplier(supplier: string) {
    // console.log(supplier);
    this.router.navigate(['supplier/', { name: supplier }]);
  }



  async onLogOut() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: `logging out ${this.user.name}..`,
      spinner: 'circles'
    });
    await loading.present();
    this.authService.logout().subscribe({
      next: async (response) => {
        this.isLoading = false;
        await loading.dismiss();
      }, error: async (error: HttpErrorResponse) => {
        this.isLoading = false;
        await loading.dismiss();
      }
    });
  }



}
