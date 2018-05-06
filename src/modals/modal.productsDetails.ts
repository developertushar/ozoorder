import { FirebaseServiceProvider } from './../providers/firebase-service/firebase-service';
import { ServicesPage } from './../pages/services/services';
import { OrderDetailsProvider } from './../providers/order-details/order-details';
import { Component , OnInit } from '@angular/core';
import {App, NavController, Platform, NavParams, ToastController, LoadingController,ViewController, AlertController, Toast } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';



//services


@Component({
  selector: 'page-productDetailsModel',
  templateUrl: 'modal.productDetails.html'
})


export class ProductDetails  implements OnInit {

  orderId :any;
  email :any;
  userDetails = [];
  authority :string;
  orderEmail: string
  totalAmount: number = 0;
  getProductDetails = [];


  products = [] ;
  newAddress :string;
  code;

  customername :any;
  customermobile :any;

  noProducts :string;


  items;

  alluserDetails = [];

  constructor(
    public navParams :NavParams,
    public viewCtrl :ViewController,
    public navCtrl: NavController,
    public orderDetailService: OrderDetailsProvider,
    public firebaseDb: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    public loader: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appCtrl: App,
    public localStorage: Storage,


  ) {

      this.noProducts = 'false';
      this.getProductDetails.push(this.navParams.get('Products'));
      console.log(this.getProductDetails);









    }


  ngOnInit()
  {

  }




  closeModal(item,products)
  {
    for(var i=0;i<products.length;i++)
    {
      products.splice(i,1);
    }

    console.log(products);
    // console.log(typeof(products));
    // products.clear();

    this.localStorage.remove('savedProducts');
    this.navCtrl.pop();


  }

  placeOrder(item,products)
  {
   // firebase database of orderDetail
console.log(item);
  try{
    const orderId = Math.floor(Math.random() * 899999 + 100000);
    const result = this.orderDetailService.SaveOrder(item.headquator,item.transportMedia,item.transportMediaName,item.customername,item.customermobile,item.deliveryAddress,products,orderId,item.authority,item.userEmail);
    console.log(result);
    if(result)
    {
      const load  = this.loader.create({
        content: 'Saving and generating order id please wait..',
        spinner:'dot',
        duration: 3000
      })

      load.present();

      setTimeout(() => {

        load.dismiss();
        return false;
          },2000)

      setTimeout(()=>{
        const alert = this.alertCtrl.create({
          message: 'You generated order id:'+  orderId + 'you can go to Past orders to send request for approval ',
          buttons: [
            {
              text: 'OK',
              handler: ()=>{
                this.viewCtrl.dismiss();
                this.appCtrl.getRootNav().setRoot(TabsPage,{email: this.email,authority: this.authority,orderEmail: this.orderEmail});

              }

            }
          ]
        })

        alert.present();

      },2000)

    }


  }
  catch(e)
  {

    const toast = this.toastCtrl.create({
      message: e,
      position:'bottom',
      duration: 1000
    })
    toast.present();
  }


  }

  delItem(productItem){


    // this.products.splice(productItem,1);
    for(var i=0;i<this.products.length;i++)
    {
      if(this.products[i] === productItem)
      {
        this.products.splice(i,1);
      }
    }
  }




}
