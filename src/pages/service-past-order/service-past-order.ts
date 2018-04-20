import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController} from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { OrderDetailsProvider } from '../../providers/order-details/order-details';
import {AngularFireDatabase} from 'angularfire2/database';
import { DataServiceProvider } from '../../providers/data-service/data-service';




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

  //ordersSend
  orderSendForApproval = [];


  //No orders error
  setNoRecord :boolean;


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



        console.log(this.email + 'past order');
        console.log(this.authority + 'autority');


        if(this.authority == 'fieldofficer')
        {
          this.showAuthority = true;
        }
        else
        {
          this.showAuthority = false;
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

        this.fetchOrderDetails();


     })

     console.log(this.getAllData);
     setTimeout(() => {
      loader.dismiss();

    },2000)


  }




    swipeEvent(e,productData) {
      e.preventDefault();
     let toast = this.toastCtrl.create({
      message: 'sent for approval',
      duration: 1500
    });
    toast.present();


    this.dataService.saveApprovalRecords(productData);



     }


     getItems(ev :any){

       ev.preventDefault();
       let val = ev.target.value;



     }


     fetchOrderDetails()
     {

      if(this.alluserDetails.length == 0 )
      {
        this.setNoRecord = true;
      }
      else
      {
        for(var index=0;index < this.alluserDetails.length ; index++ )
        {
          console.log(this.alluserDetails[index]);

          // const authority = this.alluserDetails[index].transportname;
          this.getAllData.push({
            orderid:this.alluserDetails[index].Orderid,
            party:this.alluserDetails[index].partyname,
            placedate:this.alluserDetails[index].placeDate,
            products:this.alluserDetails[index].productnames,
            address:this.alluserDetails[index].deliveryaddress,
            transportMedia:this.alluserDetails[index].transportmedia,
            transportName:this.alluserDetails[index].transportname,
            email:this.alluserDetails[index].useremail,
          })
        }

      }


     }


     cardClickCheckDetailEvent(products,data)
     {

         console.log(data);
        const actionSheet1 = this.actionCtrl.create({
          title: 'Details',
          buttons: [
            {
              text: 'Products',
              handler: ()=>{
                const actionSheet = this.actionCtrl.create();
                for(var i=0;i < products.length ; i++)
                {
                  actionSheet.addButton(products[i]);

                }
                actionSheet.addButton('Cancel');


                actionSheet.present();
              }
            },
            {
              text: 'Transport Media',
              handler: () =>
              {
                const actionSheet = this.actionCtrl.create();
                actionSheet.setTitle(data.transportMedia)
                actionSheet.addButton('Cancel');


                actionSheet.present();


              }
            },
            {
              text: 'Transport Name',
              handler: () =>
              {
                const actionSheet = this.actionCtrl.create();
                actionSheet.setTitle(data.transportName);
                actionSheet.addButton('Cancel');
                actionSheet.present();

              }
            },
            {
              text: 'Address',
              handler: () =>
              {
                const actionSheet = this.actionCtrl.create();
                actionSheet.setTitle(data.address);
                actionSheet.addButton('Cancel');
                actionSheet.present();

              }
            }
          ]
        })

        actionSheet1.present();



     }

}
