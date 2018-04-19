import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServiceApprovalCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-approval-check',
  templateUrl: 'service-approval-check.html',
})
export class ServiceApprovalCheckPage {

  userAuthority :string;
  email :string;
  authority: string;
  showAuthority: string;
  orderEmail :string;
  orderType :string = 'approved';
  orderType2 :string = 'approve';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.userAuthority = window.localStorage.getItem('authority');
    const email = window.localStorage.getItem('email');
    this.orderEmail = window.localStorage.getItem('orderEmail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceApprovalCheckPage');


     if(this.userAuthority == 'fieldofficer')
     {
       this.showAuthority = 'true';
     }

  }

}
