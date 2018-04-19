import { ServiceApprovalCheckPage } from './../service-approval-check/service-approval-check';
import { ServicesPage } from './../services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  userAuthority: string;
  orderEmail: string;

  tab1Root = ServicesPage;
  tab2Root = ServiceApprovalCheckPage;
  tab3Root = SettingsPage


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
