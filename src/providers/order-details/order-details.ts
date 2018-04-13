import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
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

  ) {
  }


  SaveOrder(partyName,transportMedia,transportName,address,products,email)
  {





    const emailId = email.substr(0,email.indexOf('@')) + 'orders';


    const result = this.firebaseDb.list('/orderDetails/').set(emailId,{
      partyname : partyName,
      transportmedia: transportMedia,
      transportname: transportName,
      deliveryaddress: address,
      productnames: products,
      useremail: email
    });


    this.firebaseDb.createPushId()




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
