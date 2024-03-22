import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'parqueadero',
    loadChildren: () => import('./parqueadero/parqueadero.module').then( m => m.ParqueaderoPageModule)
  },
  {
    path: 'estacionamiento',
    loadChildren: () => import('./estacionamiento/estacionamiento.module').then( m => m.EstacionamientoPageModule)
  },
  {
    path: 'form-estacionamiento',
    loadChildren: () => import('./form-estacionamiento/form-estacionamiento.module').then( m => m.FormEstacionamientoPageModule)
  },
  {
    path: 'modal-pagar',
    loadChildren: () => import('./modal-pagar/modal-pagar.module').then( m => m.ModalPagarPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
