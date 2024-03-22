import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEstacionamientoPage } from './form-estacionamiento.page';

const routes: Routes = [
  {
    path: '',
    component: FormEstacionamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormEstacionamientoPageRoutingModule {}
