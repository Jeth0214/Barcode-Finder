import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '../models/supplier.model';
import { SuppliersService } from '../services/suppliers.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { first } from 'rxjs';

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
    private alertController: AlertController,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.presentLoading('Loading suppliers..').then(async () => {
      this.loadingController.dismiss();
      this.getSuppliers();
    })

  }

  ionViewWillEnter() {
    this.getSuppliers();
  }


  getSuppliers() {
    this.suppliersService.getAllSuppliers().pipe(first()).subscribe({
      next: async (response: Supplier[]) => {
        this.isLoading = false;
        this.user = this.authService.currentUserValue;
        //this.loadingController.dismiss();
        this.suppliers = response;
        this.hasSuppliers = response.length <= 0;
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
        console.log('logout response', response);
        this.isLoading = false;
        await loading.dismiss();
      }
    });
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
    });
    return loading.present();
  }

}
