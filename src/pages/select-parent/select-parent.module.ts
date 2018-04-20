import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectParentPage } from './select-parent';

@NgModule({
  declarations: [
    SelectParentPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectParentPage),
  ],
})
export class SelectParentPageModule {}
