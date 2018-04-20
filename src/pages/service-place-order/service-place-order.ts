import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {ProductDetails} from '../../modals/modal.productsDetails';
import {AngularFireDatabase} from 'angularfire2/database';



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

    products = [
    {name: 'bacon',price: 100},
    {name: 'blackolive',price: 60},
    {name: 'extracheese',price: 80},
    {name: 'mushroom',price: 200},
    {name: 'pepperoni',price: 120},
    {name: 'sausage',price: 70},

  ]

  gaming ;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public modalCtrl: ModalController,
     public firebaseDb: AngularFireDatabase
  ) {

   this.email = this.navParams.get('emailId');
   this.userAuthority = this.navParams.get('emailId');
   this.orderEmail = this.navParams.get('orderEmail');





  }

  ionViewDidLoad() {

  }






  getProductDetails(value,myForm)
  {

    for(var index=0; index < value.productName.length ; index++)
    {

      for(var i=0; i < this.products.length ; i++)
      {

        if(this.products[i].name == value.productName[index] ){

          this.newProducts.push({
            name: this.products[i].name,
            price: this.products[i].price,

          })

        }
      }

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
                partyName: value.partyName,
                productName: this.newProducts,
                deliveryAddress : value.deliveryAddress,
                transportMedia: value.transportMedia,
                transportMediaName: value.transportMediaName,
                userEmail :this.email,
                authority:this.userAuthority,
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





}
