import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualGeneratorPage } from './manual-generator.page';

const routes: Routes = [
  {
    path: '',
    component: ManualGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualGeneratorPageRoutingModule {}
