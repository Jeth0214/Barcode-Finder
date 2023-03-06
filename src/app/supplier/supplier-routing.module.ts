import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

import { SupplierPage } from './supplier.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPage
  },
  {
    path: 'transfer/:id',
    loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-edit-transfer',
    loadChildren: () => import('./add-edit-transfer/add-edit-transfer.module').then(m => m.AddEditTransferPageModule),
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPageRoutingModule { }
