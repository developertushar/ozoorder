import { PopoverPage } from './../popover/popover';
//page which need to be pushed to the next page
import { ServicePastOrderPage } from './../service-past-order/service-past-order';
import { ServiceApprovalCheckPage } from './../service-approval-check/service-approval-check';
import { ServiceTrackOrderPage } from './../service-track-order/service-track-order';
import { ServicePlaceOrderPage } from './../service-place-order/service-place-order';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { PopoverController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {




  alluserDetails = [];

  userAuthority :string;
  orderEmail :string;

  username :string;
  email :any;
  authority: string;

  approvalCheck = ServiceApprovalCheckPage;
  pastOrder = ServicePastOrderPage;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService :AuthServiceProvider,
    public menu :MenuController,
    public firebaseAuth: AngularFireAuth,
    public popoverCtrl: PopoverController
  ) {



    const email = this.navParams.get('email');
    this.userAuthority = this.navParams.get('authority');
    this.orderEmail = this.navParams.get('orderEmail');
    console.log(this.orderEmail + 'ORDER EMAIL');
    console.log('in service'+ email);
    console.log('in service'+ this.userAuthority);


    const getData = this.authenService.getUserDetails();
    getData.subscribe((data)=>{

     this.alluserDetails = data;
     for(var index=0;index < this.alluserDetails.length ; index++ )
     {

       if(this.alluserDetails[index].email === email)
       {


        this.username = this.alluserDetails[index].username;
        this.email = this.alluserDetails[index].email;

        this.authority = this.alluserDetails[index].authority;

       }
     }
    })

  }

  ionViewDidLoad() {





  }


  servicesForAll = [
    {serviceName: 'Place Order',page: ServicePlaceOrderPage},
    {serviceName: 'Track Order',page: ServiceTrackOrderPage},

  ]

  servicesForSpecific = [
    {serviceName: 'Approve Order',page: ServicePlaceOrderPage,forSpecific: 'all'},
    {serviceName: 'Past Approved Orders',page: ServiceTrackOrderPage,forSpecific: 'all'},
    {serviceName: 'Check Approval',page: ServicePlaceOrderPage,forSpecific: 'fieldofficer'},
    {serviceName: 'Past Orders',page: ServiceTrackOrderPage,forSpecific: 'fieldofficer'},


  ]


  openPage(page,authority)
  {
    // const emailOfOrders = this.email.slice(0,this.email.indexOf('@')) + 'orders';?
    this.navCtrl.push(page,{emailId: this.email,authority:this.userAuthority,orderEmail: this.orderEmail });
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present();

  }


}
