import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Storage } from '@ionic/storage';
import { SelectProducts } from '../../modals/selectProducts/modal.selectproduct';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
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




  products = []

  itemLocation :string;

  party :string;
  party1 :string;
  selectparty :string;

  headquators :any;





  gaming ;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public modalCtrl: ModalController,
     public firebaseDb: AngularFireDatabase,
     public firebaseService: FirebaseServiceProvider,
     public localStorage: Storage,
     public toastCtrl: ToastController

  ) {

   this.localStorage.remove('savedProducts');
   this.email = window.localStorage.getItem('email');
   this.userAuthority = this.navParams.get('authority');
   this.orderEmail = this.navParams.get('orderEmail');

  console.log(this.email);

  // console.log(this.navParams.get(OrderTomodified))
   this.headquators = this.firebaseService.getTheHeadquators();

  }

  ionViewDidLoad() {

  }


  getProductDetails(value,myForm)
  {

    console.log(value);

     const getStateAndAddress =value.headquator.split(',');
    console.log(getStateAndAddress[0]);
    console.log(getStateAndAddress[1]);


    this.products = [];
    this.localStorage.get('savedProducts').then((data)=>{
      // console.log();
      this.products = JSON.parse(data);
      if(this.products == null)
      {
        const toast = this.toastCtrl.create({
          message: 'No Product Selected',
          position: 'bottom',
          duration: 1500
        })

        toast.present();
      }
      else
      {

        console.log(this.products);


        for(var index=0; index < this.products.length ; index++)
        {

          this.newProducts.push({
            name: this.products[index].productName,
            size: this.products[index].size,
            quantity: this.products[index].quantity,

          })

        }


        let actionSheet = this.actionSheetCtrl.create({
          title: 'Save Product Details',
          buttons: [
            {
              text: 'Yes, Save and Place',
              role: 'destructive',
              handler: () => {
                let profileModal = this.modalCtrl.create(ProductDetails, {
                  Products : {
                    productName: this.newProducts,
                    deliveryAddress : getStateAndAddress[0],
                    transportMedia: value.transportMedia,
                    headquator: getStateAndAddress[1],
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

      // this.products = [];


    });






  }


  selectParty(){

    this.navCtrl.push(SelectParty);

  }

  selectProducts()
  {
    this.navCtrl.push(SelectProducts);
  }






}
