import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceApprovalCheckPage } from './service-approval-check';

@NgModule({
  declarations: [
    ServiceApprovalCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceApprovalCheckPage),
  ],
})
export class ServiceApprovalCheckPageModule {}
