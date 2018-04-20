import { ServicesPage } from './../pages/services/services';
import { OrderDetailsProvider } from './../providers/order-details/order-details';
import { Component , OnInit } from '@angular/core';
import {App, NavController, Platform, NavParams, ToastController, LoadingController,ViewController, AlertController, Toast } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { TabsPage } from '../pages/tabs/tabs';



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
  authority :string;
  orderEmail: string
  totalAmount: number = 0;
  getProductDetails :any;


  products = [] ;
  newAddress :string;
  code;

  customername :any;
  customermobile :any;



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
    public toastCtrl: ToastController,
    public appCtrl: App,


  ) {

      this.getProductDetails = this.navParams.get('Products');
      this.email = this.getProductDetails.userEmail;

      this.items = [
        {name: 'Party',value: this.getProductDetails.partyName},
        {name: 'Transport Media',value: this.getProductDetails.transportMedia},
        {name: 'Transport Name',value: this.getProductDetails.transportMediaName},
        {name: 'Customer Name',value: this.getProductDetails.customername},
        {name: 'Customer Mobile',value: this.getProductDetails.customermobile},
      ]
      const getProducts = this.getProductDetails.productName;
      this.newAddress = this.getProductDetails.deliveryAddress;
      this.authority = this.getProductDetails.authority;
      this.orderEmail = this.getProductDetails.orderEmail;


      // console.log(getProducts);
      for(var i=0;i < getProducts.length ; i++)
      {
        this.products.push(getProducts[i]);
      }

      const totalAmount = 0;
      for(var index=0;index < this.products.length ; index++)
      {
          this.totalAmount  +=  this.products[index].price;
        }

        console.log(this.totalAmount + 'total amount')




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
    const result = this.orderDetailService.SaveOrder(this.items[0].value,this.items[1].value,this.items[2].value,this.items[3].value,this.items[4].value,this.newAddress,this.products,this.email,orderId,this.totalAmount);
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
