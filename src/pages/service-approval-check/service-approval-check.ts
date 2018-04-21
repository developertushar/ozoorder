import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';

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
  pendingOrders = [];
  pending :any;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public firebaseDb: AngularFireDatabase,
  ) {

    this.userAuthority = window.localStorage.getItem('authority');
    const email = window.localStorage.getItem('email');
    this.orderEmail = window.localStorage.getItem('orderEmail');

    console.log(email + 'getting email');

    //retrieve data

    this.getPendingOrders(email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceApprovalCheckPage');


     if(this.userAuthority == 'fieldofficer')
     {
       this.showAuthority = 'true';
     }

  }


  getPendingOrders(email){

    const getPendingOrder = this.firebaseDb.list('/pendingOrder/').valueChanges();
    getPendingOrder.subscribe((data)=>{

      this.pending = data;

      for(var i=0;i < this.pending.length ; i++)
      {
        // console.log();
        if(this.pending[i].sendBy == email)
        {
          this.pendingOrders.push(this.pending[i]);
        }
      }


    })

    console.log(this.pendingOrders);
  }

}
