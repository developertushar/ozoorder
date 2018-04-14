//page which need to be pushed to the next page
import { ServicePastOrderPage } from './../service-past-order/service-past-order';
import { ServiceApprovalCheckPage } from './../service-approval-check/service-approval-check';
import { ServiceTrackOrderPage } from './../service-track-order/service-track-order';
import { ServicePlaceOrderPage } from './../service-place-order/service-place-order';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  alluserDetails = [];

  username :string;
  email :any;
  authority: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenService :AuthServiceProvider,
    public menu :MenuController,
    public firebaseAuth: AngularFireAuth
  ) {



    // const email = this.navParams.get('email');
    this.firebaseAuth.auth.onAuthStateChanged((user)=>{

      if(user)
      {
        this.email = window.localStorage.getItem('email');
        console.log(this.email);
      }
    })








    const getData = this.authenService.getUserDetails();
    getData.subscribe((data)=>{

     this.alluserDetails = data;
     for(var index=0;index < this.alluserDetails.length ; index++ )
     {

       if(this.alluserDetails[index].email === this.email)
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


  services = [
    {serviceName: 'Place Order',page: ServicePlaceOrderPage},
    {serviceName: 'Track Order',page: ServiceTrackOrderPage},
    {serviceName: 'Approval Check',page: ServiceApprovalCheckPage},
    {serviceName: 'Past Orders',page: ServicePastOrderPage},

  ]


  openPage(page)
  {

   console.log(this.email);
    this.navCtrl.push(page,{emailId: this.email});
  }
}
