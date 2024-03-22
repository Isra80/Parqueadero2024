import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEstacionamientoPageRoutingModule } from './form-estacionamiento-routing.module';

import { FormEstacionamientoPage } from './form-estacionamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormEstacionamientoPageRoutingModule
  ],
  declarations: [FormEstacionamientoPage]
})
export class FormEstacionamientoPageModule {}
