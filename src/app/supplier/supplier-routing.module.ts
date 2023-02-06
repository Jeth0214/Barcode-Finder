import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsPage } from './item-details/item-details.page';

import { SupplierPage } from './supplier.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPage
  },
  {
    path: 'item-details',
    component: ItemDetailsPage,
    loadChildren: () => import('./item-details/item-details.module').then(m => m.ItemDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPageRoutingModule { }
