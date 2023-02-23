import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    NgxBarcodeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
