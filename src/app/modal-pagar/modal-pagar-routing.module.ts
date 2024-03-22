import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPagarPage } from './modal-pagar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPagarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPagarPageRoutingModule {}
