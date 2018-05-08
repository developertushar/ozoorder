import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-modified-products',
  templateUrl: 'modified-products.html',
})
export class ModifiedProductsPage {

  orderId :any;
  modifiedProductDetails :any;
  constructor(
    private firebaseDb :AngularFireDatabase,
    private navParams  :NavParams,
    private loadCtrl  :LoadingController
  )
  {

    this.orderId = this.navParams.get('orderId');
    console.log(this.orderId);

    const loader = this.loadCtrl.create({
      content: 'Loading modified details..',
      spinner: 'dot',
    })

   loader.present().then(()=>{
    this.firebaseDb.list('/pendingOrder/', ref=> ref.orderByChild('Orderid').equalTo(this.orderId)).valueChanges().subscribe((data)=>{
        this.modifiedProductDetails = data;
      })
   }).then(()=>{
     loader.dismiss();
   })

  }



}
