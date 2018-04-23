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
  approve :any;
  approval :string = 'notApproved';
  aproveOrders = [];
  currentKey :any;

  key :any;


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public firebaseDb: AngularFireDatabase,
     public dataService: DataServiceProvider,
     public toastCtrl: ToastController,
     public loader: LoadingController

  ) {

    this.userAuthority = window.localStorage.getItem('authority');
    const email = window.localStorage.getItem('email');
    this.orderEmail = window.localStorage.getItem('orderEmail');

    console.log(email + 'getting email');

    //retrieve data

    this.getPendingOrders(email);

    this.getOrdersForTeamLeader(email);
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

          // console.log(this.pending[i].isApproved);
          this.pendingOrders.push(this.pending[i]);
        }
      }

    })


    // console.log(this.pendingOrders);

  }

  getOrdersForTeamLeader(email)
  {


    const getPendingOrder = this.firebaseDb.list('/pendingOrder/').valueChanges();
    getPendingOrder.subscribe((data)=>{

      console.log(Object.keys(data));

      this.approve= data;

      for(var i=0;i < this.approve.length ; i++)
      {
        // console.log();

        if(this.approve[i].sendTo == email)
        {
          this.aproveOrders.push(this.approve[i]);
        }
      }
    })
  }


  approveOrder(approval){

    const loader = this.loader.create({
      content: 'Approving order'

    })

    const date = new Date();

    loader.present();
    this.firebaseDb.list('/pendingOrder/').update(approval.orderKey,{
      ApprovedBy: approval.sendTo,
      ApprovedAuthority: approval.authority,
      isApproved: 'true',
      ApprovalDate: date

    }).then(()=>{

      loader.dismiss();
      this.navCtrl.setRoot(ServicesPage);

      const toast = this.toastCtrl.create({
        message: 'Successfully Approved',
        duration: 1500,
        position: 'top'
      })
      toast.present();




    }).catch((error)=>{

      const toast = this.toastCtrl.create({
        message: 'Successfully Approved',
        duration: 1500,
        position: 'bottom'
      })
      toast.present();


    })




  }


  discardOrder(){

    console.log('discard');

  }


  cardClickCheckDetailEvent(data){

    // console.log('hey');
    this.dataService.cardClickDetails(data);
  }
}
