import { Storage } from '@ionic/storage';
import { SelectProducts } from '../../modals/selectProducts/modal.selectproduct';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {ProductDetails} from '../../modals/modal.productsDetails';
import {AngularFireDatabase} from 'angularfire2/database';
import { SelectParty } from '../../modals/selectParty/modal.selectparty';




@IonicPage()
@Component({
  selector: 'page-service-place-order',
  templateUrl: 'service-place-order.html',
})
export class ServicePlaceOrderPage {

  email :any;
  userAuthority :string;
  orderEmail :string;
  newProducts = [];

  allOrderKeys :any;

  placeOrders = [
    {name: 'hyderabad',address: 'wg 422 hyderabad'},
    {name: 'pune',address: 'wg 422 Pune'},
    {name: 'andrapradesh',address: 'wg 422 Andra pradesh'},
  ]



  // only for sales officer


    products = []

  itemLocation :string;

  party :string;
  party1 :string;
  selectparty :string;





  gaming ;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public modalCtrl: ModalController,
     public firebaseDb: AngularFireDatabase,
     public localStorage: Storage

  ) {


   this.email = this.navParams.get('emailId');
   this.userAuthority = this.navParams.get('emailId');
   this.orderEmail = this.navParams.get('orderEmail');

  }

  ionViewDidLoad() {

  }


  getProductDetails(value,myForm)
  {

    this.products = [];
    this.localStorage.get('savedProducts').then((data)=>{
      // console.log();
      this.products = JSON.parse(data);
      console.log(this.products);
      for(var index=0; index < this.products.length ; index++)
      {

        this.newProducts.push({
          name: this.products[index].productName,
          size: this.products[index].size,
          quantity: this.products[index].quantity,

        })

      }

    });

    const getStateAndAddress =value.selectparty.split(',');
    console.log(getStateAndAddress[0]);
    console.log(getStateAndAddress[1]);



    let actionSheet = this.actionSheetCtrl.create({
      title: 'Save Product Details',
      buttons: [
        {
          text: 'Yes, Save and Place',
          role: 'destructive',
          handler: () => {
            let profileModal = this.modalCtrl.create(ProductDetails, {
              Products : {
                partyName: getStateAndAddress[1],
                productName: this.newProducts,
                deliveryAddress : getStateAndAddress[0],
                transportMedia: value.transportMedia,
                transportMediaName: value.transportMediaName,
                userEmail :this.email,
                authority:  this.userAuthority,
                orderEmail:this.orderEmail,
                customername: value.customerName,
                customermobile: value.customerMobile
              }
            });
             profileModal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();

  }


  selectParty(){

    this.navCtrl.push(SelectParty);

  }

  selectProducts()
  {
    this.navCtrl.push(SelectProducts);
  }






}
