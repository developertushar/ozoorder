import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { OrderDetailsProvider } from '../../providers/order-details/order-details';
import {AngularFireDatabase} from 'angularfire2/database';



/**
 * Generated class for the ServicePastOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-past-order',
  templateUrl: 'service-past-order.html',
})
export class ServicePastOrderPage {

  email :string;
  authority: string;
  showAuthority: boolean;
  getAllData = [];
  getData :any;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http: Http,
     public orderService: OrderDetailsProvider,
     public firebaseDb: AngularFireDatabase,
     public loading: LoadingController
    ) {

        this.email = this.navParams.get('emailId');
        this.authority = this.navParams.get('authority');

        if(this.authority == 'fieldofficer')
        {
          this.showAuthority = true;
        }

        // console.log(this.email);

        this.getOrderDetails();


    }

  ionViewDidLoad() {

  }




   getOrderDetails()
  {

    const loader = this.loading.create({
      content: 'Loading Orders..',
      duration: 3000
    })

    loader.present();

    const emailId = this.email.substr(0,this.email.indexOf('@')) + 'orders';
    console.log(emailId);

    this.firebaseDb.list('/Orders/'+ emailId  ).valueChanges().subscribe(
      (data)=> {
        this.getData = data;
        loader.dismiss();
      }
    )



  }

}
