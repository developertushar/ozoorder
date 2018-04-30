import { ServicePlaceOrderPage } from './../service-place-order/service-place-order';
import { ServicesPage } from './../services/services';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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


  areaSalesOfficer  = [];
  userAuthority :string;
  email :string;
  authority: string;
  showAuthority: string;
  orderEmail :string;
  orderType :string = 'approved';
  orderType2 :string = 'approved';
  //pending orders
  pending :any;
  pendingOrders = [];

  //aprove orders
  approve :string;
  approval :string = 'notApproved';
  aproveOrders = [];
  currentKey :any;

  key :any;

  setMessage :string;
  setNoRecord :boolean;

  isSalesOfficer :string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public firebaseDb: AngularFireDatabase,
     public dataService: DataServiceProvider,
     public toastCtrl: ToastController,
     public loader: LoadingController

  ) {

    this.showAuthority = 'false'
    this.userAuthority = window.localStorage.getItem('authority');
    const email = window.localStorage.getItem('email');
    this.orderEmail = window.localStorage.getItem('orderEmail');

    console.log(email + 'getting email');
    this.firebaseDb.list('/pendingOrder/',ref => ref.orderByChild('sendBy').equalTo(email)).valueChanges().subscribe((data)=>{


       this.pendingOrders = data;
    })

   console.log(this.pendingOrders);

   if(this.userAuthority == 'salesofficer')
   {
     this.showAuthority = 'true';
   }


    this.getOrdersForTeamLeader(email);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceApprovalCheckPage');
  }





  // }

  getOrdersForTeamLeader(email)
  {

    this.isSalesOfficer = 'false';
    console.log(email);

    this.firebaseDb.list('userDetails', ref=> ref.orderByChild('authority').equalTo('areasalesmanager'))
    .valueChanges().subscribe((data)=>{

        this.areaSalesOfficer = data;
        for(var i=0;i<this.areaSalesOfficer.length ; i++)
        {
          if(this.areaSalesOfficer[i].email === email)
          {
            this.isSalesOfficer = 'true';
            this.firebaseDb.list('/pendingOrder/').valueChanges().subscribe((data)=>{
                 this.aproveOrders = data;
            })

          }
        }

    })


  }


  approveOrder(approval){

    const loader = this.loader.create({
      content: 'Approving order'

    })

    var date = new Date();
    const modifiedDate = date.toUTCString();

    loader.present();
    this.firebaseDb.list('/pendingOrder/').update(approval.orderKey,{
      ApprovedBy: approval.sendTo,
      ApprovedAuthority: approval.authority,
      isApproved: 'true',
      ApprovalDate: modifiedDate

    }).then(()=>{

      loader.dismiss();
      // this.navCtrl.setRoot(ServicesPage);

      const toast = this.toastCtrl.create({
        message: 'Successfully Approved',
        duration: 1500,
        position: 'top'
      })
      toast.present();




    }).catch((error)=>{

      const toast = this.toastCtrl.create({
        message: error,
        duration: 1500,
        position: 'bottom'
      })
      toast.present();


    })




  }


  discardOrder(approval){

    const loader = this.loader.create({
      content: 'Approving order'

    })

    var date = new Date();
    const modifiedDate = date.toUTCString();

    loader.present();
    this.firebaseDb.list('/pendingOrder/').update(approval.orderKey,{
      ApprovedBy: approval.sendTo,
      ApprovedAuthority: approval.authority,
      isApproved: 'false',
      ApprovalDate: modifiedDate

    }).then(()=>{

      loader.dismiss();
      // this.navCtrl.setRoot(ServicesPage);

      const toast = this.toastCtrl.create({
        message: 'Successfully Rejected',
        duration: 1500,
        position: 'top'
      })
      toast.present();




    }).catch((error)=>{

      const toast = this.toastCtrl.create({
        message: 'Successfully Rejected',
        duration: 1500,
        position: 'bottom'
      })
      toast.present();


    })



  }


  cardClickCheckDetailEvent(data){

    console.log(data);
    // this.navCtrl.push(ServicePlaceOrderPage,{OrderTomodified: data});

  }
}
