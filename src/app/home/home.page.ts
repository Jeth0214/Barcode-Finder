import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '../models/supplier.model';
import { SuppliersService } from '../services/suppliers.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

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

  ngOnInit() {
    this.getSuppliers();
    this.user = this.authService.currentUserValue;
  }

  ionViewWillEnter() {
    this.getSuppliers();
    this.user = this.authService.currentUserValue;
  }

  async getSuppliers() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading suppliers..',
      spinner: 'circles'
    })

    await loading.present();
    this.suppliersService.getAllSuppliers().subscribe(
      async (response: Supplier[]) => {
        await loading.dismiss();
        this.isLoading = false;
        this.suppliers = response;
        this.hasSuppliers = response.length <= 0;
      },
      async (error: HttpErrorResponse) => {
        this.isLoading = false;
        await loading.dismiss();
        this.alertError('Error', error.status, error.statusText);
      }
    )
  }

  goToSupplier(supplier: string) {
    console.log(supplier);
    this.router.navigate(['supplier/', { name: supplier }]);
  }

  async alertError(result: string, status: number, message: string) {
    const alert = await this.alertController.create({
      header: result,
      subHeader: status.toString(),
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.hasSuppliers = true;
          },
        },
      ]
    })

    await alert.present();
  }

  onLogOut() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
