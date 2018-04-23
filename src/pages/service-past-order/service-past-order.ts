import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController} from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { OrderDetailsProvider } from '../../providers/order-details/order-details';
import {AngularFireDatabase} from 'angularfire2/database';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ObjectToUniqueKey } from '@firebase/database/dist/esm/src/core/util/util';




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
   leaderToSend :string;
   keys = [];
    email :string;
    authority: string;
    showAuthority: boolean;
    getAllData = [];
    getData :any;
    alluserDetails :any;

    //ordersSend
    orderSendForApproval = [];

    //No orders error
    setNoRecord :boolean;
    dummyData = [];

    //keys selected to send
    keySelected :any;

    // pending items key
    pendingOrdersKeys = [];




  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http: Http,
     public orderService: OrderDetailsProvider,
     public firebaseDb: AngularFireDatabase,
     public loading: LoadingController,
     public toastCtrl: ToastController,
     public firebaseService: FirebaseServiceProvider,
     public actionCtrl: ActionSheetController,
     public dataService: DataServiceProvider,
    ) {

        this.email = this.navParams.get('emailId');
        this.authority = this.navParams.get('authority');
        this.leaderToSend  = window.localStorage.getItem('selectApprovalAuthorityLeader');
        if(this.authority == 'fieldofficer')
        {
          this.showAuthority = true;
        }
        else
        {
          this.showAuthority = false;
        }

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

    const emailId = this.navParams.get('orderEmail');


    const allUser = this.firebaseDb.list('/Orders/'+ emailId).valueChanges();

    allUser.subscribe((data) => {
        this.alluserDetails = data;

        console.log(this.alluserDetails);

        if(this.alluserDetails.length == 0 )
        {
          this.setNoRecord = true;
        }
        // this.fetchOrderDetails();
     })

     setTimeout(() => {
      loader.dismiss();

    },2000)
  }




    swipeEvent(e,productData) {
      e.preventDefault();


    const emailId = this.navParams.get('orderEmail');

    console.log(productData);

    //create a new database of pending order and when the authority accepts it then it will go to the other database
     if(this.leaderToSend !== null && this.leaderToSend !== '' && this.leaderToSend !== undefined)
     {

        const toast1 = this.toastCtrl.create({
          message: 'wait sending...',
          position: 'bottom',
          duration: 1500
        })
        toast1.present();
       this.firebaseDb.list('/pendingOrder/').push({
        Orderid: productData.Orderid,
        deliveryaddress: productData.deliveryaddress,
        customermobile: productData.customermobile,
        customername: productData.customername,
        transportmedia: productData.transportmedia,
        transportname: productData.transportname,
        productnames: productData.productnames,
        placeDate: productData.placeDate,
        partyname: productData.partyname,
         sendTo: this.leaderToSend,
         sendBy: this.email,
         authority: this.authority,
         isApproved: '',
         ApprovedBy: '' ,
         ApprovedAuthority: '',
         orderKey:''
       }).then((item)=>{

        this.firebaseDb.list('/pendingOrder/').update(item.key,{
          orderKey: item.key
        })
        this.orderService.storeKeysOfPendingOrders(this.email,productData.Orderid,item.key);

        toast1.dismiss();
        let toast = this.toastCtrl.create({
          message: 'sent for approval',
          duration: 1500
        });

        toast.present();
       })


     }
     else if(this.leaderToSend === null)
     {

        const toast = this.toastCtrl.create({
          message: 'Please go back and select the Parent Authority First',
          duration: 2000,
          position:'top'
        })

        toast.present();
     }




     }


     getItems(ev :any){
       ev.preventDefault();
       let val = ev.target.value;
     }





     cardClickCheckDetailEvent(data)
     {

      // console.log(data);
        this.dataService.cardClickDetails(data);
     }

}
