import { ServicesPage } from './../../pages/services/services';

import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { Component , OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the OrderDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderDetailsProvider {

  constructor(
    public http: HttpClient,
    public firebaseDb: AngularFireDatabase,
    public toastCtrl : ToastController,

  ) {



  }


  SaveOrder(partyName,transportMedia,transportName,address,products,email,orderId)
  {



    const emailId = email.substr(0,email.indexOf('@')) + 'orders';
    const result = this.firebaseDb.list('/orderDetails/'+emailId).push({
      partyname : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email,
      Orderid: orderId
    });

      if(result)
      {
        return true;
      }
      else
      {
        return false;
      }

  }

  createDatabase(email)
  {
    const emailId = email.substr(0,email.indexOf('@')) + 'orders';
    this.firebaseDb.list('/orderDetails/').set(emailId,'');
  }

  updateOrderDetails(partyName,transportMedia,transportName,address,products,email)
  {


    const details = this.firebaseDb.object('/orderDetails/');
    details.update({
      partyname : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email
    });





  }

  getOrderDetails()
  {

  }


  deleteOrderDetails()
  {

  }

}
