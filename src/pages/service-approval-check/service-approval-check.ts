import { SeeProductDetailsPage } from './../see-product-details/see-product-details';
import { ServicePlaceOrderPage } from './../service-place-order/service-place-order';
import { ServicesPage } from './../services/services';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, IonicApp } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { ModifiedProductsPage } from '../modified-products/modified-products';
import { ProductDetails } from './../../modals/modal.productsDetails';


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

  modifiedData :any;
  //aprove orders
  approve :string;
  approval :string = 'notApproved';
  aproveOrders = [];
  currentKey :any;

  key :any;
  nav :any;
  setMessage :string;
  setNoRecord :boolean;
  emailId :string;

  modifyToken: string;

  isSalesOfficer :string;

  constructor(
    private navCtrl: NavController,
     public navParams: NavParams,
     public firebaseDb: AngularFireDatabase,
     public dataService: DataServiceProvider,
     public toastCtrl: ToastController,
     public loader: LoadingController,
     public app: IonicApp

  ) {

    this.nav = navCtrl;

    this.showAuthority = 'false'
    this.userAuthority = window.localStorage.getItem('authority');
    const email = window.localStorage.getItem('email');
    this.emailId = email;
    console.log(this.emailId);
    this.orderEmail = window.localStorage.getItem('orderEmail');

    console.log(email + 'getting email');
    const load = this.loader.create({
      content: 'Loading Orders..',
      spinner: 'dot'
    })

    load.present().then(()=>{

      this.firebaseDb.list('/pendingOrder/',ref => ref.orderByChild('sendBy').equalTo(email)).valueChanges().subscribe((data)=>{
        this.pendingOrders = data;
        load.dismiss();
     })

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

    console.log(approval);

    const loader = this.loader.create({
      content: 'Approving order'

    })

    var date = new Date();
    const modifiedDate = date.toUTCString();

    loader.present();
    this.firebaseDb.list('/pendingOrder/').update(approval.OrderKey,{

      ApprovedBy: [this.emailId],
      approvalAuthority: this.userAuthority,
      isApproved: 'true',
      approveTime: modifiedDate

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

  cardClickCheckProductDetails(data)
  {
    this.modifyToken = 'false';
    this.firebaseDb.list('/modifiedProduct/').valueChanges().subscribe((getData)=>{
      this.modifiedData = getData;

      if(this.modifiedData.length === 0 || this.modifiedData === undefined  )
      {
        this.firebaseDb.list('/modifiedProduct/').push({
          orderId: data.Orderid,
          transportmedia: '',
          transportname: '',
          isModifiedBy: '',
          customermobile: '',
          customername: '',
          deliveryaddress: '',
          OrderKey: '',
          Headquator: '',
          modifiedProducts: ''
        }).then((item)=>{

           this.key = item.key;
          //  console.log(this.key);
           this.firebaseDb.list('/modifiedProduct/').update(item.key,{
            OrderKey: item.key
           })

        })

      }

      if(this.modifiedData.length > 0)
      {

        for(var i=0;i< this.modifiedData.length;i++)
        {
          if(this.modifiedData[i].orderId === data.Orderid)
          {
              this.key = this.modifiedData[i].OrderKey;
              this.modifyToken = 'true';

          }
        }
        if(this.modifyToken !== 'true')
        {
          this.firebaseDb.list('/modifiedProduct/').push({
            orderId: data.Orderid,
            transportmedia: '',
            transportname: '',
            isModifiedBy: '',
            customermobile: '',
            customername: '',
            deliveryaddress: '',
            OrderKey: '',
            Headquator: '',
            modifiedProducts: ''
            }).then((item)=>{

             this.key = item.key;
             this.firebaseDb.list('/modifiedProduct/').update(item.key,{
               OrderKey: item.key
             })
          })
        }
      }






  })


  this.navCtrl.push(SeeProductDetailsPage,{Products: data,orderId: data.Orderid});



   }

  cardClickModifyDetails()
  {


    this.navCtrl.push(ModifiedProductsPage);

  }


  checkModifiedProductDetails(orderId)
  {
    this.navCtrl.push(ModifiedProductsPage, {orderId: orderId});
  }

}
