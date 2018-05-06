import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifiedProductsPage } from './modified-products';

@NgModule({
  declarations: [
    ModifiedProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifiedProductsPage),
  ],
})
export class ModifiedProductsPageModule {}
