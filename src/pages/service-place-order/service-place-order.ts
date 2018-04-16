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

  allOrderKeys :any;

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
   console.log('in constructor'+ this.email);
   console.log('in constructor'+ this.userAuthority);




  }

  ionViewDidLoad() {

  }






  getProductDetails(value,myForm)
  {

    console.log('place order'+ this.email);
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
                productName: value.productName,
                deliveryAddress : value.deliveryAddress,
                transportMedia: value.transportMedia,
                transportMediaName: value.transportMediaName,
                userEmail :this.email,
                authority:this.userAuthority
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
