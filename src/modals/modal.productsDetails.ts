import { OrderDetailsProvider } from './../providers/order-details/order-details';
import { Component , OnInit } from '@angular/core';
import { NavController, Platform, NavParams, ToastController, LoadingController,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

//services
  OrderDetailsProvider


@Component({
  selector: 'page-productDetailsModel',
  templateUrl: 'modal.productDetails.html'
})


export class ProductDetails  implements OnInit {

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
    public firebaseDb: AngularFireDatabase

  ) {

      this.getProductDetails = this.navParams.get('Products');

      console.log(this.getProductDetails);

      let key = this.firebaseDb.list('/questions/').push({}).key;


      const allDatabases = this.firebaseDb.list('/orderDetails/').valueChanges();
      allDatabases.subscribe((data)=>{

        const allData = data;
        for(var index=0;index < this.alluserDetails.length ; index++ )
        {
          console.log(this.alluserDetails[index].$key);
        }


      })



      this.items = [
        {name: 'Party',value: this.getProductDetails.partyName},
        {name: 'Transport Media',value: this.getProductDetails.transportMedia},
        {name: 'Transport Media',value: this.getProductDetails.transportMedia},
      ]
      const getProducts = this.getProductDetails.productName;
      this.newAddress = this.getProductDetails.deliveryAddress;

      this.email = this.getProductDetails.userEmail;

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
   this.orderDetailService.SaveOrder(this.items[0].value,this.items[1].value,this.items[2].value,this.newAddress,this.products,this.email);
  //  this.orderDetailService.updateOrderDetails(this.items[0].value,this.items[1].value,this.items[2].value,this.newAddress,this.products,this.email);



  }

  delItem(productItem){

    this.products.splice(productItem,1);
  }




}
