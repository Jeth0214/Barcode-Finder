import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditTransferPage } from './add-edit-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditTransferPageRoutingModule {}
