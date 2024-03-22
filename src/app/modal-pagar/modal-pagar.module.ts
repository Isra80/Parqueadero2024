import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPagarPageRoutingModule } from './modal-pagar-routing.module';

import { ModalPagarPage } from './modal-pagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPagarPageRoutingModule
  ],
  declarations: [ModalPagarPage]
})
export class ModalPagarPageModule {}
