import { ServicesPage } from './../pages/services/services';
import { OrderDetailsProvider } from './../providers/order-details/order-details';
import { Component , OnInit } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, LoadingController,ViewController, AlertController, Toast } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { DataEvent } from '@firebase/database/dist/esm/src/core/view/Event';

//services
  OrderDetailsProvider


@Component({
  selector: 'page-productDetailsModel',
  templateUrl: 'modal.productDetails.html'
})


export class ProductDetails  implements OnInit {

  orderId :any;
  email :any;
  userDetails = [];

  getProductDetails :any;


  products = [] ;
  newAddress :string;
  code;


  items;

  alluserDetails = [];

  constructor(
    public navParams :NavParams,
    public viewCtrl :ViewController,
    public navCtrl: NavController,
    public orderDetailService: OrderDetailsProvider,
    public firebaseDb: AngularFireDatabase,
    public loader: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController

  ) {

      this.getProductDetails = this.navParams.get('Products');
      this.email = this.getProductDetails.userEmail;
      this.items = [
        {name: 'Party',value: this.getProductDetails.partyName},
        {name: 'Transport Media',value: this.getProductDetails.transportMedia},
        {name: 'Transport Media',value: this.getProductDetails.transportMedia},
      ]
      const getProducts = this.getProductDetails.productName;
      this.newAddress = this.getProductDetails.deliveryAddress;


      // console.log(getProducts);
      for(var i=0;i < getProducts.length ; i++)
      {
        this.products.push(getProducts[i]);
      }


    }


  ngOnInit()
  {

  }




  closeModal()
  {


    this.navCtrl.pop();


  }

  placeOrder()
  {
   // firebase database of orderDetail

  try{
    const orderId = Math.floor(Math.random() * 899999 + 100000);
    const result = this.orderDetailService.SaveOrder(this.items[0].value,this.items[1].value,this.items[2].value,this.newAddress,this.products,this.email,orderId);
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
          message: 'You generated order id:'+  orderId,
          buttons: [
            {
              text: 'OK',
              handler: ()=>{
                this.navCtrl.setRoot(ServicesPage,{email: this.email});

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










        //  console.log(this.orderId);





      // this.navCtrl.setRoot(ServicesPage,{email: this.email});



  }

  delItem(productItem){

    this.products.splice(productItem,1);
  }




}