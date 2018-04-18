import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Component , } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController} from 'ionic-angular';
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



  //search buttons
  shouldShowCancel :string;
  myInput :string;
   searchQuery: string = '';

  email :string;
  authority: string;
  showAuthority: boolean;
  getAllData = [];
  getData :any;
  alluserDetails :any;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http: Http,
     public orderService: OrderDetailsProvider,
     public firebaseDb: AngularFireDatabase,
     public loading: LoadingController,
     public toastCtrl: ToastController,
     public firebaseService: FirebaseServiceProvider,
    ) {

        this.email = this.navParams.get('emailId');
        this.authority = this.navParams.get('authority');

        console.log(this.email + 'past order');
        console.log(this.authority + 'autority');

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
      duration: 4000
    })

    loader.present();


    // const emailId = 'tusharorders'

    const emailId = this.navParams.get('orderEmail');
    console.log(emailId);


    const allUser = this.firebaseDb.list('/Orders/'+ emailId).valueChanges();

    allUser.subscribe((data) => {
        this.alluserDetails = data;




        for(var index=0;index < this.alluserDetails.length ; index++ )
        {
          console.log(this.alluserDetails[index]);
          const email = this.alluserDetails[index].Orderid;
          // const authority = this.alluserDetails[index].transportname;
          this.getAllData.push({
            email: email,
          })
        }


     })

     console.log(this.getAllData);
     setTimeout(() => {
      loader.dismiss();

    },2000)


  }




    swipeEvent(e) {
      e.preventDefault();
     let toast = this.toastCtrl.create({
      message: 'sent for approval',
      duration: 3000
    });
    toast.present();

     }


     getItems(ev :any){

       ev.preventDefault();
       let val = ev.target.value;



     }

}
