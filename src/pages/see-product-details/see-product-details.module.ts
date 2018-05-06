import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeProductDetailsPage } from './see-product-details';

@NgModule({
  declarations: [
    SeeProductDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeProductDetailsPage),
  ],
})
export class SeeProductDetailsPageModule {}
