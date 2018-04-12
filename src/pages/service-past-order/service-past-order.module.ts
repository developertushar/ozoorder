import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePastOrderPage } from './service-past-order';

@NgModule({
  declarations: [
    ServicePastOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicePastOrderPage),
  ],
})
export class ServicePastOrderPageModule {}
