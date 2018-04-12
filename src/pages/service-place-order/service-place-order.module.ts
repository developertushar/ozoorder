import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePlaceOrderPage } from './service-place-order';

@NgModule({
  declarations: [
    ServicePlaceOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicePlaceOrderPage),
  ],
})
export class ServicePlaceOrderPageModule {}
