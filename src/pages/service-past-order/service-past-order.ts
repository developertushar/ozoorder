import { ServicesPage } from './../services/services';
import { ServiceApprovalCheckPage } from './../service-approval-check/service-approval-check';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController} from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { OrderDetailsProvider } from '../../providers/order-details/order-details';
import {AngularFireDatabase} from 'angularfire2/database';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ObjectToUniqueKey } from '@firebase/database/dist/esm/src/core/util/util';
import { AnimationService, AnimationBuilder } from 'css-animator';





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
  // @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;



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

    //getting the pending orders
    getpendingOrders = [];

    sendToken :boolean;



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
     public animationService: AnimationService,
    ) {


      // this.animator = animationService.builder();

        this.email = this.navParams.get('emailId');
        this.authority = this.navParams.get('authority');
        this.leaderToSend  = window.localStorage.getItem('selectApprovalAuthorityLeader');
        if(this.authority == 'salesofficer')
        {
          this.showAuthority = true;
        }
        else
        {
          this.showAuthority = false;
        }

        const getpendingOrders = this.firebaseDb.list('/pendingOrder/').valueChanges();
        getpendingOrders.subscribe((order)=>{

          this.getpendingOrders = order;



        })
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



        if(this.alluserDetails.length == 0 )
        {
          this.setNoRecord = true;
        }

     })

     setTimeout(() => {
      loader.dismiss();

    },2000)
  }




    swipeEvent(e,productData) {
      this.sendToken = false;

      e.preventDefault();


    const emailId = this.navParams.get('orderEmail');

    // getting the orders from the Pending order


    for(var i=0; i < this.getpendingOrders.length ; i++)
    {
        // console.log(this.getpendingOrders[i]);
        if(this.getpendingOrders[i].Orderid == productData.Orderid )
        {

          // console.log(this.getpendingOrders[i].Orderid);
          let toast = this.toastCtrl.create({
            message: 'Already sent check pending ordes tab',
            duration: 1500,
            position: 'top'
          });

          toast.present();

          this.sendToken = true;



        }

    }

    if(this.sendToken === false)
    {

      if(this.leaderToSend !== null && this.leaderToSend !== '' && this.leaderToSend !== undefined)
      {


          const toast1 = this.toastCtrl.create({
            message: 'wait sending...',
            position: 'bottom',
            duration: 1500
          })
          toast1.present();

          var date = new Date();
           const modifiedDate = date.toUTCString();


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
           orderKey:'',
           sendApprovalDate: '',
           approveDate: '',
           totalAmount: productData.totalamount
         }).then((item)=>{

          this.firebaseDb.list('/pendingOrder/').update(item.key,{
            orderKey: item.key,
            sendApprovalDate: modifiedDate
          })
          // this.orderService.storeKeysOfPendingOrders(this.email,productData.Orderid,item.key);

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








    //create a new database of pending order and when the authority accepts it then it will go to the other database
    //




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
