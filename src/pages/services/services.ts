//page which need to be pushed to the next page
import { ServicePastOrderPage } from './../service-past-order/service-past-order';
import { ServiceApprovalCheckPage } from './../service-approval-check/service-approval-check';
import { ServiceTrackOrderPage } from './../service-track-order/service-track-order';
import { ServicePlaceOrderPage } from './../service-place-order/service-place-order';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }


  services = [
    {serviceName: 'Place Order',page: ServicePlaceOrderPage},
    {serviceName: 'Track Order',page: ServiceTrackOrderPage},
    {serviceName: 'Approval Check',page: ServiceApprovalCheckPage},
    {serviceName: 'Past Orders',page: ServicePastOrderPage},

  ]


  openPage(page)
  {

    this.navCtrl.push(page);
  }
}
